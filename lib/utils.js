/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var nodeUtils = require('util');

function isString(target) {
  return typeof(target) === 'string';
}

function isNumber(target) {
  return typeof(target) === 'number';
}

function isArray(target) {
  return Array.isArray(target);
}

function isBoolean(target) {
  return typeof(target) === 'boolean';
}

function isObject(target) {
  return typeof(target) === 'object' && !isArray(target);
}

function isFunction(target) {
  return typeof(target) === 'function';
}

function isEmpty(target) {
  if (!target) {
    return true;
  }
  if (isBoolean(target)) {
    return !target;
  }
  if (isString(target) || isArray(target)) {
    return !target.length;
  }
  return !Object.keys(target).length;
}

function keys(target) {
  if (!target || !isObject(target)) {
    return [];
  }
  return Object.getOwnPropertyNames(target);
}

function values(target) {
  if (!target) {
    return [];
  }
  if (isString(target) || isNumber(target) || isFunction(target) || isBoolean(target)) {
    return [target];
  }
  if (isArray(target)) {
    return target;
  }
  return keys(target).map(function (key) {
    return target[key];
  });
}

function sprintf() {
  return nodeUtils.format.apply(nodeUtils, Array.prototype.slice.call(arguments, 0));
}

function enumFor() {
  var result = {};
  if (arguments.length === 1 && isArray(arguments[0])) {
    arguments[0].forEach(function (constant, idx) {
      Object.defineProperty(result, constant, {
        value: idx + 1,
        writable: false,
        configurable: false,
        enumerable: true
      });
    });
  }
  if (arguments.length === 1 && isObject(arguments[0])) {
    var source = arguments[0];
    Object.getOwnPropertyNames(source).forEach(function (constant) {
      Object.defineProperty(result, constant, {
        value: source[constant],
        writable: false,
        configurable: false,
        enumerable: true
      });
    });
  }
  if (arguments.length > 1) {
    return enumFor(Array.prototype.slice.apply(arguments));
  }
  return result;
}

module.exports = {
  isString: isString,
  isNumber: isNumber,
  isBoolean: isBoolean,
  isArray: isArray,
  isObject: isObject,
  isFunction: isFunction,
  isEmpty: isEmpty,
  keys: keys,
  values: values,
  sprintf: sprintf,
  enumFor: enumFor,
  inherits: nodeUtils.inherits
};