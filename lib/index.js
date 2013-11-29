/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var Kernel = require('./kernel');

  var exports = module.exports = {};

  exports.components = require('./components');
  exports.definitions = require('./definitions');

  exports.create = function create() {
    var options = arguments[0] || {};
    return new Kernel(options);
  };

})();