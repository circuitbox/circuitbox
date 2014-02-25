/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    arrgs = require('./utils').arrgs,
    binder = require('./binder'),
    Kernel = require('./kernel');

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

    // register the default bindings
    require('./defaultBindings')(binder);

    if (a && !_.isEmpty(a)) {
      _.each(a, function (binding) {
        binding.call(binding, binder);
      });
    }

    return {
      create: function () {
        /*jshint newcap: false*/
        return Kernel.apply(Kernel, arrgs(arguments));
      }
    };
  }

});