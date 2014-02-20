/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
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