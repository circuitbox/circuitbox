/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');
var ComponentDefinitionError = require('./componentDefinitionError');

function Configuration() {
  var kernel = arguments[0];
  var options = arguments[1] || {};
  var componentRegistry = kernel.registry;

  function registerModules(modules) {
    if (!modules.length) return;

    _.each(modules, function processModule(module) {
      if (typeof(module) !== 'function')
        throw new ComponentDefinitionError('Cannot initialize module which is not a function');
      componentRegistry.registerModule(module);
    }, componentRegistry);
  }

  if (options.name) {
    kernel.name = options.name;
  }

  if (options.modules) {
    registerModules(options.modules);
  }
}

module.exports = Configuration;