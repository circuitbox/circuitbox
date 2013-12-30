/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');
var _str = require('underscore.string');
var util = require('util');

function enumFor() {
  var source = arguments[0];
  var result = {};

  if (arguments.length > 1) return enumFor(_.toArray(arguments));

  if (arguments.length === 1 && _.isArray(source)) {
    _.each(source, function (constant, idx) {
      Object.defineProperty(result, constant, {
        value: idx + 1,
        writable: false,
        configurable: false,
        enumerable: true
      });
    });
  }

  if (arguments.length === 1 && _.isObject(source)) {
    _.each(source, function (value, constant) {
      Object.defineProperty(result, constant, {
        value: value,
        writable: false,
        configurable: false,
        enumerable: true
      });
    });
  }

  return result;
}

module.exports = {
  sprintf: _str.sprintf,
  enumFor: enumFor,
  inherits: util.inherits
};