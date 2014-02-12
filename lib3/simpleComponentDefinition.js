/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var utils = require('./utils');

var ComponentDefinition = require('./componentDefinition');

function SimpleComponentDefinition() {
  var self = this;
  var options = arguments[0] || {};

  ComponentDefinition.call(self, options);

  self.getComponent = function getComponent() {
    return options.component;
  };
}

utils.inherits(SimpleComponentDefinition, ComponentDefinition);

module.exports = SimpleComponentDefinition;