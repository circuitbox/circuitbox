/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    utils = require('./utils'),
    inherits = utils.inherits,
    fmt = utils.fmt,
    ScopeHandler = require('./scopeHandler');

function proxyCb(name) {
  return function (err, r) {
    if (!err) this._components[name] = r;

    _.each(this._componentQ[name], function (cb) {
      cb(err, r);
    });

    delete this._componentQ[name];
  };
}

function SingletonScopeHandler(componentFactory) {
  global.__cbx = _.extend((global.__cbx || {}), {
    _singletons: {
      _components: {},
      _componentQ: {}
    }
  });

  this._singletons = global.__cbx._singletons;

  ScopeHandler.call(this, componentFactory);
}

inherits(SingletonScopeHandler, ScopeHandler);

SingletonScopeHandler.prototype.resolve = function (componentDefinition, cb) {
  var d = componentDefinition,
      s = this._singletons,
      n = d.name;

  if (d.scope !== 'singleton')
    throw new Error(fmt('the scope "%s" of component "%s" is not supported by SingletonScopeHandler', d.scope, n));

  if (s._components[n]) return cb(null, s._components[n]);

  if (s._componentQ[n]) {
    s._componentQ[n].push(cb);
  } else {
    s._componentQ[n] = [cb];
    this._factory.create(d, proxyCb(n).bind(s));
  }
};

module.exports = SingletonScopeHandler;