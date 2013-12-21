/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var errors = require('./errors');

  var Kernel = require('./kernel');

  exports.Scopes = require('./scopes');
  exports.ComponentCreationError = errors.ComponentCreationError;
  exports.ComponentDefinitionError = errors.ComponentDefinitionError;
  exports.NoSuchComponentDefinitionError = errors.NoSuchComponentDefinitionError;

  exports.create = function create() {
    var options = arguments[0] || {};
    return new Kernel(options);
  };

})();