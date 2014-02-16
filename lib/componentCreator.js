/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    bindAllTo = require('./utils').bindAllTo,
    async = require('async');

function ComponentCreator(component, dependencies) {
  _.extend(this, {
    component: component,
    dependencies: dependencies
  });
}

_.extend(ComponentCreator.prototype, {

  buildBase: function (base, cb) {
    var deps = this.dependencies;

    if (!base) {
      cb(null, null);
      return;
    }

    if (_.isFunction(base)) {
      // async detection à la mocha
      // see - http://stackoverflow.com/questions/13570485/how-does-mocha-know-to-wait-and-timeout-only-with-my-asynchronous-tests
      if (base.length === 2) {
        base(deps, cb);
        return;
      }

      try {
        cb(null, base(deps));
      } catch (e) {
        cb(e);
      }

      return;
    }

    cb(null, base);
  },

  initialize: function (base, asyncCb) {
    var c = this.component,
        izr = c.initializer,
        deps = this.dependencies;

    if (!izr) {
      asyncCb(null, base);
      return;
    }

    // if initializer is specified as a string, it would be a method on
    // the base
    izr = (_.isString(izr)) ? base[izr] : izr;

    function safelyGetValue(err, r) {
      if (err) {
        asyncCb(err);
        return;
      }

      asyncCb(null, (r || base));
    }

    // async initializer detection à la mocha
    if (izr.length === 2) {
      izr.call(base, deps, safelyGetValue);
      return;
    }

    try {
      safelyGetValue(null, izr.call(base, deps));
    } catch (e) {
      asyncCb(e);
    }
  },

  creationSequence: function () {
    throw new Error('not implemented exception');
  },

  create: function (cb) {
    // build and run the assembly sequence in a waterfall
    async.waterfall(bindAllTo(this, this.creationSequence()), function (err, r) {
      cb(err, r);
    });
  }

});

module.exports = ComponentCreator;