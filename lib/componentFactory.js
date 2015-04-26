/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    async = require('async'),
    ComponentDefinition = require('./componentDefinition'),
    ComponentCreatorFactory = require('./componentCreatorFactory'),
    ScopeHandlerFactory = require('./scopeHandlerFactory'),
    assembler = require('./assembler');

function ComponentFactory(registry) {
  this._cfactory = new ComponentCreatorFactory();
  this._scopeFactory = new ScopeHandlerFactory(this);
  this._reg = registry;
}

ComponentFactory.prototype.create = function (tgt, cb) {
  var t = this,
      reg = t._reg,
      td, depNames;

  try {
    td = (tgt instanceof ComponentDefinition) ? tgt : reg.find(tgt);
    depNames = reg.dependencyListFor(td.name);
  } catch (e) {
    return cb(e);
  }

  depNames = _.isEmpty(depNames) ? [] : _.take(depNames, depNames.length - 1);

  async.parallel(_.map(depNames, assembler, t), function (err, cmps) {
    var deps;

    if (err) return cb(err);

    // put together the component definitions with their names
    deps = _.chain(cmps).reduce(_.extend, {}).value();

    // inject process.env
    deps.env = process.env;

    try {
      // Gets the assembly-strategy for the specified component,
      // passes it the specified dependencies and assembles it
      t._cfactory.creatorFor(td, deps).create(cb);
    } catch (e) {
      cb(e);
    }
  });
};

module.exports = ComponentFactory;
