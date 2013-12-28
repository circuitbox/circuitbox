/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var utils = require('./utils');

var Scopes = require('./scopes');
var ComponentDefinitionError = require('./componentDefinitionError');

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
    }
  });
}

module.exports = ComponentDefinition;