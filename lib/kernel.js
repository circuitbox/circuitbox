/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');

var NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');

var Configuration = require('./configuration');
var ComponentRegistry = require('./componentRegistry');

var AssemblyContext = require('./assemblyContext');
var Assembler = require('./assembler');

function Kernel() {
  var self = this;
  var options = arguments[0] || {};
  var registry = new ComponentRegistry();
  var components = {};
  var _name, configuration;

  function buildConfiguration(options) {
    // indirection to protect this kernel instance's state
    return new Configuration({
      setName: function (name) {
        _name = name;
      },
      registerModule: function (module) {
        registry.registerModule(module);
      }
    }, options);
  }

  Object.defineProperties(self, {
    'hasComponents': {
      get: function getHasComponents() {
        return !_.isEmpty(components);
      }
    },
    'name': {
      get: function getName() {
        return _name;
      }
    }
  });

  self.get = function getComponent(componentName) {
    if (!(componentName in components))
      throw new NoSuchComponentDefinitionError(componentName);

    Assembler.for(new AssemblyContext(componentName, {
      kernel: self,
      registry: registry
    })).assemble();

  };

  if (options) {
    configuration = buildConfiguration(options);
  }
}

module.exports = Kernel;