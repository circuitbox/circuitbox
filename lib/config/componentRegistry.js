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

  function ComponentRegistry() {
    var self = this;
    var _registeredDefinitionBuilders = [];

    self.addDefinitionBuilder = function (componentDefinitionBuilder) {
      _registeredDefinitionBuilders.push(componentDefinitionBuilder);
    };

    function isComponentNameRegistered(componentName) {
      return _.any(_registeredDefinitionBuilders, function (builder) {
        return builder.options.name === componentName;
      });
    }

    var builderFactoryApi = {
      for: function (componentName) {
        if (_.isEmpty(componentName)) {
          throw new ComponentDefinitionError('A valid component name must be specified');
        }
        if (isComponentNameRegistered(componentName)) {
          throw new ComponentDefinitionError('Another component with the name "' + componentName +
              '" has already been registered');
        }
        return new ComponentDefinitionBuilderFactory(self, componentName);
      }
    };

    self.registerModule = function registerModule(module) {
      // indirection to protect this ComponentRegistry instance
      module.call(module, builderFactoryApi);
    };

    Object.defineProperty(self, 'registeredDefinitions', {
      get: function () {
        return _registeredDefinitionBuilders;
      }
    });
  }

  module.exports = ComponentRegistry;
})();