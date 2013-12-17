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
    var registeredDefinitions = [];

    function buildDefinitions(builderList) {
      var builtComponentNames = registeredDefinitions.map(function (definition) {
        return definition.name;
      });

      function buildDefinition(definitionBuilder) {
        var componentName = definitionBuilder.options.name;

        if (~builtComponentNames.indexOf(componentName)) {
          throw new ComponentDefinitionError('Another component with the name "' + componentName +
              '" has already been registered');
        }

        var definition = definitionBuilder.build();
        builtComponentNames.push(componentName);
        return definition;
      }

      registeredDefinitions = registeredDefinitions.concat(builderList.map(buildDefinition));
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
        return registeredDefinitions;
      }
    });

    self.findDefinitionForComponent = function findDefinitionForComponent(componentName) {
      console.log('Finding component name:', componentName);
    };
  }

  module.exports = ComponentRegistry;

})();