/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    inherits = require('util').inherits,
    SimpleComponent = require('./simpleComponent'),
    ComponentBuilder = require('./componentBuilder');

function SimpleComponentBuilder(name, value) {
  ComponentBuilder.call(this, name);
  this.value = value;
}

inherits(SimpleComponentBuilder, ComponentBuilder);

_.extend(SimpleComponentBuilder.prototype, {
  build: function () {
    return new SimpleComponent(this.name, this.value, this.options);
  }
});

module.exports = SimpleComponentBuilder;