/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');
var when = require('when');

var Configuration = require('./configuration');
var ComponentRegistry = require('./componentRegistry');

var AssemblyContext = require('./assemblyContext');
var Assembler = require('./assembler');

function Kernel() {
  var options = arguments[0] || {};
  var callback = arguments[1];

  if (!(this instanceof Kernel)) {
    return new Kernel(options, callback);
  }
  var self = this;
  
  var registry = new ComponentRegistry();
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

  function initialize(options, callback) {
    try {
      configuration = buildConfiguration(options);
    } catch (e) {
      callback(e);
      return;
    }
    callback(null, self);
  }

  Object.defineProperties(self, {
    'hasComponents': {
      get: function getHasComponents() {
        return registry.hasComponents;
      }
    },
    'name': {
      get: function getName() {
        return _name;
      }
    }
  });

  self.get = function getComponent(componentName, callback) {
    var assembler = Assembler.for(new AssemblyContext(componentName, {
      kernel: self,
      registry: registry
    }));

    if (callback && _.isFunction(callback)) {
      assembler.assemble(callback);
    } else {
      return assembler.assemble();
    }
  };

  if (options) {
    // use a promise if we have no callback
    if (!callback || !_.isFunction(callback)) {
      return when.promise(function (resolve, reject) {
        initialize(options, function (err, kernel) {
          if (err) {
            reject(err);
            return;
          }
          resolve(kernel);
        });
      });
    }

    initialize(options, callback);
  }
}

module.exports = Kernel;