/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('./componentCreatorFactory'),
    ScopeHandlerFactory = require('./scopeHandlerFactory'),
    SelectorFactory = require('./selectorFactory');

_.extend(exports, {
  registerDefinitionBuilder: ComponentDefinitionBuilderFactory.registerBuilder,
  registerComponentCreator: ComponentCreatorFactory.registerCreator,
  registerScopeHandler: ScopeHandlerFactory.registerScopeHandler,
  registerSelector: SelectorFactory.registerSelector
});
