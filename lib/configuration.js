/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var ComponentDefinitionError = require('./componentDefinitionError');

function Configuration() {
  var kernelView = arguments[0];
  var options = arguments[1] || {};

  function registerModules(modules) {
    if (!modules.length) return;

    _.each(modules, function processModule(module) {
      if (typeof(module) !== 'function')
        throw new ComponentDefinitionError('Cannot initialize module which is not a function');
      kernelView.registerModule(module);
    });
  }

  if (options.name) {
    kernelView.setName(options.name);
  }

  if (options.modules) {
    registerModules(options.modules);
  }
}

module.exports = Configuration;