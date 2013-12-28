/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');
var ModuleBasedComponentDefinitionBuilder = require('./moduleBasedComponentDefinitionBuilder');

function ComponentDefinitionBuilderFactory(componentList, componentName) {
  var self = this;

  self.use = function use(object) {
    var result = new SimpleComponentDefinitionBuilder(componentName, object);
    componentList.push(result);
    return result;
  };

  self.requires = function require(moduleId) {
    var result = new ModuleBasedComponentDefinitionBuilder(componentName, moduleId);
    componentList.push(result);
    return result;
  };
}

module.exports = ComponentDefinitionBuilderFactory;