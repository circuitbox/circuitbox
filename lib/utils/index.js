/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var nodeUtils = require('util');
  var underscore = require('underscore');

  module.exports._ = underscore;
  module.exports.inherits = nodeUtils.inherits;

})();