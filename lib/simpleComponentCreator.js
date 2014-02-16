/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    inherits = require('util').inherits,
    ComponentCreator = require('./componentCreator');

function SimpleComponentCreator(component, dependencies) {
  ComponentCreator.call(this, component, dependencies);
}

inherits(SimpleComponentCreator, ComponentCreator);

_.extend(SimpleComponentCreator.prototype, {

  creationSequence: function () {
    var t = this,
        s = [];

    s.push(function (cb) {
      var v = t.component.value;

      t.buildBase(v, function (err, cv) {
        if (err) {
          cb(err);
          return;
        }
        cb(null, (cv || v));
      });

    });

    if (t.component.initializer) s.push(t.initialize);

    return s;
  }

});

module.exports = SimpleComponentCreator;
