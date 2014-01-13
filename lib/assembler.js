/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var when = require('when');
var async = require('async');
var utils = require('./utils');

var ComponentCreationError = require('./componentCreationError');
var NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');

var ComponentAssemblyStrategyFactory = require('./componentAssemblyStrategyFactory');
var AssemblyContext = require('./assemblyContext');

function Assembler(context) {
  var self = this;
  var kernelView = context.kernelView;
  var registry = context.registry;
  var targetComponentName = context.targetComponentName;
  var targetComponentDefinition,
      queuedForAssembly;

  if (!(context instanceof AssemblyContext))
    throw new ComponentCreationError('Cannot assemble component without a valid assembly context', '');

  targetComponentDefinition = registry.findDefinitionForComponent(targetComponentName);
  queuedForAssembly = kernelView.isQueuedForAssembly(targetComponentName);

  // returns a function which builds an Assembler for the specified component name
  function makeAssembler(componentName) {
    return function (asyncCallback) {
      Assembler.for(new AssemblyContext(componentName, {
        kernelView: kernelView,
        registry: registry
      })).assemble()
      .done(function (result) {
        asyncCallback(null, result);
      }, function (err) {
        asyncCallback(err);
      });
    };
  }

  // wraps specified callback where wrapper stores singleton
  // before firing wrapped callback
  function makeProxyCallback(callback) {
    return function proxyCallback(err, component) {
      if (err) {
        callback(err);
        return;
      }
      if (targetComponentDefinition.isSingleton)
        kernelView.storeSingleton(targetComponentName, component);
      callback(null, component);
      return;
    };
  }

  // Gets the assembly-strategy for the specified component,
  // passes it the specified dependencies and assembles it
  function assembleComponent(def, deps, pcb) {
    ComponentAssemblyStrategyFactory.strategyFor(def, deps)
              .assemble(pcb);
  }

  function waitForSingletonAssembly(callback) {
    // wait for queued component to be assembled and invoke callback
    kernelView.onAssemblyComplete(targetComponentName, function (component) {
      callback(null, component);
    });
  }

  function assembleCallback(callback) {
    try {
      var definitionsToAssemble = registry.assemblyListFor(targetComponentName);
      var proxyCallback = makeProxyCallback(callback);

      if (targetComponentDefinition.isSingleton) {
        if (queuedForAssembly)
          return waitForSingletonAssembly(callback);

        var result = kernelView.findSingleton(targetComponentName);
      
        // if we find the singleton, return
        if (result) {
          callback(null, result);
          return;
        }

        // enqueue singleton for assembly
        kernelView.enqueueForAssembly(targetComponentName);
      }

      var dependencyNames = (definitionsToAssemble.length > 1) ?
        _.first(definitionsToAssemble, definitionsToAssemble.length - 1) : [];

      // build a list of assembler functions from the dependency names
      var assemblerList = _.map(dependencyNames, makeAssembler);

      // assemble all the dependencies
      async.parallel(assemblerList, function (err, components) {
        if (err) {
          callback(err);
          return;
        }

        // put together the components with their names
        var dependencies = _.object(dependencyNames, components);

        assembleComponent(targetComponentDefinition, dependencies, proxyCallback);
      });

    } catch (e) {
      if (e instanceof NoSuchComponentDefinitionError) {
        callback(new ComponentCreationError(utils.sprintf('Cannot create a the component "%s" due to unsatisfied dependencies: %s',
            targetComponentName, e.componentName), targetComponentName));
      }
    }
  }

  function assemblePromise() {
    return when.promise(function (resolve, reject) {
      assembleCallback(function (err, targetComponent) {
        if (err) {
          reject(err);
          return;
        }
        resolve(targetComponent);
      });
    });
  }

  self.assemble = function assemble() {
    if (arguments.length === 1 && _.isFunction(arguments[0])) {
      assembleCallback(arguments[0]);
    }
    return assemblePromise();
  };
}

Assembler.for = function createAssemblerFor(context) {
  return new Assembler(context);
};

module.exports = Assembler;