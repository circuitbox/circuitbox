/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory'),
    ScopeHandlerFactory = require('../lib/scopeHandlerFactory'),
    Binder = require('../lib/binder');

describe('Binder', function () {

  it('should expose the #registerBuilder method of ComponentDefinitionBuilderFactory to the bindings', function () {
    expect(Binder.registerDefinitionBuilder).to.be.equal(ComponentDefinitionBuilderFactory.registerBuilder);
  });

  it('should expose the #registerCreator method of ComponentCreatorFactory to the bindings', function () {
    expect(Binder.registerComponentCreator).to.be.equal(ComponentCreatorFactory.registerCreator);
  });

  it('should expose the #registerScopeHandler method of ScopeHandlerFactory to the bindings', function () {
    expect(Binder.registerScopeHandler).to.be.equal(ScopeHandlerFactory.registerScopeHandler);
  });

});