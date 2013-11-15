/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var CircuitBox = require('./circuitbox');

  var exports = module.exports = {};

  exports.Scopes = require('./components/scopes');
  exports.ComponentCreationException = require('./components/componentcreationexception');
  exports.NoSuchComponentDefinitionException = require('./components/nosuchcomponentdefinitionexception');

  exports.create = function create() {
    var options = arguments[0] || {};
    return new CircuitBox(options);
  };

})();