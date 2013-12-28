/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var utils = require('./utils');

function Promise(handlerBag) {

  if (!(this instanceof Promise)) {
    return new Promise(handlerBag);
  }

  this.done = function registerThenHandler(fn) {
    if (!utils.isFunction(fn)) {
      throw new Error('Fulfillment handler must be a function');
    }
    handlerBag.thenHandler = fn;
    return this;
  };

  this.fail = function registerFailHandler(fn) {
    if (!utils.isFunction(fn)) {
      throw new Error('Failure handler must be a function');
    }
    handlerBag.failHandler = fn;
    return this;
  };

}

module.exports = Promise;