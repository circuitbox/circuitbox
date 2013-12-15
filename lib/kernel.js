/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('./utils')._;
  var definitions = require('./definitions');

  var config = require('./config');
  var Configuration = config.Configuration;
  var ComponentRegistry = require('./components').ComponentRegistry;

  module.exports = function Kernel() {
    var self = this;
    var options = arguments[0] || {};
    var registry = new ComponentRegistry();
    var components = {};
    var _name, configuration;

    function buildConfiguration(options) {
      return new Configuration(self, options);
    }
    
    Object.defineProperties(self, {
      'hasComponents': {
        get: function getHasComponents() {
          return !_.isEmpty(components);
        }
      },
      'name': {
        get: function getName() {
          return _name;
        },
        set: function setName(newName) {
          _name = newName;
        }
      },
      'registry': {
        get: function getRegistry() {
          return registry;
        }
      }
    });

    self.get = function getComponent(componentName) {
      if (!(componentName in components)) {
        throw new definitions.NoSuchComponentDefinitionError(componentName);
      }
      return components[componentName];
    };

    if (options) {
      configuration = buildConfiguration(options);
    }
  };
})();