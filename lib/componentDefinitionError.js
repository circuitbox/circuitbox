/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  function ComponentDefinitionError() {
    var message, componentName;

    Error.call(this);

    if (arguments.length === 1) {
      componentName = arguments[0];
    }

    if (arguments.length === 2) {
      message = arguments[0];
      componentName = arguments[1];
    }

    this.name = 'ComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || utils.sprintf('Definition for component \'%s\' is invalid', this.componentName);
  }

  module.exports = ComponentDefinitionError;

})();