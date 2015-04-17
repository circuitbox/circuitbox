/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
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
