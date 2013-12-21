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
  
  function NoSuchComponentDefinitionError() {
    var message, componentName;

    Error.call(this);

    if (arguments.length === 1) {
      componentName = arguments[0];
    }

    if (arguments.length === 2) {
      message = arguments[0];
      componentName = arguments[1];
    }

    this.name = 'NoSuchComponentDefinitionError';
    this.componentName = componentName;
    this.message = message || utils.sprintf('Component \'%s\' could not be found', this.componentName);
  }

  utils.inherits(ComponentCreationError, Error);
  utils.inherits(ComponentDefinitionError, Error);
  utils.inherits(NoSuchComponentDefinitionError, Error);

  module.exports = {
    ComponentCreationError: ComponentCreationError,
    ComponentDefinitionError: ComponentDefinitionError,
    NoSuchComponentDefinitionError: NoSuchComponentDefinitionError
  };

})();