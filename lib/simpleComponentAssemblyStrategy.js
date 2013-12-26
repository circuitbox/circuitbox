/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  var ComponentAssemblyStrategy = require('./componentAssemblyStrategy');

  function SimpleComponentAssemblyStrategy(componentDefinition, dependencies) {
    var self = this;

    ComponentAssemblyStrategy.call(self, componentDefinition, dependencies);

    function createBaseComponent(asyncCallback) {
      asyncCallback(null, componentDefinition.getBaseValue());
    }

    self.buildAssemblySequence = function buildAssemblySequence() {
      var sequence = [];

      // step 1: get the base value
      sequence.push(createBaseComponent);

      // step 2: process the initializer only if its available

      if (componentDefinition.initializer) {
        sequence.push(self.runInitializer);
      }

      return sequence;
    };

  }

  utils.inherits(SimpleComponentAssemblyStrategy, ComponentAssemblyStrategy);

  module.exports = SimpleComponentAssemblyStrategy;

})();