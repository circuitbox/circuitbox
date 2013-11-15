/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var Scopes = require('./scopes');
  var ComponentCreationException = require('./componentcreationexception');

  module.exports = function ComponentDefinition() {
    var options = arguments[0] || {};
    var self = this;

    self.name = function name() {
      return options.name;
    };

    self.scope = function scope() {
      return options.scope || Scopes.prototype;
    };

    self.build = function build() {
      throw new ComponentCreationException(self.name());
    };
  };

})();