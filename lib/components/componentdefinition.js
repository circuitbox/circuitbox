/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('../utils/')._;
  var Scopes = require('./scopes');
  var ComponentCreationException = require('./componentcreationexception');
  var ComponentDefinitionException = require('./componentdefinitionexception');

  module.exports = function ComponentDefinition() {
    var options = arguments[0] || {};
    var self = this;

    if (options.initializer && !_.isFunction(options.initializer)) {
      throw new ComponentDefinitionException(options.name, 'Initializer for \'' + options.name + '\' must be a function');
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

    self.emit = function build() {
      throw new ComponentCreationException(self.name());
    };
  };

})();