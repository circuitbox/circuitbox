/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var Kernel = require('./kernel');

  exports.Scopes = require('./scopes');
  exports.ComponentCreationError = require('./componentCreationError');
  exports.ComponentDefinitionError = require('./componentDefinitionError');
  exports.NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');

  exports.create = function create() {
    var options = arguments[0] || {};
    return new Kernel(options);
  };

})();