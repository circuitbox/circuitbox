/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('../utils')._;
  var definitions = require('../definitions');

  var ComponentDefinitionError = definitions.ComponentDefinitionError;
  var ComponentDefinitionBuilderFactory = definitions.ComponentDefinitionBuilderFactory;

  function ComponentConfiguration() {
    this.for = function (componentName) {
      if (_.isEmpty(componentName)) {
        throw new ComponentDefinitionError('A valid component name must be specified');
      }
      return new ComponentDefinitionBuilderFactory(componentName);
    };
  }

  module.exports = ComponentConfiguration;
})();