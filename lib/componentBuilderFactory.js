/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format,
    builderMap = {};

function ComponentBuilderFactory(list, name) {
  /*jshint newcap: false*/

  _(builderMap).each(function (bCtor, m) {
    this[m] = function (base) {
      var r = new bCtor(name, base);
      list.push(r);
      return r;
    };
  }, this);

}

_.extend(ComponentBuilderFactory, {

  registerBuilder: function (method, builder) {
    if (builderMap[method]) throw new Error(fmt('builder already registered for method %s', method));
    builderMap[method] = builder;
  },

  _reset: function () {
    builderMap = {};
  }

});

module.exports = ComponentBuilderFactory;