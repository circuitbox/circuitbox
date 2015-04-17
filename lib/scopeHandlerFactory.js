/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    fmt = require('./utils').fmt,
    hMap = {};

function ScopeHandlerFactory(componentFactory) {
  this._factory = componentFactory;

  global.__cbx = _.extend((global.__cbx || {}), {
    _scopeHandlers: {}
  });

  this._handlers = global.__cbx._scopeHandlers;
}

ScopeHandlerFactory.prototype.handlerFor = function (scope) {
  /*jshint newcap: false*/
  var h;

  if (this._handlers[scope]) return this._handlers[scope];

  h = hMap[scope];
  if (!h) throw new Error(fmt('no registered ScopeHandler for scope "%s"', scope));

  h = new h(this._factory);
  this._handlers[scope] = h;

  return h;
};

_.extend(ScopeHandlerFactory, {

  registerScopeHandler: function (scope, handler) {
    if (hMap[scope]) throw new Error(fmt('ScopeHandler already registered for scope "%s"', scope));
    hMap[scope] = handler;
  },

  _reset: function () {
    hMap = {};
  }

});

module.exports = ScopeHandlerFactory;
