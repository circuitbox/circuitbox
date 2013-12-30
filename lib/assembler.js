/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');
var when = require('when');
var async = require('async');

var ComponentCreationError = require('./componentCreationError');
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
    var definitionsToAssemble = registry.assemblyListFor(targetComponentName);
    var targetComponentDefinition = _.last(definitionsToAssemble);
    var dependencyNames = _.pluck(definitionsToAssemble, 'name');

    // if we have dependencies
    // TODO: single logic for components with & without dependencies
    if (dependencyNames.length > 1) {
      // build a list of assembler functions from the dependency names
      var assemblerList = _.chain(dependencyNames)
        .first(dependencyNames.length - 1)
        .map(function (componentName) {
          return makAssembler(componentName);
        }).value();

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