/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Registry = require('./registry'),
    ComponentFactory = require('./componentFactory'),
    ScopeHandlerFactory = require('./scopeHandlerFactory'),
    CoreModule = require('./coreModule');

function Kernel(name) {
  this.name = name;
  this._registry = new Registry();
  this._componentFactory = new ComponentFactory(this._registry);
  this._scopeFactory = new ScopeHandlerFactory(this._componentFactory);
}

function getCallback(n, cb) {
  /*jshint validthis: true*/
  var t = this,
      d;

  try {
    d = t._registry.find(n);
  } catch (e) {
    return cb(e);
  }

  return t._scopeFactory.handlerFor(d.scope).resolve(d, cb);
}

function getPromise(n) {
  /*jshint validthis: true*/
  var t = this,
      d = Q.defer();

  getCallback.bind(t)(n, function (err, c) {
    if (err) return d.reject(err);
    return d.resolve(c);
  });

  return d.promise;
}

Kernel.prototype.get = function (name, cb) {
  /*jshint unused: false*/
  var d;

  return cb ? getCallback.bind(this)(name, cb) : getPromise.bind(this)(name);
};

function initialize(opts) {
  /*jshint validthis: true*/
  var t = this;

  if (!_.isEmpty(opts.modules)) {
    _.each(opts.modules, function (m) {
      t._registry.registerModule(m);
    });
  }
}

function kallback(n, opts, cb) {
  try {
    var k = new Kernel(n);
    initialize.call(k, opts);
    cb(null, k);
  } catch (e) {
    return cb(e);
  }
}

function kernelPromise(n, opts) {
  var d = Q.defer();

  kallback(n, opts, function (err, k) {
    if (err) return d.reject(err);
    return d.resolve(k);
  });

  return d.promise;
}

module.exports = function () {
  var a = arguments,
      n, opts, cb;

  if (a.length === 1 && _.isString(a[0])) n = a[0];
  if (a.length === 1 && _.isObject(a[0]) && !_.isFunction(a[0])) opts = a[0];
  if (a.length === 1 && _.isFunction(a[0])) cb = a[0];

  if (a.length === 2 && _.isString(a[0]) && _.isFunction(a[1])) {
    n = a[0];
    cb = a[1];
  }

  if (a.length === 2 && _.isString(a[0]) && !_.isFunction(a[1])) {
    n = a[0];
    opts = a[1];
  }

  if (a.length === 3 && _.isString(a[0]) && _.isFunction(a[2])) {
    n = a[0];
    opts = a[1];
    cb = a[2];
  }

  opts = opts || { modules: [] };

  // add the core module
  opts.modules.unshift(CoreModule);

  return !cb ? kernelPromise(n, opts) : kallback(n, opts, cb);
};