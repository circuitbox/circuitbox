/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    async = require('async'),
    ComponentDefinition = require('./componentDefinition'),
    ComponentCreatorFactory = require('./componentCreatorFactory'),
    ScopeHandlerFactory = require('./scopeHandlerFactory');

// returns a function which builds an Assembler for the specified component name
function assembler(cName) {
  /*jshint validthis: true*/
  var t = this;

  return function (aCb) {
    var r = t._reg,
        d;

    try {
      d = r.find(cName);
      return t._scopeFactory.handlerFor(d.scope).resolve(d, aCb);
    } catch (e) {
      return aCb(e);
    }

  };
}

function ComponentFactory(registry) {
  this._cfactory = new ComponentCreatorFactory();
  this._scopeFactory = new ScopeHandlerFactory(this);
  this._reg = registry;
}

_.extend(ComponentFactory.prototype, {

  create: function (tgt, cb) {
    var t = this,
        reg = t._reg,
        td, depNames;

    try {
      td = (tgt instanceof ComponentDefinition) ? tgt : reg.find(tgt);
      depNames = reg.dependencyListFor(td.name);
    } catch (e) {
      return cb(e);
    }

    depNames = _.isEmpty(depNames) ? [] : _.first(depNames, depNames.length - 1);

    async.parallel(_.map(depNames, assembler, t), function (err, cmps) {
      var deps;

      if (err) return cb(err);

      // put together the cmps with their names
      deps = _.object(depNames, cmps);

      try {
        // Gets the assembly-strategy for the specified component,
        // passes it the specified dependencies and assembles it
        t._cfactory.creatorFor(td, deps).create(cb);
      } catch (e) {
        cb(e);
      }
    });
  }

});

module.exports = ComponentFactory;