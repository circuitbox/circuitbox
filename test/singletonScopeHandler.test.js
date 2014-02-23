/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    expect = require('chai').expect,
    SingletonScopeHandler = require('../lib/singletonScopeHandler'),
    ScopeHandler = require('../lib/scopeHandler'),
    Registry = require('../lib/registry'),
    ComponentFactory = require('../lib/componentFactory'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory');

describe('SingletonScopeHandler', function () {

  beforeEach(function () {
    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);
    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);
  });

  afterEach(function () {
    ComponentDefinitionBuilderFactory._reset();
    ComponentCreatorFactory._reset();
  });

  it('should inherit ScopeHandler', function () {
    expect(SingletonScopeHandler.super_).to.be.equal(ScopeHandler);
  });

  it('should throw error if attempt is made to create a component whose scope is not supported by it', function () {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        d = new SimpleComponentDefinition('foo', 'bar', {scope: 'prototype'}),
        ssh = new SingletonScopeHandler(cf);

    expect(function () {
      ssh.resolve(d, function () {});
    }).to.throw('the scope "prototype" of component "foo" is not supported by SingletonScopeHandler');

  });

  it('should resolve to the same instance of a singleton scoped component', function (done) {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        ssh = new SingletonScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function () {
        return _.random(1, 9999);
      });
    });

    ssh.resolve(r.find('foo'), function (err1, n1) {
      ssh.resolve(r.find('foo'), function (err2, n2) {
        expect(n2).to.be.equal(n1);
        done();
      });
    });
  });

  it('should resolve to the same instance of a singleton scoped component and created only once', function (done) {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        ssh = new SingletonScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function (d, cb) {
        setTimeout(function () {
          cb(null, _.random(1, 9999));
        }, 1900);
      });
    });

    ssh.resolve(r.find('foo'), function (err1, n1) {
      ssh.resolve(r.find('foo'), function (err2, n2) {
        expect(n2).to.be.equal(n1);
        done();
      });
    });
  });

  it('should invoke callback with an error if the creator throws an error', function (done) {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        ssh = new SingletonScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function (d, cb) {
        setTimeout(function () {
          cb(new Error('intentional mistake'));
        }, 1900);
      });
    });

    ssh.resolve(r.find('foo'), function (err) {
      expect(err.message).to.be.equal('intentional mistake');
      done();
    });
  });

  it('should queue up singleton component requests and invoke all request callbacks when component is created', function (done) {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        ssh = new SingletonScopeHandler(cf),
        n1;

    r.registerModule(function (reg) {
      reg.for('foo').use(function (d, cb) {
        setTimeout(function () {
          cb(null, _.random(1, 9999));
        }, 1900);
      });
    });

    ssh.resolve(r.find('foo'), function (err1, n) {
      n1 = n;
    });

    ssh.resolve(r.find('foo'), function (err2, n2) {
      expect(n2).to.be.equal(n1);
      done();
    });

  });

  it('should queue up singleton component requests and invoke all request callbacks with error when component creation throws error', function (done) {
    var r = new Registry(),
        cf = new ComponentFactory(r),
        ssh = new SingletonScopeHandler(cf);

    r.registerModule(function (reg) {
      reg.for('foo').use(function (d, cb) {
        setTimeout(function () {
          cb(new Error('intentional mistake'));
        }, 1900);
      });
    });

    ssh.resolve(r.find('foo'), function (err) {
      expect(err.message).to.be.equal('intentional mistake');
    });

    ssh.resolve(r.find('foo'), function (err) {
      expect(err.message).to.be.equal('intentional mistake');
      done();
    });

  });

});