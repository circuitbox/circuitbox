/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('./utils');

  var NoSuchComponentDefinitionError = require('./errors').NoSuchComponentDefinitionError;

  var Configuration = require('./configuration');
  var ComponentRegistry = require('./componentRegistry');

  //var AssemblyContext = components.assembly.AssemblyContext;

  module.exports = function Kernel() {
    var self = this;
    var options = arguments[0] || {};
    var registry = new ComponentRegistry();
    var components = {};
    var _name, configuration;

    function buildConfiguration(options) {
      return new Configuration(self, options);
    }

    Object.defineProperties(self, {
      'hasComponents': {
        get: function getHasComponents() {
          return !utils.isEmpty(components);
        }
      },
      'name': {
        get: function getName() {
          return _name;
        },
        set: function setName(newName) {
          _name = newName;
        }
      },
      'registry': {
        get: function getRegistry() {
          return registry;
        }
      }
    });

    self.get = function getComponent(componentName) {
      if (!(componentName in components)) {
        throw new NoSuchComponentDefinitionError(componentName);
      }

//      Assembler.for(new AssemblyContext(componentName, {
//        kernel: self,
//        registry: registry,
//        callBack: cb
//      })).assemble();
    };

    if (options) {
      configuration = buildConfiguration(options);
    }
  };
})();