/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var kernel = require('./kernel');

function withBindings() {
  return Object.create(Object.prototype, {
    create: {
      writable: false,
      enumerable: true,
      value: function () {
        var options = arguments[0] || { modules: [] };
        var callback = arguments[1];
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