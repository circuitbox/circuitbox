/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var SimpleComponentDefinition = require('./simpleComponentDefinition');
var ModuleBasedComponentDefinition = require('./moduleBasedComponentDefinition');

var SimpleComponentAssemblyStrategy = require('./simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('./moduleBasedComponentAssemblyStrategy');

module.exports = {
  strategyFor: function getStrategyFor(componentDefinition, dependencies) {
    if (componentDefinition instanceof SimpleComponentDefinition)
      return new SimpleComponentAssemblyStrategy(componentDefinition, (dependencies || {}));

    if (componentDefinition instanceof ModuleBasedComponentDefinition)
      return new ModuleBasedComponentAssemblyStrategy(componentDefinition, (dependencies || {}));
  }
};