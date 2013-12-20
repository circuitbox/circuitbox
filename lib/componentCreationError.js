/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  function ComponentCreationError() {
    var componentName, message;

    Error.call(this);

    if (arguments.length === 1) {
      componentName = arguments[0];
    }

    if (arguments.length === 2) {
      message = arguments[0];
      componentName = arguments[1];
    }

    this.name = 'ComponentCreationError';
    this.componentName = componentName;
    this.message = message || utils.sprintf('Component \'%s\' could not be created', this.componentName);
  }

  utils.inherits(ComponentCreationError, Error);

  module.exports = ComponentCreationError;

})();