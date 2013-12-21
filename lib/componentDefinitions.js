/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');
  var errors = require('./errors');

  var Scopes = require('./scopes');
  var ComponentCreationError = errors.ComponentCreationError;
  var ComponentDefinitionError = errors.ComponentDefinitionError;

  function ComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};
    var initializerValid = (utils.isFunction(options.initializer) || utils.isString(options.initializer));

    options.scope = options.scope || Scopes.prototype;

    if (options.initializer && !initializerValid) {
      throw new ComponentDefinitionError(utils.sprintf('Initializer for \'%s\' must be a function or string', options.name),
        options.name);
    }

    Object.defineProperties(self, {
      'name': {
        get: function getName() {
          return options.name;
        }
      },
      'scope': {
        get: function getScope() {
          return options.scope;
        }
      },
      'initializer': {
        get: function getInitializer() {
          return options.initializer;
        }
      },
      'dependencies': {
        get: function getDependencies() {
          return options.dependencies;
        }
      },
      'emitter': {
        configurable: true,
        get: function getEmitter() {
          throw new ComponentCreationError(self.name);
        }
      }
    });
  }

  function SimpleComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};

    ComponentDefinition.call(self, options);

    Object.defineProperty(self, 'emitter', {
      get: function getEmitter() {
        return function emitter() {
          return options.object;
        };
      }
    });
  }

  function ModuleBasedComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};

    ComponentDefinition.call(self, options);

    Object.defineProperty(self, 'emitter', {
      get: function getEmitter() {
        return function emitter() {
          return options.moduleId;
        };
      }
    });
  }

  utils.inherits(SimpleComponentDefinition, ComponentDefinition);
  utils.inherits(ModuleBasedComponentDefinition, ComponentDefinition);

  module.exports = {
    ComponentDefinition: ComponentDefinition,
    SimpleComponentDefinition: SimpleComponentDefinition,
    ModuleBasedComponentDefinition: ModuleBasedComponentDefinition
  };

})();