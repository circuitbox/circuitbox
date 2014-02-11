'use strict';

var ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory');
var ComponentAssemblyStrategyFactory = require('./componentAssemblyStrategyFactory');

var binder = Object.create(Object.prototype, {
  
  definitionBuilder: {
    writable: false,
    enumerable: true,
    value: ComponentDefinitionBuilderFactory.registerBuilder
  },

  assemblyStrategy: {
    writable: false,
    enumerable: false,
    value: ComponentAssemblyStrategyFactory.registerAssemblyStrategy
  }

});

module.exports = binder;