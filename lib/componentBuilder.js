/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    Component = require('./component');

function ComponentBuilder(name) {
  _.extend(this, {
    name: name,
    options: {}
  });
}

_.extend(ComponentBuilder.prototype, {

  scopedAs: function (scope) {
    this.options.scope = scope;
    return this;
  },

  initializeWith: function (i) {
    this.options.initializer = i;
    return this;
  },

  dependsOn: function () {
    var a = arguments,
        d = a[0];

    if (!a.length) return this;

    if (a.length === 1 && _.isArray(d)) {
      this.options.dependencies = d;
      return this;
    }

    if (a.length === 1 && _.isString(d)) {
      var lst = _.chain(d.split(',')).reduce(function (r, i) {
        r.push(i.trim());
        return r;
      }, []).value();

      return this.dependsOn(lst);
    }

    return this.dependsOn(_.toArray(a));
  },

  build: function () {
    return new Component(this.name, this.options);
  }

});

module.exports = ComponentBuilder;