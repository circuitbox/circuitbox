/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('../utils')._;
  var definitions = require('../definitions');

  var ComponentDefinitionError = definitions.ComponentDefinitionError;
  var ComponentDefinitionBuilderFactory = definitions.ComponentDefinitionBuilderFactory;

  function ComponentRegistry() {
    var self = this;
    var registeredDefinitionBuilders = [];

    self.addDefinitionBuilder = function addDefinitionBuilder(componentDefinitionBuilder) {
      registeredDefinitionBuilders.push(componentDefinitionBuilder);
    };

    function isComponentNameRegistered(componentName) {
      return _.any(registeredDefinitionBuilders, function findBuilderForComponent(builder) {
        return builder.options.name === componentName;
      });
    }

    var registryView = {
      for: function registerComponentDefinition(componentName) {
        if (_.isEmpty(componentName)) {
          throw new ComponentDefinitionError('A valid component name must be specified');
        }
        if (isComponentNameRegistered(componentName)) {
          throw new ComponentDefinitionError('Another component with the name "' + componentName +
              '" has already been registered');
        }
        return new ComponentDefinitionBuilderFactory(self, componentName);
      }
    };

    self.registerModule = function registerModule(module) {
      // indirection to protect this ComponentRegistry instance
      module.call(module, registryView);
    };

    Object.defineProperty(self, 'registeredDefinitions', {
      get: function getRegisteredDefinitions() {
        return registeredDefinitionBuilders;
      }
    });

    self.buildDefinitions = function buildDefinitions() {
      registeredDefinitionBuilders.map(registeredDefinitionBuilders, function buildDefinition(definitionBuilder) {
        console.log(definitionBuilder.options.name);
      });
    };

    self.findDefinitionForComponent = function findDefinitionForComponent(componentName) {
      console.log('Finding component name:', componentName);
    };
  }

  module.exports = ComponentRegistry;
})();