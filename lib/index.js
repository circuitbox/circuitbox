/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    path = require('path'),
    utils = require('./utils'),
    arrgs = utils.arrgs,
    normalizeModulePath = utils.normalizeModulePath,
    Q = require('q'),
    binder = require('./binder'),
    Kernel = require('./kernel'),
    pathRex = /\//;

function prefixAndLoad(binding, basePath) {
  binding = normalizeModulePath(binding, basePath);
  binding = pathRex.test(binding) ? binding : ('circuitbox-' + binding);
  return require(binding);
}

_.extend(exports, {

  ComponentDefinition: require('./componentDefinition'),
  SimpleComponentDefinition: require('./simpleComponentDefinition'),
  ModuleComponentDefinition: require('./moduleComponentDefinition'),

  ComponentDefinitionBuilder: require('./componentDefinitionBuilder'),
  SimpleComponentDefinitionBuilder: require('./simpleComponentDefinitionBuilder'),
  ModuleComponentDefinitionBuilder: require('./moduleComponentDefinitionBuilder'),

  ComponentCreator: require('./componentCreator'),
  SimpleComponentCreator: require('./simpleComponentCreator'),
  ModuleComponentCreator: require('./moduleComponentCreator'),

  ScopeHandler: require('./scopeHandler'),

  create: function () {
    var bC = this.withBindings();
    return bC.create.apply(bC, arrgs(arguments));
  },

  withBindings: function () {
    var a = arrgs(arguments);

    return {
      create: function () {
        /*jshint newcap: false*/
        var args = arrgs(arguments),
            cb = _.find(args, _.isFunction),
            bp;

        global.__cbx = _.extend((global.__cbx || {}), {
          _basePath: (bp = module.parent ? path.dirname(module.parent.filename) : process.cwd())
        });

        // register the default bindings
        require('./defaultBindings')(binder);

        try {
          if (a && !_.isEmpty(a)) {
            _.each(a, function (binding) {
              binding =  _.isString(binding) ? prefixAndLoad(binding, bp) : binding;
              binding.call(binding, binder);
            });
          }
        } catch (e) {
          return cb ? cb(e) : Q.reject(e);
        }

        return Kernel.apply(Kernel, args);
      }
    };
  }

});