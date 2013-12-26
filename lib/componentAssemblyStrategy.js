/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var async = require('async');

  function ComponentAssemblyStrategy(componentDefinition, dependencies) {
    var self = this;

    self.runInitializer = function runInitializer(baseValue, asyncCallback) {
      var initializer = componentDefinition.initializer;

      if (!initializer) {
        asyncCallback(null, baseValue);
        return;
      }

      function safeReturnValueHandler(err, result) {
        if (err) {
          asyncCallback(err);
          return;
        }

        asyncCallback(null, (result || baseValue));
      }

      // async initializer detection à la mocha
      // see - http://stackoverflow.com/questions/13570485/how-does-mocha-know-to-wait-and-timeout-only-with-my-asynchronous-tests
      if (initializer.length === 2) {
        initializer.call(baseValue, dependencies, safeReturnValueHandler);
        return;
      }

      try {
        safeReturnValueHandler(null, initializer.call(baseValue, dependencies));
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