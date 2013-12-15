/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var ComponentRegistry = require('./componentRegistry');
  var ComponentDefinitionError = require('../definitions').ComponentDefinitionError;

  function Configuration() {
    var kernel = arguments[0];
    var options = arguments[1] || {};
    var componentRegistry = kernel.registry;
    
    function registerModules(modules) {
      if (!modules.length) {
        return;
      }
      
      modules.forEach(function processModule(mod) {
        if (typeof(mod) !== 'function') {
          throw new ComponentDefinitionError('Cannot initialize module which is not a function');
        }
        mod.call(this, componentRegistry);
      }, componentRegistry);
    }

    if (options.name) {
      kernel.name = options.name;
    }
    
    if (options.modules) {
      registerModules(options.modules);
    }
  }

  module.exports.Configuration = Configuration;
  module.exports.ComponentRegistry = ComponentRegistry;

})();