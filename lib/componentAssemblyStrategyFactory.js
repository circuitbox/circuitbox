/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var SimpleComponentAssemblyStrategy = require('./simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('./moduleBasedComponentAssemblyStrategy');

var strategyMap = {
  'SimpleComponentDefinition': SimpleComponentAssemblyStrategy,
  'ModuleBasedComponentDefinition': ModuleBasedComponentAssemblyStrategy
};

var ComponentAssemblyStrategyFactory = {
  
  strategyFor: function getStrategyFor(componentDefinition, dependencies) {
    var definitionType = componentDefinition.constructor.name;
    return new (strategyMap[definitionType])(componentDefinition, (dependencies || {}));
  },

  registerAssemblyStrategy: function registerAssemblyStrategy(componentDefinitionType, componentAssemblyStrategyType) {
    strategyMap[componentDefinitionType.name] = componentAssemblyStrategyType;
  }

};

module.exports = ComponentAssemblyStrategyFactory;