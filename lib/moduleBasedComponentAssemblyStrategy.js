/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var path = require('path');
  var utils = require('./utils');

  var ComponentAssemblyStrategy = require('./componentAssemblyStrategy');

  function ModuleBasedComponentAssemblyStrategy(componentDefinition, dependencies) {
    var self = this;

    ComponentAssemblyStrategy.call(self, componentDefinition, dependencies);

    function normalizeModulePath(moduleId) {
      // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
      if (moduleId.charAt(0) === '/' ||
          moduleId.substr(0, 2) === './' ||
          moduleId.substr(0, 3) === '../') {
        return path.join(process.cwd(), moduleId);
      }
      return moduleId;
    }

    function createBaseComponent(asyncCallback) {
      var moduleId = componentDefinition.getModuleId();

      moduleId = normalizeModulePath(moduleId);

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

      if (componentDefinition.initializer) {
        sequence.push(self.runInitializer);
      }

      return sequence;
    };

  }

  utils.inherits(ModuleBasedComponentAssemblyStrategy, ComponentAssemblyStrategy);

  module.exports = ModuleBasedComponentAssemblyStrategy;

})();