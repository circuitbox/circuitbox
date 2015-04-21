/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    u = require('./utils'),
    inherits = u.inherits,
    normalizeModulePath = u.normalizeModulePath,
    Component = require('./componentDefinition');

function ModuleComponentDefinition(name, moduleId) {
  var options = arguments[2] || {};

  if (!_.isString(moduleId) || _.isEmpty(moduleId)) throw new Error('must specify a valid module-id');

  Component.call(this, name, options);

  moduleId = normalizeModulePath(moduleId);

  _.extend(this, {
    type: 'core.module',
    moduleId: moduleId
  });
}

inherits(ModuleComponentDefinition, Component);

_.extend(ModuleComponentDefinition.prototype, {

  load: function () {
    return require(this.moduleId);
  }

});

module.exports = ModuleComponentDefinition;
