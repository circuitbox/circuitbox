/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('./utils/')._;
  var components = require('./components/');

  module.exports = function CircuitBox() {
    var self = this;
    var options = arguments[0] || {};
    var _components = {};

    if (options) {
      var _name = options.name;
    }

    self.hasComponents = function hasComponents() {
      return !_.isEmpty(_components);
    };

    self.get = function get(componentName) {
      if (!_.contains(_components, componentName)) {
        throw new components.NoSuchComponentDefinitionException(componentName);
      }
      return _components[componentName];
    };

    self.name = function name() {
      return _name;
    };
  };
})();