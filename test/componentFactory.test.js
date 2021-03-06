/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
  fmt = require('../lib/utils').fmt,
  sinon = require('sinon'),
  registryApi = {
    dependencyListFor: function () {},
    find: function () {},
    findBySelector: function () {}
  },
  SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
  SimpleComponentCreator = require('../lib/simpleComponentCreator'),
  ComponentCreatorFactory = require('../lib/componentCreatorFactory'),
  ComponentFactory = require('../lib/componentFactory'),
  PrototypeScopeHandler = require('../lib/prototypeScopeHandler'),
  ScopeHandlerFactory = require('../lib/scopeHandlerFactory'),
  SelectorFactory = require('../lib/selectorFactory');

describe('ComponentFactory', function () {
  /*jshint expr: true*/
  var mr;

  beforeEach(function () {
    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);
    ScopeHandlerFactory.registerScopeHandler('prototype', PrototypeScopeHandler);

    mr = sinon.mock(registryApi);
  });

  afterEach(function () {
    mr.verify();
    mr.restore();

    ComponentCreatorFactory._reset();
    ScopeHandlerFactory._reset();
    SelectorFactory._reset();
  });

  it('should assemble target component specified as the component name and return to specified callback', function (done) {
    var n = 'myComponent',
      v = 'This is my message',
      cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs(n).returns([n]).once();
    mr.expects('find').withArgs(n).returns(new SimpleComponentDefinition(n, v, { scope: 'prototype' })).once();

    cf.create(n, function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal(v);
      done();
    });

  });

  it('should assemble target component specified as a ComponentDefinition and return to specified callback', function (done) {
    var n = 'myComponent',
      v = 'This is my message',
      cf = new ComponentFactory(registryApi),
      d = new SimpleComponentDefinition(n, v, { scope: 'prototype' });

    mr.expects('dependencyListFor').withArgs(n).returns([n]).once();

    cf.create(d, function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal(v);
      done();
    });

  });

  it('should assemble target component with dependencies and return to specified callback', function (done) {
    var n = 'message',
        location = 'Bangalore',
        message = 'This is my %s',
        lcd = new SimpleComponentDefinition('location', location, { scope: 'prototype' }),
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return fmt(message, deps.location);
        }, { scope: 'prototype', dependencies: ['location'] }),
        cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs('message').returns(['location', 'message']).once();
    mr.expects('dependencyListFor').withArgs('location').returns(['location']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('find').withArgs('location').returns(lcd).once();

    cf.create('message', function (err, r) {
      if (err) {
        done(err);
        return;
      }
      expect(r).to.be.equal('This is my Bangalore');
      done();
    });

  });

  it('should inject process.env to components via the dependencies field without explicit dependency', function (done) {
    var n = 'target',
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return deps.env;
        }, { scope: 'prototype' }),
        cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs(n).returns([n]).once();
    mr.expects('find').withArgs(n).returns(mcd).once();

    cf.create(n, function (err, r) {
      expect(r).to.be.equal(process.env);
      done();
    });

  });

  it('should throw error if a dependency is undefined for a specified component', function (done) {
    var n = 'message',
        cf = new ComponentFactory(registryApi);

    mr.expects('find').withArgs(n).returns(new SimpleComponentDefinition(n, 'ff', { scope: 'prototype' })).once();
    mr.expects('dependencyListFor').withArgs(n).throws(new Error('Cannot create a the component "message" due to unsatisfied dependencies: location')).once();

    cf.create(n, function (err) {
      expect(err.message).to.be.equal('Cannot create a the component "message" due to unsatisfied dependencies: location');
      done();
    });

  });

  it('should assemble target component with multi-level dependencies and return to specified callback', function (done) {
    var n = 'printer',
      citiesDef = new SimpleComponentDefinition('cities', ['Mumbai', 'Bangalore'], { scope: 'prototype' }),
      locationDef = new SimpleComponentDefinition('location', function (deps) {
        return deps.cities[0];
      }, { scope: 'prototype', dependencies: ['cities'] }),
      fmtDef = new SimpleComponentDefinition('fmt', function () {
        return fmt;
      }, {scope: 'prototype' }),
      langDef = new SimpleComponentDefinition('languages', {
        'Mumbai': 'Marathi',
        'Bangalore': 'Kannada'
      }, { scope: 'prototype' }),
      msgDef = new SimpleComponentDefinition('message', function (deps) {
        var location = deps.location;
        var language = deps.languages[location];
        return deps.fmt('This is my %s. We speak %s here.', location, language);
      }, { scope: 'prototype', dependencies: ['languages', 'fmt', 'location'] }),
      printerDef = new SimpleComponentDefinition(n, function (deps) {
        return deps.fmt('%s You may also want to travel to %s', deps.message, deps.cities[1]);
      }, { scope: 'prototype', dependencies: ['message', 'fmt', 'cities'] }),
      cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs(n).returns([
      'message',
      'fmt',
      'cities',
      'printer'
    ]).once();

    mr.expects('dependencyListFor').withArgs('message').returns([
      'fmt',
      'languages',
      'location',
      'message'
    ]).once();

    mr.expects('dependencyListFor').withArgs('location').returns([
      'cities',
      'location'
    ]).once();

    mr.expects('dependencyListFor').withArgs('fmt').returns([
      'fmt'
    ]).exactly(2);

    mr.expects('dependencyListFor').withArgs('cities').returns([
      'cities'
    ]).exactly(2);

    mr.expects('dependencyListFor').withArgs('languages').returns([
      'languages'
    ]).once();

    mr.expects('find').withArgs(n).returns(printerDef).once();
    mr.expects('find').withArgs('message').returns(msgDef).once();
    mr.expects('find').withArgs('fmt').returns(fmtDef).exactly(2);
    mr.expects('find').withArgs('location').returns(locationDef).once();
    mr.expects('find').withArgs('cities').returns(citiesDef).exactly(2);
    mr.expects('find').withArgs('languages').returns(langDef).once();

    cf.create(n, function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal('This is my Mumbai. We speak Marathi here. You may also want to travel to Bangalore');
      done();
    });

  });

  it('should invoke the callback with an error if the creation of a component failed', function (done) {
    var n = 'message',
        location = 'Bangalore',
        lcd = new SimpleComponentDefinition('location', location, { scope: 'prototype' }),
        mcd = new SimpleComponentDefinition(n, function () {
          throw new Error('intentional mistake');
        }, { scope: 'prototype', dependencies: ['location'] }),
        cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs('message').returns(['location', 'message']).once();
    mr.expects('dependencyListFor').withArgs('location').returns(['location']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('find').withArgs('location').returns(lcd).once();

    cf.create('message', function (err) {
      expect(err.message).to.be.equal('intentional mistake');
      done();
    });

  });

  it('should invoke the callback with an error if the creation of a component failed when a dependency was not registered', function (done) {
    var n = 'message',
        mcd = new SimpleComponentDefinition(n, function () {
          throw new Error('intentional mistake');
        }, { scope: 'prototype', dependencies: ['location'] }),
        cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs('message').returns(['location', 'message']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('find').withArgs('location').throws(new Error('not registered')).once();

    cf.create('message', function (err) {
      expect(err.message).to.be.equal('not registered');
      done();
    });

  });

  it('should invoke specified callback with error if the require component\'s dependency throws error', function (done) {
    var n = 'message',
        message = 'This is my %s',
        lcd = new SimpleComponentDefinition('location', function () {
          throw new Error('intentional mistake');
        }, { scope: 'prototype' }),
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return fmt(message, deps.location);
        }, { scope: 'prototype', dependencies: ['location'] }),
        cf = new ComponentFactory(registryApi);

    mr.expects('dependencyListFor').withArgs('message').returns(['location', 'message']).once();
    mr.expects('dependencyListFor').withArgs('location').returns(['location']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('find').withArgs('location').returns(lcd).once();

    cf.create('message', function (err) {
      expect(err.message).to.be.equal('intentional mistake');
      done();
    });

  });

  it('should invoke specified callback with error if no suitable ComponentCreator registered for ComponentDefinition', function (done) {
    var n = 'message',
        message = 'This is my %s',
        lcd = new SimpleComponentDefinition('location', function () {
          throw new Error('intentional mistake');
        }, { scope: 'prototype' }),
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return fmt(message, deps.location);
        }, { scope: 'prototype', dependencies: ['location'] }),
        cf = new ComponentFactory(registryApi);

    ComponentCreatorFactory._reset();

    mr.expects('dependencyListFor').withArgs('message').returns(['location', 'message']).once();
    mr.expects('dependencyListFor').withArgs('location').returns(['location']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('find').withArgs('location').returns(lcd).once();

    cf.create('message', function (err) {
      expect(err.message).to.be.equal('no registered ComponentCreator for component type SimpleComponentDefinition');
      done();
    });

  });

  it('should assemble target component with selector based dependencies and return to specified callback', function (done) {
    var n = 'message',
        firstName = 'John',
        lastName = 'Doe',
        message = 'Hello my name is %s %s',
        fncd = new SimpleComponentDefinition('firstName', firstName, { scope: 'prototype' }),
        lncd = new SimpleComponentDefinition('lastName', lastName, { scope: 'prototype' }),
        selectorFn = function (pat, cd) {
          var name = cd.name;
          return name === 'lastName' || name === 'firstName';
        },
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return fmt(message, deps.names.firstName, deps.names.lastName);
        }, { scope: 'prototype', dependencies: ['names:foo:*'] }),
        cf = new ComponentFactory(registryApi);

    SelectorFactory.registerSelector('foo', selectorFn);

    mr.expects('dependencyListFor').withArgs('message').returns(['names:foo:*', 'message']).once();
    mr.expects('dependencyListFor').withArgs('firstName').returns(['firstName']).once();
    mr.expects('dependencyListFor').withArgs('lastName').returns(['lastName']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('findBySelector').withArgs(sinon.match.func).returns([ fncd, lncd ]).once();
    mr.expects('find').withArgs('firstName').returns(fncd).once();
    mr.expects('find').withArgs('lastName').returns(lncd).once();

    cf.create('message', function (err, r) {
      if (err) {
        done(err);
        return;
      }
      expect(r).to.be.equal('Hello my name is John Doe');
      done();
    });

  });

  it('should not invoke callback with error if no selector based dependencies were found', function (done) {
    var n = 'message',
        message = 'Hello my name is %s %s',
        selectorFn = function (pat, cd) {
          var name = cd.name;
          return name === 'lastName' || name === 'firstName';
        },
        mcd = new SimpleComponentDefinition(n, function (deps) {
          return fmt(message, deps.names.firstName, deps.names.lastName);
        }, { scope: 'prototype', dependencies: ['names:foo:*'] }),
        cf = new ComponentFactory(registryApi);

    SelectorFactory.registerSelector('foo', selectorFn);

    mr.expects('dependencyListFor').withArgs('message').returns(['names:foo:*', 'message']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('findBySelector').withArgs(sinon.match.func).returns([]).once();

    cf.create('message', function (err, r) {
      if (err) {
        done(err);
        return;
      }
      expect(r).to.be.equal('Hello my name is undefined undefined');
      done();
    });

  });

  it('should assemble target component with mix of simple and selector based dependencies and return to specified callback', function (done) {
    var n = 'message',
        location = 'Timbuctoo',
        firstName = 'John',
        lastName = 'Doe',
        message = 'Hello my name is %s %s. I\'m from %s',
        fncd = new SimpleComponentDefinition('firstName', firstName, { scope: 'prototype' }),
        lncd = new SimpleComponentDefinition('lastName', lastName, { scope: 'prototype' }),
        lcd = new SimpleComponentDefinition('location', location, { scope: 'prototype' }),
        selectorFn = function (pat, cd) {
          var name = cd.name;
          return name === 'lastName' || name === 'firstName';
        },
        mcd = new SimpleComponentDefinition(n, function (deps) {
          var names = deps.names;
          return fmt(message, names.firstName, names.lastName, deps.location);
        }, { scope: 'prototype', dependencies: ['names:foo:*', 'location'] }),
        cf = new ComponentFactory(registryApi);

    SelectorFactory.registerSelector('foo', selectorFn);

    mr.expects('dependencyListFor').withArgs('message').returns(['names:foo:*', 'location', 'message']).once();
    mr.expects('dependencyListFor').withArgs('firstName').returns(['firstName']).once();
    mr.expects('dependencyListFor').withArgs('lastName').returns(['lastName']).once();
    mr.expects('dependencyListFor').withArgs('location').returns(['location']).once();

    mr.expects('find').withArgs(n).returns(mcd).once();
    mr.expects('findBySelector').withArgs(sinon.match.func).returns([ fncd, lncd ]).once();
    mr.expects('find').withArgs('firstName').returns(fncd).once();
    mr.expects('find').withArgs('lastName').returns(lncd).once();
    mr.expects('find').withArgs('location').returns(lcd).once();

    cf.create('message', function (err, r) {
      if (err) {
        done(err);
        return;
      }
      expect(r).to.be.equal('Hello my name is John Doe. I\'m from Timbuctoo');
      done();
    });

  });

});