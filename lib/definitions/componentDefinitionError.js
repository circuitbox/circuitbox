/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../utils');

  function ComponentDefinitionError(componentName, message) {
    Error.call(this);

    this.name = 'ComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || utils._.sprintf('Definition for component \'%s\' is invalid', this.componentName);
  }

  utils.inherits(ComponentDefinitionError, Error);

  module.exports = ComponentDefinitionError;

})();