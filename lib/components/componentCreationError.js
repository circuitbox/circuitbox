/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../utils');

  function ComponentCreationError(componentName, message) {
    Error.call(this);

    this.name = 'ComponentCreationError';
    this.componentName = componentName;
    this.message = message || utils._.sprintf('Component \'%s\' could not be created', this.componentName);
  }

  utils.inherits(ComponentCreationError, Error);

  module.exports = ComponentCreationError;

})();