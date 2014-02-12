/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var SimpleComponentDefinition = require('./simpleComponentDefinition');
var ModuleBasedComponentDefinition = require('./moduleBasedComponentDefinition');

var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');
var ModuleBasedComponentDefinitionBuilder = require('./moduleBasedComponentDefinitionBuilder');

var SimpleComponentAssemblyStrategy = require('./simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('./moduleBasedComponentAssemblyStrategy');

module.exports = function (binder) {
  // add the binding for SimpleComponentDefinition
  binder.definitionBuilder('use', SimpleComponentDefinitionBuilder);
  binder.assemblyStrategy(SimpleComponentDefinition, SimpleComponentAssemblyStrategy);

  // add the binding for ModuleBasedComponentDefinition
  binder.definitionBuilder('requires', ModuleBasedComponentDefinitionBuilder);
  binder.assemblyStrategy(ModuleBasedComponentDefinition, ModuleBasedComponentAssemblyStrategy);
};