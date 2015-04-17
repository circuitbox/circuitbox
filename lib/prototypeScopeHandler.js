/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var utils = require('./utils'),
    inherits = utils.inherits,
    fmt = utils.fmt,
    ScopeHandler = require('./scopeHandler');

function PrototypeScopeHandler(componentFactory) {
  ScopeHandler.call(this, componentFactory);
}

inherits(PrototypeScopeHandler, ScopeHandler);

PrototypeScopeHandler.prototype.resolve = function (componentDefinition, cb) {
  var d = componentDefinition;

  if (d.scope !== 'prototype')
    throw new Error(fmt('the scope "%s" of component "%s" is not supported by PrototypeScopeHandler', d.scope, d.name));

  this._factory.create(d, cb);
};

module.exports = PrototypeScopeHandler;