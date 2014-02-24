/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore');

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

  create: function () {},
  withBindings: function () {}

});