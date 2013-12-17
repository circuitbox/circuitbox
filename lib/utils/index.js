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
    if (isString(target) || isArray(target)) {
      return !target.length;
    }
    return !Object.keys(target).length;
  }

  function sprintf() {
    return nodeUtils.format.apply(nodeUtils, Array.prototype.slice.call(arguments, 0));
  }

  module.exports = {
    isString: isString,
    isNumber: isNumber,
    isArray: isArray,
    isObject: isObject,
    isFunction: isFunction,
    isEmpty: isEmpty,
    sprintf: sprintf,
    inherits: nodeUtils.inherits
  };

})();