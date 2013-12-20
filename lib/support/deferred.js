/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */
/*jshint strict: false */
/*jshint newcap: false */

(function () {

  var utils = require('./utils');

  function promise(handlerBag) {

    if (!(this instanceof promise)) {
      return new promise(handlerBag);
    }

    this.then = function registerThenHandler(fn) {
      if (!utils.isFunction(fn)) {
        throw Error('Fulfillment handler must be a function');
      }
      handlerBag.thenHandler = fn;
      return this;
    };

    this.fail = function registerFailHandler(fn) {
      if (!utils.isFunction(fn) || !fn.length) {
        throw Error('Failure handler must be a function');
      }
      handlerBag.failHandler = fn;
      return this;
    };
  }

  function deferred() {
    if (!(this instanceof deferred)) {
      return new deferred();
    }

    // bag to store all the handlers
    var handlerBag = {};

    var p = promise(handlerBag);

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

  module.exports = deferred;
})();