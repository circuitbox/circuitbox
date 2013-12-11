/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint unused: false*/

(function () {
  'use strict';

  var ComponentRegistry = require('./componentRegistry');

  function Configuration() {
    var kernel = arguments[0];
    var options = arguments[1] || {};
    var componentRegistry = new ComponentRegistry();

    if (options.name) {
      kernel.name = options.name;
    }
  }

  module.exports = Configuration;

})();