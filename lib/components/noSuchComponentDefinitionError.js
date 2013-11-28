/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  function NoSuchComponentDefinitionError(componentName, message) {
    Error.call(this);

    this.name = 'NoSuchComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || 'Component \'' + this.componentName + '\' could not be found';
  }

  require('../utils').inherits(NoSuchComponentDefinitionError, Error);

  module.exports = NoSuchComponentDefinitionError;

})();