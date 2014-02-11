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

/**
 * Converts specified arguments object to array
 */
function arrgs(args) {
  if (!args || !(arguments.length <= 1 && _.isObject(args)) || _.isEmpty(args))
    return [];
  
  if (args.length > 1) return _.toArray(args);

  if (_.isArray(args[0])) return args[0];
  
  if (_.isString(args[0]) || _.isObject(args[0]))
    return [args[0]];
}

/**
 * Returns an immutable object with the specified keys
 */
function enumFor() {
  var result = {};

  if (_.isEmpty(arguments)) return result;
  if (arguments.length > 1) return enumFor(arrgs(arguments));

  var source = arguments[0];

  if (_.isArray(source)) {
    _(source).each(function (constant, idx) {
      Object.defineProperty(result, constant, {
        value: idx + 1,
        writable: false,
        configurable: false,
        enumerable: true
      });
    });
  }

  if (_.isObject(source)) {
    _(source).each(function (value, constant) {
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
  arrgs: arrgs,
  sprintf: _str.sprintf,
  enumFor: enumFor,
  inherits: util.inherits,
  normalizeModulePath: normalizeModulePath
};