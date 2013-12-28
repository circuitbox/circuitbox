/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');

function Promise(handlerBag) {

  if (!(this instanceof Promise)) {
    return new Promise(handlerBag);
  }

  function checkIfFunction(fn) {
    if (!_.isFunction(fn)) {
      throw new Error('Fulfillment handler must be a function');
    }
  }

  this.done = function registerThenHandler(fn) {
    checkIfFunction(fn);
    handlerBag.thenHandler = fn;
    return this;
  };

  this.fail = function registerFailHandler(fn) {
    checkIfFunction(fn);
    handlerBag.failHandler = fn;
    return this;
  };

}

module.exports = Promise;