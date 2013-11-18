/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var CircuitBox = require('./circuitBox');

  var exports = module.exports = {};

  exports.Scopes = require('./components/scopes');
  exports.ComponentCreationException = require('./components/componentCreationException');
  exports.NoSuchComponentDefinitionException = require('./components/noSuchComponentDefinitionException');

  exports.create = function create() {
    var options = arguments[0] || {};
    return new CircuitBox(options);
  };

})();