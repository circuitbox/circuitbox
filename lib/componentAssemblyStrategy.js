/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var async = require('async');

  var utils = require('./utils');

  function ComponentAssemblyStrategy(componentDefinition, dependencies) {
    var self = this;

    self.processBaseComponent = function processBaseComponent(baseComponent, callback) {
      if (!baseComponent) {
        callback(null, null);
      }

      if (utils.isFunction(baseComponent)) {
        // async detection à la mocha
        // see - http://stackoverflow.com/questions/13570485/how-does-mocha-know-to-wait-and-timeout-only-with-my-asynchronous-tests
        if (baseComponent.length === 2) {
          baseComponent(dependencies, callback);
          return;
        }

        try {
          callback(null, baseComponent(dependencies));
        } catch (e) {
          callback(e);
        }
        return;
      }

      callback(null, baseComponent);
    };

    self.runInitializer = function runInitializer(component, asyncCallback) {
      var initializer = componentDefinition.initializer;

      if (!initializer) {
        asyncCallback(null, component);
        return;
      }

      function safeReturnValueHandler(err, result) {
        if (err) {
          asyncCallback(err);
          return;
        }

        asyncCallback(null, (result || component));
      }

      // async initializer detection à la mocha
      if (initializer.length === 2) {
        initializer.call(component, dependencies, safeReturnValueHandler);
        return;
      }

      try {
        safeReturnValueHandler(null, initializer.call(component, dependencies));
      } catch (e) {
        asyncCallback(e);
      }
    };

    self.buildAssemblySequence = function buildAssemblySequence() {
      throw new Error('not implemented exception');
    };

    self.assemble = function (callback) {
      // build and run the assembly sequence in a waterfall
      async.waterfall(self.buildAssemblySequence(), function (err, result) {
        callback(err, result);
      });
    };
  }

  module.exports = ComponentAssemblyStrategy;

})();