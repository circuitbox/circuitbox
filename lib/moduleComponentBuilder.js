/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    inherits = require('util').inherits,
    ModuleComponent = require('./moduleComponent'),
    ComponentBuilder = require('./componentBuilder');

function ModuleComponentBuilder(name, moduleId) {
  ComponentBuilder.call(this, name);
  this.moduleId = moduleId;
}

inherits(ModuleComponentBuilder, ComponentBuilder);

_.extend(ModuleComponentBuilder.prototype, {
  build: function () {
    return new ModuleComponent(this.name, this.moduleId, this.options);
  }
});

module.exports = ModuleComponentBuilder;