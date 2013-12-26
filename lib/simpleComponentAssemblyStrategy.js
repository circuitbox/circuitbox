/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var async = require('async');

  function SimpleComponentAssemblyStrategy(componentDefinition, dependencies) {

    function buildAssemblySequence() {
      var sequence = [];

      // step 1: get the base value
      sequence.push(function createBaseComponent(asyncCallback) {
        asyncCallback(null, componentDefinition.getBaseValue());
      });

      // step 2: process the initializer only if its available
      var initializer = componentDefinition.initializer;
      if (initializer) {
        sequence.push(function runInitializer(baseValue, asyncCallback) {
          // async initializer detection à la mocha
          // see - http://stackoverflow.com/questions/13570485/how-does-mocha-know-to-wait-and-timeout-only-with-my-asynchronous-tests
          if (initializer.length === 2) {
            initializer.call(baseValue, dependencies, asyncCallback);
            return;
          }
          asyncCallback(null, initializer.call(baseValue, dependencies));
        });
      }

      return sequence;
    }

    this.assemble = function (callback) {
      // build and run the assembly sequence in a waterfall
      async.waterfall(buildAssemblySequence(), function (err, result) {
        callback(err, result);
      });
    };
  }

  module.exports = SimpleComponentAssemblyStrategy;

})();