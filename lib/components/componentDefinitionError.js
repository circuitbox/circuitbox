/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  function ComponentDefinitionError(componentName, message) {
    Error.call(this);

    this.name = 'ComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || 'Definition for component \'' + this.componentName + '\' is invalid';
  }

  require('../utils').inherits(ComponentDefinitionError, Error);

  module.exports = ComponentDefinitionError;

})();