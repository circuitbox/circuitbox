/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');

var utils = require('./utils');
var ComponentDefinitionError = require('./componentDefinitionError');

function Configuration() {
  var kernelView = arguments[0];
  var options = arguments[1] || {};

  function registerModules(modules) {
    if (!modules.length) return;

    _.each(modules, function processModule(module) {
      // #17 - Support circuitbox Module registration specified as module-ids
      if (_.isString(module)) module = require(utils.normalizeModulePath(module));

      if (!_.isFunction(module))
        throw new ComponentDefinitionError('Cannot initialize module which is not a function or module-id', '');

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