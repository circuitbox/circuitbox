/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    expect = require('chai').expect,
    PrototypeScopeHandler = require('../lib/prototypeScopeHandler'),
    ScopeHandler = require('../lib/scopeHandler'),
    Registry = require('../lib/registry'),
    ComponentFactory = require('../lib/componentFactory'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory');

describe('PrototypeScopeHandler', function () {
  var r, cf;

  beforeEach(function () {
    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);
    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);

    r = new Registry();
    cf = new ComponentFactory(r);
  });

  afterEach(function () {
    ComponentDefinitionBuilderFactory._reset();
    ComponentCreatorFactory._reset();
  });

  it('should inherit ScopeHandler', function () {
    expect(PrototypeScopeHandler.super_).to.be.equal(ScopeHandler);
  });

  it('should throw error if attempt is made to create a component whose scope is not supported by it', function () {
    var d = new SimpleComponentDefinition('foo', 'bar'),
        psh = new PrototypeScopeHandler(cf);

    expect(function () {
      psh.resolve(d, function () {});
    }).to.throw('the scope "singleton" of component "foo" is not supported by PrototypeScopeHandler');

  });

  it('should resolve to a new instance of a prototype scoped component', function (done) {
    var psh = new PrototypeScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function () {
        return _.random(1, 9999);
      }).scopedAs('prototype');
    });

    psh.resolve(r.find('foo'), function (err1, n1) {
      psh.resolve(r.find('foo'), function (err2, n2) {
        expect(n2).not.to.be.equal(n1);
        done();
      });
    });
  });

  it('should invoke callback with error if component creator throws error', function (done) {
    var psh = new PrototypeScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function () {
        throw new Error('intentional mistake');
      }).scopedAs('prototype');
    });

    psh.resolve(r.find('foo'), function (err) {
      expect(err.message).to.be.equal('intentional mistake');
      done();
    });
  });

});
