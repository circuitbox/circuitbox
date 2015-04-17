/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

function ScopeHandler(componentFactory) {
  this._factory = componentFactory;
}

ScopeHandler.prototype.resolve = function (componentDefinition, cb) {
  /*jshint unused: false*/
  throw new Error('not implemented');
};

module.exports = ScopeHandler;