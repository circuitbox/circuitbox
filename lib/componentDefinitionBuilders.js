/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  var componentDefinitions = require('./componentDefinitions');
  var ComponentDefinition = componentDefinitions.ComponentDefinition;
  var SimpleComponentDefinition = componentDefinitions.SimpleComponentDefinition;
  var ModuleBasedComponentDefinition = componentDefinitions.ModuleBasedComponentDefinition;

  function ComponentDefinitionBuilder(name) {
    var self = this;

    var _options = {
      name: name
    };

    Object.defineProperty(self, 'options', {
      get: function getOptions() {
        return _options;
      }
    });

    self.initializeWith = function initializeWith(initializer) {
      _options.initializer = initializer;
      return self;
    };

    self.dependsOn = function dependsOn(dependencies) {
      _options.dependencies = dependencies;
      return self;
    };

    self.scope = function scopeWith(scope) {
      _options.scope = scope;
      return self;
    };

    self.build = function buildDefinition() {
      return new ComponentDefinition(_options);
    };
  }

  function SimpleComponentDefinitionBuilder(name, object) {
    var self = this;

    ComponentDefinitionBuilder.call(self, name);

    self.options.object = object;

    self.build = function buildDefinition() {
      return new SimpleComponentDefinition(self.options);
    };
  }

  function ModuleBasedComponentDefinitionBuilder(name, moduleId) {
    var self = this;

    ComponentDefinitionBuilder.call(self, name);

    self.options.moduleId = moduleId;

    self.build = function buildDefinition() {
      return new ModuleBasedComponentDefinition(self.options);
    };
  }

  utils.inherits(SimpleComponentDefinitionBuilder, ComponentDefinitionBuilder);
  utils.inherits(ModuleBasedComponentDefinitionBuilder, ComponentDefinitionBuilder);

  function ComponentDefinitionBuilderFactory(componentList, componentName) {
    var self = this;

    self.use = function use(object) {
      var result = new SimpleComponentDefinitionBuilder(componentName, object);
      componentList.push(result);
      return result;
    };

    self.require = function require(moduleId) {
      var result = new ModuleBasedComponentDefinitionBuilder(componentName, moduleId);
      componentList.push(result);
      return result;
    };
  }

  module.exports = {
    ComponentDefinitionBuilder: ComponentDefinitionBuilder,
    SimpleComponentDefinitionBuilder: SimpleComponentDefinitionBuilder,
    ModuleBasedComponentDefinitionBuilder: ModuleBasedComponentDefinitionBuilder,
    ComponentDefinitionBuilderFactory: ComponentDefinitionBuilderFactory
  };

})();