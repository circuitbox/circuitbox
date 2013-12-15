/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');
  var ModuleBasedComponentDefinitionBuilder = require('./moduleBasedComponentDefinitionBuilder');

  function ComponentDefinitionBuilderFactory(componentConfiguration, componentName) {
    var self = this;

    self.use = function use(object) {
      var result = new SimpleComponentDefinitionBuilder(componentName, object);
      componentConfiguration.addDefinitionBuilder(result);
      return result;
    };

    self.require = function require(moduleId) {
      var result = new ModuleBasedComponentDefinitionBuilder(componentName, moduleId);
      componentConfiguration.addDefinitionBuilder(result);
      return result;
    };
  }

  module.exports = ComponentDefinitionBuilderFactory;

})();