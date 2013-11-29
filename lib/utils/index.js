/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var nodeUtils = require('util');
  var _ = require('underscore');
  _.str = require('underscore.string');

  _.mixin(_.str.exports());

  module.exports._ = _;
  module.exports.inherits = nodeUtils.inherits;

})();