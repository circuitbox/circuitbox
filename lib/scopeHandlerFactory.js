/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('./utils').fmt,
    hMap = {};

function ScopeHandlerFactory(componentFactory) {
  this._factory = componentFactory;
}

ScopeHandlerFactory.prototype.handlerFor = function (scope) {
  /*jshint newcap: false*/
  var h = hMap[scope];

  if (!h) throw new Error(fmt('no registered ScopeHandler for scope "%s"', scope));

  return new h(this._factory);
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