/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('../utils/')._;
  var Scopes = require('./scopes');
  var ComponentCreationException = require('./componentCreationException');
  var ComponentDefinitionException = require('./componentDefinitionException');

  module.exports = function ComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};
    var initializerValid = (_.isFunction(options.initializer) || _.isString(options.initializer));

    if (options.initializer && !initializerValid) {
      throw new ComponentDefinitionException(options.name, 'Initializer for \'' + options.name +
        '\' must be a function or string');
    }

    self.name = function name() {
      return options.name;
    };

    self.scope = function scope() {
      return options.scope || Scopes.prototype;
    };

    self.initializer = function initializer() {
      return options.initializer;
    };

    self.dependencies = function dependencies() {
      return options.dependencies;
    };

    self.getEmitter = function getEmitter() {
      throw new ComponentCreationException(self.name());
    };
  };

})();