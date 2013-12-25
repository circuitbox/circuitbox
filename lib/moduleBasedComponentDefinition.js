/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  var ComponentDefinition = require('./componentDefinition');

  function ModuleBasedComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};

    ComponentDefinition.call(self, options);

    Object.defineProperty(self, 'emitter', {
      get: function getEmitter() {
        return function emitter() {
          return options.moduleId;
        };
      }
    });
  }

  utils.inherits(ModuleBasedComponentDefinition, ComponentDefinition);

  module.exports = ModuleBasedComponentDefinition;

})();