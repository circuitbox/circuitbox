/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    inherits = require('util').inherits,
    normalizeModulePath = require('./utils').normalizeModulePath,
    Component = require('./component');

function ModuleComponent(name, moduleId) {
  var options = arguments[2] || {};

  if (!_.isString(moduleId) || _.isEmpty(moduleId)) throw new Error('must specify a valid module-id');

  Component.call(this, name, options);

  moduleId = normalizeModulePath(moduleId);

  _.extend(this, { moduleId: moduleId });
}

inherits(ModuleComponent, Component);

_.extend(ModuleComponent.prototype, {

  load: function () {
    return require(this.moduleId);
  }

});

module.exports = ModuleComponent;