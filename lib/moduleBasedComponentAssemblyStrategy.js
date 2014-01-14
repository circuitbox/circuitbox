/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var utils = require('./utils');

var ComponentAssemblyStrategy = require('./componentAssemblyStrategy');

function ModuleBasedComponentAssemblyStrategy(componentDefinition, dependencies) {
  var self = this;

  ComponentAssemblyStrategy.call(self, componentDefinition, dependencies);

  function createBaseComponent(asyncCallback) {
    var moduleId = componentDefinition.getModuleId();

    moduleId = utils.normalizeModulePath(moduleId);

    try {
      var baseComponent = require(moduleId);

      self.processBaseComponent(baseComponent, function (err, component) {
        if (err) {
          asyncCallback(err);
          return;
        }
        asyncCallback(null, (component || baseComponent));
      });

    } catch (e) {
      asyncCallback(e);
    }
  }

  self.buildAssemblySequence = function buildAssemblySequence() {
    var sequence = [];

    // step 1: get the base value
    sequence.push(createBaseComponent);

    // step 2: process the initializer only if its available
    if (componentDefinition.initializer) sequence.push(self.runInitializer);

    return sequence;
  };

}

utils.inherits(ModuleBasedComponentAssemblyStrategy, ComponentAssemblyStrategy);

module.exports = ModuleBasedComponentAssemblyStrategy;