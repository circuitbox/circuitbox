/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    inherits = require('./utils').inherits,
    SimpleComponent = require('./simpleComponentDefinition'),
    ComponentBuilder = require('./componentDefinitionBuilder');

function SimpleComponentDefinitionBuilder(name, value) {
  ComponentBuilder.call(this, name);
  this.value = value;
}

inherits(SimpleComponentDefinitionBuilder, ComponentBuilder);

_.extend(SimpleComponentDefinitionBuilder.prototype, {
  build: function () {
    return new SimpleComponent(this.name, this.value, this.options);
  }
});

module.exports = SimpleComponentDefinitionBuilder;