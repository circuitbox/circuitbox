/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  function ComponentCreationError(componentName, message) {
    Error.call(this);

    this.name = 'ComponentCreationError';
    this.componentName = componentName;
    this.message = message || 'Component \'' + this.componentName + '\' could not be created';
  }

  require('../utils').inherits(ComponentCreationError, Error);

  module.exports = ComponentCreationError;

})();