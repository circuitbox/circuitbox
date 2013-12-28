/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var Promise = require('./promise');

function Deferred() {
  if (!(this instanceof Deferred)) {
    return new Deferred();
  }

  // bag to store all the handlers
  var handlerBag = {};

  var promise = new Promise(handlerBag);

  Object.defineProperty(this, 'promise', {
    get: function () {
      return promise;
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