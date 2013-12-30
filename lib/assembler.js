/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');
var when = require('when');
var async = require('async');
var utils = require('./utils');

var ComponentCreationError = require('./componentCreationError');
var NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');

var ComponentAssemblyStrategyFactory = require('./componentAssemblyStrategyFactory');
var AssemblyContext = require('./assemblyContext');

function Assembler(context) {
  var self = this;
  var registry = context.registry;
  var targetComponentName = context.targetComponentName;

  if (!(context instanceof AssemblyContext))
    throw new ComponentCreationError('Cannot assemble component without a valid assembly context', '');

  // returns a function which builds an Assembler for the specified component name
  function makAssembler(componentName) {
    return function (asyncCallback) {
      Assembler.for(new AssemblyContext(componentName, {
        registry: registry
      })).assemble()
      .done(function (result) {
        asyncCallback(null, result);
      }, function (err) {
        asyncCallback(err);
      });
    };
  }

  function assembleCallback(callback) {
    try {
      var definitionsToAssemble = registry.assemblyListFor(targetComponentName);
      var targetComponentDefinition = registry.findDefinitionForComponent(_.last(definitionsToAssemble));
      var dependencyNames = (definitionsToAssemble.length > 1) ? _.first(definitionsToAssemble, definitionsToAssemble.length - 1) : [];

      // if we have dependencies
      // TODO: single logic for components with & without dependencies
      if (dependencyNames.length) {
        // build a list of assembler functions from the dependency names
        var assemblerList = _.map(dependencyNames, function (componentName) {
              return makAssembler(componentName);
            });

        // parallelly assemble all the dependencies
        async.parallel(assemblerList, function (err, components) {
          if (err) {
            callback(err);
            return;
          }

          // put together the components with their names
          var dependencies = _.object(dependencyNames, components);

          // now get a assembly-strategy for the target component,
          // pass it the dependencies and assemble it
          ComponentAssemblyStrategyFactory.strategyFor(targetComponentDefinition, dependencies)
              .assemble(callback);

        });

        return;
      }

      ComponentAssemblyStrategyFactory
          .strategyFor(targetComponentDefinition)
          .assemble(callback);

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