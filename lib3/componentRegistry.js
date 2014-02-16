/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');

var ComponentDefinitionError = require('./componentDefinitionError');
var NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');
var ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory');

function ComponentRegistry() {
  var self = this;
  var registeredDefinitions = {};

  function buildDefinitions(builderList) {
    _.each(builderList, function buildDefinition(definitionBuilder) {
      var componentName = definitionBuilder.options.name;

      if (~(_.keys(registeredDefinitions).indexOf(componentName)))
        throw new ComponentDefinitionError('Another component with the name "' + componentName +
            '" has already been registered');

      registeredDefinitions[componentName] = definitionBuilder.build();
    });
  }

  function createRegistryView(componentList) {
    return {
      for: function registerComponentDefinition(componentName) {
        if (_.isEmpty(componentName))
          throw new ComponentDefinitionError('A valid component name must be specified', componentName);
        return new ComponentDefinitionBuilderFactory(componentList, componentName);
      }
    };
  }

  Object.defineProperty(this, 'hasComponents', {
    get: function getRegisteredDefinitions() {
      return !(_.isEmpty(registeredDefinitions));
    }
  });

  self.registerModule = function registerModule(module) {
    // indirection to protect this ComponentRegistry instance
    var moduleComponentList = [];
    module.call(module, createRegistryView(moduleComponentList));
    buildDefinitions(moduleComponentList);
    return true;
  };

  self.assemblyListFor = function assemblyListFor(componentName) {
    // start with the definition of target component
    var componentDefinition = self.findDefinitionForComponent(componentName);

    // put that in our list
    var result = [ componentDefinition.name ];
    var dependencies = (componentDefinition.dependencies || []);

    // for each dependency of the target component
    // trigger a recursive search for all dependencies
    // TODO: Without TCO, this recursion is vulnerable. Need to rewrite
    _.chain(dependencies).map(function (dependency) {
      return self.assemblyListFor(dependency);
    }).each(function (listOfDefinitions) {
      // put the results in front of the list pushing target component to the last
      result.unshift.apply(result, listOfDefinitions);
    });

    return result;
  };

  self.findDefinitionForComponent = function findDefinitionForComponent(componentName) {
    if (!(componentName in registeredDefinitions))
      throw new NoSuchComponentDefinitionError(componentName);
    return registeredDefinitions[componentName];
  };
}

module.exports = ComponentRegistry;