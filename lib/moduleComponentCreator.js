/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format,
    inherits = require('util').inherits,
    ModuleComponent = require('./moduleComponentDefinition'),
    ComponentCreator = require('./componentCreator');

function ModuleComponentCreator(component, dependencies) {
  if (!(component instanceof ModuleComponent)) throw new Error(fmt('ModuleComponentCreator cannot create %s', component.constructor.name));
  ComponentCreator.call(this, component, dependencies);
}

inherits(ModuleComponentCreator, ComponentCreator);

_.extend(ModuleComponentCreator.prototype, {

  creationSequence: function () {
    var t = this,
        s = [];

    s.push(function (cb) {
      var v = t.component.load();

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

module.exports = ModuleComponentCreator;