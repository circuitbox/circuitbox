/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var when = require('when');

var kernel = require('./kernel');
var extender = require('./extender');
var utils = require('./utils');

function withBindings() {
  var bindings = utils.arrgs(arguments);
  
  return Object.create(Object.prototype, {
    create: {
      writable: false,
      enumerable: true,
      value: function () {
        var options = arguments[0] || { modules: [] };
        var callback = arguments[1];

        if (bindings && bindings.length) {
          try {
            extender.loadBindings(bindings);
          } catch (e) {
            if (callback) {
              callback(e);
              return;
            }
            return when.reject(e);
          }
        }

        return kernel(options, callback);
      }
    }
  });
}

function create(options) {
  return withBindings().create(options);
}

module.exports = Object.create(Object.prototype, {

  Scopes: {
    writable: false,
    enumerable: true,
    value: require('./scopes')
  },

  ComponentCreationError: {
    writable: false,
    enumerable: true,
    value: require('./componentCreationError')
  },

  ComponentDefinitionError: {
    writable: false,
    enumerable: true,
    value: require('./componentDefinitionError')
  },

  NoSuchComponentDefinitionError: {
    writable: false,
    enumerable: true,
    value: require('./noSuchComponentDefinitionError')
  },

  ComponentDefinition: {
    writable: false,
    enumerable: true,
    value: require('./componentDefinition')
  },

  SimpleComponentDefintion: {
    writable: false,
    enumerable: true,
    value: require('./simpleComponentDefinition')
  },

  ModuleBasedComponentDefinition: {
    writable: false,
    enumerable: true,
    value: require('./moduleBasedComponentDefinition')
  },

  ComponentAssemblyStrategy: {
    writable: false,
    enumerable: true,
    value: require('./componentAssemblyStrategy')
  },

  SimpleComponentAssemblyStrategy: {
    writable: false,
    enumerable: true,
    value: require('./simpleComponentAssemblyStrategy')
  },

  ModuleBasedComponentAssemblyStrategy: {
    writable: false,
    enumerable: true,
    value: require('./moduleBasedComponentAssemblyStrategy')
  },

  create: {
    writable: false,
    enumerable: true,
    value: create
  },

  withBindings: {
    writable: false,
    enumerable: true,
    value: withBindings
  }

});