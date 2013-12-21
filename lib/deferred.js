/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint strict: false */

(function () {

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

  function Deferred() {
    if (!(this instanceof Deferred)) {
      return new Deferred();
    }

    // bag to store all the handlers
    var handlerBag = {};

    var p = new Promise(handlerBag);

    Object.defineProperty(this, 'promise', {
      get: function () {
        return p;
      }
    });

    this.resolve = function resolve(result) {
      if (handlerBag.thenHandler) {
        handlerBag.thenHandler(result);
      }
    };

    this.reject = function reject(reason) {
      if (handlerBag.failHandler) {
        handlerBag.failHandler(reason);
      }
    };
  }

  module.exports = Deferred;

})();