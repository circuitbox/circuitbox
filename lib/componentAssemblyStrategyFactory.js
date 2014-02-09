/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var ComponentDefinition = require('./componentDefinition');
var ComponentAssemblyStrategy = require('./componentAssemblyStrategy');
var strategyMap = {
  'SimpleComponentDefinition': require('./simpleComponentAssemblyStrategy'),
  'ModuleBasedComponentDefinition': require('./moduleBasedComponentAssemblyStrategy')
};

var ComponentAssemblyStrategyFactory = Object.create(Object.prototype, {
  
  strategyFor: {
    writeable: false,
    enumerable: true,
    value: function getStrategyFor(componentDefinition, dependencies) {
      var definitionType = componentDefinition.constructor.name;
      return new (strategyMap[definitionType])(componentDefinition, (dependencies || {}));
    }
  },

  registerAssemblyStrategy: {
    writable: false,
    enumerable: true,
    value: function registerAssemblyStrategy(componentDefinitionType, componentAssemblyStrategyType) {
      if (componentDefinitionType.super_ !== ComponentDefinition)
        throw new Error('Cannot register assembly strategy for a non-ComponentDefinition');
      if (componentAssemblyStrategyType.super_ !== ComponentAssemblyStrategy)
        throw new Error('Cannot register a non-ComponentAssemblyStrategy');
      strategyMap[componentDefinitionType.name] = componentAssemblyStrategyType;
    }
  }
});

module.exports = ComponentAssemblyStrategyFactory;