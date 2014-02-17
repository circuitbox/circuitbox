/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    fmt = require('../lib/utils').fmt,
    ComponentDefinition = require('../lib/componentDefinition'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    ComponentCreator = require('../lib/componentCreator'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator');

describe('SimpleComponentCreator', function () {
  /*jshint expr: true */

  it('should inherit ComponentCreator', function () {
    expect(SimpleComponentCreator.super_).to.be.equal(ComponentCreator);
  });

  it('should assemble non-function component and pass to specified callback', function (done) {
    var n = 'myComponent',
        v = 'This is my message',
        d = new SimpleComponentDefinition(n, v);

    var cc = new SimpleComponentCreator(d);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal(v);
      done();
    });
  });

  it('should assemble function component by invoking it with dependencies and pass its return value to specified callback as component', function (done) {
    var n = 'myComponent',
      v = function (deps) {
        return deps.fmt('This is my %s', deps.location);
      },
      deps = {
        fmt: fmt,
        location: 'home'
      },
      c = new SimpleComponentDefinition(n, v, { dependencies: ['fmt', 'location'] }),
      cc = new SimpleComponentCreator(c, deps);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal('This is my home');
      done();
    });
  });

  it('should throw error if created with a ComponentDefinition other than SimpleComponentDefinition', function () {
    var n = 'myComponent',
      deps = {
        fmt: fmt,
        location: 'home'
      },
      c = new ComponentDefinition(n, { dependencies: ['fmt', 'location'] });

    expect(function () {
      /*jshint nonew: false*/
      new SimpleComponentCreator(c, deps);
    }).to.throw('SimpleComponentCreator cannot create ComponentDefinition');
  });

  it('should invoke callback with error if base value creation threw an error', function (done) {
    var n = 'myComponent',
      v = function () {
        throw new Error('accidental mistake');
      },
      c = new SimpleComponentDefinition(n, v),
      cc = new SimpleComponentCreator(c);

    cc.create(function (err) {
      expect(err.message).to.be.equal('accidental mistake');
      done();
    });
  });

  it('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
    var n = 'myComponent',
        v = 'This is my message',
        izr = sinon.spy(),
        c = new SimpleComponentDefinition(n, v, { initializer: izr }),
        cc = new SimpleComponentCreator(c);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal(v);
      expect(izr.calledOnce).to.be.true;
      done();
    });

  });

  it('should invoke callback with error if initializer threw an error', function (done) {
    var n = 'myComponent',
      v = function (deps) {
        return deps.fmt('This is my %s', deps.location);
      },
      deps = {
        fmt: fmt,
        location: 'home'
      },
      izr = function () {
        throw new Error('accidental mistake');
      },
      c = new SimpleComponentDefinition(n, v, { dependencies: ['fmt', 'location'], initializer: izr }),
      cc = new SimpleComponentCreator(c, deps);

    cc.create(function (err) {
      expect(err.message).to.be.equal('accidental mistake');
      done();
    });
  });

});