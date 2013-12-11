/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('./utils')._;
  var definitions = require('./definitions');

  var Configuration = require('./config');

  module.exports = function Kernel() {
    var self = this;
    var options = arguments[0] || {};
    var components = {};
    var _name, configuration;

    function buildConfiguration(options) {
      return new Configuration(self, options);
    }

    Object.defineProperty(self, 'hasComponents', {
      get: function () {
        return !_.isEmpty(components);
      }
    });

    Object.defineProperty(self, 'name', {
      get: function () {
        return _name;
      },
      set: function (newName) {
        _name = newName;
      }
    });

    self.get = function get(componentName) {
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