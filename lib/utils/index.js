/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
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
    inherits: nodeUtils.inherits
  };

})();