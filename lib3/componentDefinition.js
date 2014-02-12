/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var utils = require('./utils');

var Scopes = require('./scopes');
var ComponentDefinitionError = require('./componentDefinitionError');

function ComponentDefinition() {
  var self = this;
  var options = arguments[0] || {};
  var initializerValid = (_.isFunction(options.initializer) || _.isString(options.initializer));

  // #7 - components are singleton by default
  options.scope = options.scope || Scopes.singleton;

  if (options.initializer && !initializerValid)
    throw new ComponentDefinitionError(utils.sprintf('Initializer for \'%s\' must be a function or string',
      options.name), options.name);

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
    'isSingleton': {
      get: function isSingleton() {
        return options.scope === Scopes.singleton;
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