/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('./componentCreatorFactory'),
    ScopeHandlerFactory = require('./scopeHandlerFactory');

_.extend(exports, {
  registerDefinitionBuilder: ComponentDefinitionBuilderFactory.registerBuilder,
  registerComponentCreator: ComponentCreatorFactory.registerCreator,
  registerScopeHandler: ScopeHandlerFactory.registerScopeHandler
});
