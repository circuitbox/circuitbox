/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var path = require('path');
var util = require('util');

var _ = require('lodash');
var _str = require('underscore.string');

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

function normalizeModulePath(moduleId) {
  // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
  if (/^\.\/|^\.\.\/|^\//.test(moduleId)) return path.join(process.cwd(), moduleId);
  return moduleId;
}

module.exports = {
  sprintf: _str.sprintf,
  enumFor: enumFor,
  inherits: util.inherits,
  normalizeModulePath: normalizeModulePath
};