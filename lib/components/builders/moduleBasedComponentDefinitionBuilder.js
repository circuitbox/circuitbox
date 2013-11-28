/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../../utils');
  var ModuleBasedComponentDefinition = require('../moduleBasedComponentDefinition');
  var ComponentDefinitionBuilder = require('./componentDefinitionBuilder');

  function ModuleBasedComponentDefinitionBuilder(name, moduleId) {
    var self = this;

    ComponentDefinitionBuilder.call(self, name);

    self.options = utils._.extend(self.options, {moduleId: moduleId});

    self.done = function buildDefinition() {
      return new ModuleBasedComponentDefinition(self.options);
    };
  }

  utils.inherits(ModuleBasedComponentDefinitionBuilder, ComponentDefinitionBuilder);

  module.exports = ModuleBasedComponentDefinitionBuilder;

})();