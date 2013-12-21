/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var async = require('async');

  function SimpleComponentAssemblyStrategy(componentDefinition) {
    this.assemble = function (callback) {

      var sequence = [
        function createBaseComponent(asyncCallback) {
          asyncCallback(componentDefinition.emitter());
        }
      ];

      if (componentDefinition.initializer) {
        sequence.push(function runInitializer(baseValue, asyncCallback) {
          componentDefinition.initializer.call(baseValue, asyncCallback);
        });
      }

      async.waterfall(sequence, function (err, result) {
        callback(err, result);
      });
    };
  }

  module.exports = {
    SimpleComponentAssemblyStrategy: SimpleComponentAssemblyStrategy
  };

})();