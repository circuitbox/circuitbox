/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    inherits = require('./utils').inherits,
    ModuleComponent = require('./moduleComponentDefinition'),
    ComponentBuilder = require('./componentDefinitionBuilder');

function ModuleComponentDefinitionBuilder(name, moduleId) {
  ComponentBuilder.call(this, name);
  this.moduleId = moduleId;
}

inherits(ModuleComponentDefinitionBuilder, ComponentBuilder);

_.extend(ModuleComponentDefinitionBuilder.prototype, {
  build: function () {
    return new ModuleComponent(this.name, this.moduleId, this.options);
  }
});

module.exports = ModuleComponentDefinitionBuilder;
