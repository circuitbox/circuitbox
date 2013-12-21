/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var async = require('async');

  function SimpleComponentAssemblyStrategy(componentDefinition) {

    function buildAssemblySequence() {
      var sequence = [];

      sequence.push(function createBaseComponent(asyncCallback) {
        asyncCallback(null, componentDefinition.emitter());
      });

      var initializer = componentDefinition.initializer;
      if (initializer) {
        sequence.push(function runInitializer(baseValue, asyncCallback) {
          if (initializer.length) {
            initializer.call(baseValue, asyncCallback);
            return;
          }
          asyncCallback(null, initializer.call(baseValue));
        });
      }

      return sequence;
    }

    this.assemble = function (callback) {
      async.waterfall(buildAssemblySequence(), function (err, result) {
        callback(err, result);
      });
    };
  }

  module.exports = {
    SimpleComponentAssemblyStrategy: SimpleComponentAssemblyStrategy
  };

})();