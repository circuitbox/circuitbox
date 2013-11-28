/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../../utils');
  var SimpleComponentDefinition = require('../simpleComponentDefinition');
  var ComponentDefinitionBuilder = require('./componentDefinitionBuilder');

  function SimpleComponentDefinitionBuilder(name, object) {
    var self = this;

    ComponentDefinitionBuilder.call(self, name);

    self.options = utils._.extend(self.options, {object: object});

    self.build = function buildDefinition() {
      return new SimpleComponentDefinition(self.options);
    };
  }

  utils.inherits(SimpleComponentDefinitionBuilder, ComponentDefinitionBuilder);

  module.exports = SimpleComponentDefinitionBuilder;

})();