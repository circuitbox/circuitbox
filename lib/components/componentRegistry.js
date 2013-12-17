/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../utils');
  var definitions = require('../definitions');

  var ComponentDefinitionError = definitions.ComponentDefinitionError;
  var ComponentDefinitionBuilderFactory = definitions.ComponentDefinitionBuilderFactory;

  function ComponentRegistry() {
    var self = this;
    var registeredDefinitions = {};

    function buildDefinitions(builderList) {

      function buildDefinition(definitionBuilder) {
        var componentName = definitionBuilder.options.name;

        if (~utils.keys(registeredDefinitions).indexOf(componentName)) {
          throw new ComponentDefinitionError('Another component with the name "' + componentName +
              '" has already been registered');
        }

        var definition = definitionBuilder.build();

        registeredDefinitions[componentName] = definition;
      }

      builderList.forEach(buildDefinition);
    }

    function createRegistryView(componentList) {
      return {
        for: function registerComponentDefinition(componentName) {
          if (utils.isEmpty(componentName)) {
            throw new ComponentDefinitionError('A valid component name must be specified', componentName);
          }
          return new ComponentDefinitionBuilderFactory(componentList, componentName);
        }
      };
    }

    self.registerModule = function registerModule(module) {
      // indirection to protect this ComponentRegistry instance
      var moduleComponentList = [];
      module.call(module, createRegistryView(moduleComponentList));
      buildDefinitions(moduleComponentList);
      return true;
    };

    Object.defineProperty(self, 'registeredDefinitions', {
      get: function getRegisteredDefinitions() {
        return utils.values(registeredDefinitions);
      }
    });

    self.findDefinitionForComponent = function findDefinitionForComponent(componentName) {
      if (!(componentName in registeredDefinitions)) {
        throw new definitions.NoSuchComponentDefinitionError(componentName);
      }
      return registeredDefinitions[componentName];
    };
  }

  module.exports = ComponentRegistry;

})();