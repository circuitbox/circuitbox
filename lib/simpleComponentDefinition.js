/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    inherits = require('./utils').inherits,
    Component = require('./componentDefinition');

function SimpleComponentDefinition(name, value) {
  var options = arguments[2] || {};

  if (typeof(value) === 'undefined') throw new Error('must specify component value');

  Component.call(this, name, options);

  _.extend(this, { value: value });
}

inherits(SimpleComponentDefinition, Component);

module.exports = SimpleComponentDefinition;
