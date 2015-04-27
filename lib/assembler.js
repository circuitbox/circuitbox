'use strict';

var _ = require('lodash'),
    async = require('async'),
    SelectorFactory = require('./selectorFactory');

// returns a function which builds an Assembler for the specified component name
function singleComponentAssembler(cName) {
  /* jshint validthis: true */
  var t = this;

  return function (aCb) {
    var r = t._reg,
        d;

    try {
      d = r.find(cName);

      // have the scope handler resolve the component
      return t._scopeFactory.handlerFor(d.scope).resolve(d, function (err, cmp) {
        var r;

        if (err) return aCb(err);

        // return an object with key as component name and value as component
        r = {};
        r[cName] = cmp;

        return aCb(null, r);
      });
    } catch (e) {
      return aCb(e);
    }

  };
}

/*
 * Returns a function which when called, assembles an object
 * that holds the multiple components defined by selector expression
 */
function multiComponentAssembler(expr) {
  /* jshint validthis: true */
  var t = this;

  /* jshint unused: false */
  return function (aCb) {
    var r = t._reg,
        selExpr, defs, asmrs;

    try {
      selExpr = SelectorFactory.parse(expr);
      defs = r.findBySelector(SelectorFactory.selectorFor(selExpr));

      asmrs = _.map(defs, function (def) {
        return singleComponentAssembler.call(t, def.name);
      });

      async.series(asmrs, function (err, cmps) {
        var cmp;

        if (err) return aCb(err);

        cmp = {};
        cmp[selExpr.name] = _.chain(cmps).reduce(_.extend, {}).value();

        return aCb(null, cmp);
      });
    } catch (e) {
      return aCb(e);
    }
  };
}

function assembler(cName) {
  /*jshint validthis: true*/
  var asmrFn;

  // if component name is a selector expression, use multi-component assembly
  asmrFn = (SelectorFactory.hasSelector(cName)) ?
    multiComponentAssembler : singleComponentAssembler;

  return asmrFn.call(this, cName);
}

module.exports = assembler;