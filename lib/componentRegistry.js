/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  var NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');
  var ComponentDefinitionError = require('./componentDefinitionError');
  var ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory');

  function ComponentRegistry() {
    var self = this;
    var registeredDefinitions = {};

    function buildDefinitions(builderList) {
      builderList.forEach(function buildDefinition(definitionBuilder) {
        var componentName = definitionBuilder.options.name;

        if (~utils.keys(registeredDefinitions).indexOf(componentName)) {
          throw new ComponentDefinitionError('Another component with the name "' + componentName +
              '" has already been registered');
        }

        registeredDefinitions[componentName] = definitionBuilder.build();
      });
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

    Object.defineProperty(this, 'registeredDefinitions', {
      get: function getRegisteredDefinitions() {
        return utils.values(registeredDefinitions);
      }
    });

    self.registerModule = function registerModule(module) {
      // indirection to protect this ComponentRegistry instance
      var moduleComponentList = [];
      module.call(module, createRegistryView(moduleComponentList));
      buildDefinitions(moduleComponentList);
      return true;
    };

    self.getAssemblyListFor = function getAssemblyListFor(componentName) {
      var componentDefinition = self.findDefinitionForComponent(componentName);

      var result = [ componentDefinition ];

      (componentDefinition.dependencies || []).map(function (dependency) {
        return self.getAssemblyListFor(dependency);
      }).forEach(function (listOfDefinitions) {
        result.unshift.apply(result, listOfDefinitions);
      });

      return result;
    };

    self.findDefinitionForComponent = function findDefinitionForComponent(componentName) {
      if (!(componentName in registeredDefinitions)) {
        throw new NoSuchComponentDefinitionError(componentName);
      }
      return registeredDefinitions[componentName];
    };
  }

  module.exports = ComponentRegistry;

})();