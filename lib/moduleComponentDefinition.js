/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    u = require('./utils'),
    inherits = u.inherits,
    normalizeModulePath = u.normalizeModulePath,
    Component = require('./componentDefinition');

function ModuleComponentDefinition(name, moduleId) {
  var bp = global.__cbx ? global.__cbx._basePath : null,
      options = arguments[2] || {};

  if (!_.isString(moduleId) || _.isEmpty(moduleId)) throw new Error('must specify a valid module-id');

  Component.call(this, name, options);

  moduleId = normalizeModulePath(moduleId, bp);

  _.extend(this, { moduleId: moduleId });
}

inherits(ModuleComponentDefinition, Component);

_.extend(ModuleComponentDefinition.prototype, {

  load: function () {
    return require(this.moduleId);
  }

});

module.exports = ModuleComponentDefinition;