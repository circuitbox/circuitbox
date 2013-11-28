/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');
  var ModuleBasedComponentDefinitionBuilder = require('./moduleBasedComponentDefinitionBuilder');

  module.exports = function ComponentDefinitionBuilderFactory(componentName) {
    var self = this;

    self.use = function use(object) {
      return new SimpleComponentDefinitionBuilder(componentName, object);
    };

    self.require = function require(moduleId) {
      return new ModuleBasedComponentDefinitionBuilder(componentName, moduleId);
    };
  };

})();