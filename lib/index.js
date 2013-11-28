/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var CircuitBox = require('./kernel');

  var exports = module.exports = {};

  exports.Scopes = require('./components/scopes');
  exports.ComponentCreationError = require('./components/componentCreationError');
  exports.NoSuchComponentDefinitionError = require('./components/noSuchComponentDefinitionError');

  exports.create = function create() {
    var options = arguments[0] || {};
    return new CircuitBox(options);
  };

})();