/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    fmt = require('./utils').fmt,
    bMap = {};

function ComponentDefinitionBuilderFactory(list, name) {
  /*jshint newcap: false*/

  _(bMap).each(function (bCtor, m) {
    this[m] = function (base) {
      var r = new bCtor(name, base);
      list.push(r);
      return r;
    };
  }, this).value();

}

_.extend(ComponentDefinitionBuilderFactory, {

  registerBuilder: function (method, builder) {
    if (bMap[method]) throw new Error(fmt('builder already registered for method %s', method));
    bMap[method] = builder;
  },

  _reset: function () {
    bMap = {};
  }

});

module.exports = ComponentDefinitionBuilderFactory;
