/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    Registry = require('../lib/registry'),
    ComponentFactory = require('../lib/componentFactory'),
    ScopeHandler = require('../lib/scopeHandler'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition');

describe('ScopeHandler', function () {

  it('should be able to create with a ComponentFactory', function () {
    var r = new Registry(),
        cf = new ComponentFactory(r);

    expect(new ScopeHandler(cf)).to.be.an.instanceof(ScopeHandler);
  });

  it('should throw error when #resolve() is called with a ComponentDefinition', function () {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        sh = new ScopeHandler(cf),
        d = new SimpleComponentDefinition('foo', 'bar');

    expect(function () {
      sh.resolve(d, function () {});
    }).to.throw('not implemented');
  });

});