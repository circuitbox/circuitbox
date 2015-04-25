/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    fmt = require('./utils').fmt,
    selectorRex = /([a-zA-Z0-9]*)\:([a-zA-Z]*)\:(.*)$/,
    sMap = {};

_.extend(exports, {

  registerSelector: function (name, selectorFn) {
    if (sMap[name]) throw new Error(fmt('Selector already registered with name "%s"', name));
    if (selectorFn.length !== 2) throw new Error(
      'Specified selector function does not accept 2 parameters, "pattern" and "componentDefinition"');

    sMap[name] = selectorFn;
  },

  reset: function () {
    sMap = {};
  },

  hasSelector: function (expr) {
    return selectorRex.test(expr);
  },

  extractSelectorName: function (expr) {
    if (!this.hasSelector(expr)) return expr;
    return this.parse(expr).name;
  },

  selectorFor: function (expr) {
    var sel = this.parse(expr);

    if (!(sel.selector in sMap)) throw new Error(fmt('No selector registered with name "%s"', sel.selector));
    return _.partial(sMap[sel.selector], sel.pattern);
  },

  parse: function (expr) {
    var matches;
    
    if (!this.hasSelector(expr)) throw new Error(fmt('Expression "%s" is not a valid selector expression', expr));
    matches = selectorRex.exec(expr).slice(1);

    return {
      name: matches[0],
      selector: matches[1],
      pattern: matches[2]
    };
  }
  
});
