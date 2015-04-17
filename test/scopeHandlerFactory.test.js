/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    Registry = require('../lib/registry'),
    ComponentFactory = require('../lib/componentFactory'),
    SingletonScopeHandler = require('../lib/singletonScopeHandler'),
    ScopeHandlerFactory = require('../lib/scopeHandlerFactory');

describe('ScopeHandlerFactory', function () {
  var r = new Registry(),
      cf = new ComponentFactory(r);

  it('must register the specified ScopeHandler for the specified scope and return its instance when requested', function () {
    ScopeHandlerFactory.registerScopeHandler('singleton', SingletonScopeHandler);

    expect(new ScopeHandlerFactory(cf).handlerFor('singleton')).to.be.an.instanceof(SingletonScopeHandler);

    ScopeHandlerFactory._reset();
  });

  it('must throw error if an attempt is made to register a ScopeHandler for a scope which has already registered', function () {
    ScopeHandlerFactory.registerScopeHandler('singleton', SingletonScopeHandler);

    expect(function () {
      ScopeHandlerFactory.registerScopeHandler('singleton', SingletonScopeHandler);
    }).to.throw('ScopeHandler already registered for scope "singleton"');

    ScopeHandlerFactory._reset();
  });

  it('must throw error if a request is made for a scope which does not have a ScopeHandler registered', function () {
    ScopeHandlerFactory.registerScopeHandler('singleton', SingletonScopeHandler);

    expect(function () {
      new ScopeHandlerFactory(cf).handlerFor('prototype');
    }).to.throw('no registered ScopeHandler for scope "prototype"');

    ScopeHandlerFactory._reset();
  });

});