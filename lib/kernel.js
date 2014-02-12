/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');
var when = require('when');

var Scopes = require('./scopes');
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

  // internalBus will be used to route internal circuitbox events
  var internalBus = new EventEmitter();

  var singletons = {};
  var singletonAssemblyQueue = {};

  var registry = new ComponentRegistry();
  var kernelView = {

    findSingleton: function findSingleton(name) {
      var result = singletons[name];
      if (!result) return null;
      return result;
    },

    storeSingleton: function storeSingleton(name, component) {
      singletons[name] = component;
      delete singletonAssemblyQueue[name];      // pull it off the queue
      internalBus.emit('singletonAssembled:' + name, component);
    },

    isQueuedForAssembly: function isQueuedForAssembly(name) {
      return singletonAssemblyQueue[name] || false;
    },

    enqueueForAssembly: function enqueueForAssembly(name) {
      singletonAssemblyQueue[name] = true;    // enqueue the component
    },

    onAssemblyComplete: function (componentName, callback) {
      internalBus.once('singletonAssembled:' + componentName, callback);
    }
    
  };

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
      // pre-register built-ins
      registry.registerModule(function (registry) {

        registry.for('events').requires('events').scope(Scopes.singleton);

        // the event bus for the container
        registry.for('bus').use(function (deps) {
          return new deps.events.EventEmitter();
        }).dependsOn('events').scope(Scopes.singleton);

      });

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
      kernelView: kernelView,
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