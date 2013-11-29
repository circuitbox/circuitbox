/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../utils');

  function NoSuchComponentDefinitionError(componentName, message) {
    Error.call(this);

    this.name = 'NoSuchComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || utils._.sprintf('Component \'%s\' could not be found', this.componentName);
  }

  utils.inherits(NoSuchComponentDefinitionError, Error);

  module.exports = NoSuchComponentDefinitionError;

})();