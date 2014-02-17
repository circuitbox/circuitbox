/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    fmt = require('util').format,
    ComponentDefinition = require('../lib/componentDefinition'),
    ModuleComponentDefinition = require('../lib/moduleComponentDefinition'),
    ComponentCreator = require('../lib/componentCreator'),
    ModuleComponentCreator = require('../lib/moduleComponentCreator');

describe('ModuleComponentCreator', function () {
  /*jshint expr: true*/

  it('should inherit ComponentCreator', function () {
    expect(ModuleComponentCreator.super_).to.be.equal(ComponentCreator);
  });

  it('should assemble non-function component and pass to specified callback', function (done) {
    var n = 'myComponent',
        c = new ModuleComponentDefinition(n, './test/fixtures/stringComponent'),
        cc = new ModuleComponentCreator(c);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal('The quick brown fox jumped over the lazy dog.');
      done();
    });
  });

  it('should throw error if created with a ComponentDefinition other than ModuleComponentDefinition', function () {
    var n = 'myComponent',
      deps = {
        fmt: fmt,
        location: 'home'
      },
      c = new ComponentDefinition(n, { dependencies: ['fmt', 'location'] });

    expect(function () {
      /*jshint nonew: false*/
      new ModuleComponentCreator(c, deps);
    }).to.throw('ModuleComponentCreator cannot create ComponentDefinition');
  });

  it('should assemble function component by invoking it with dependencies and pass its return value to specified callback as component', function (done) {
    var n = 'myComponent',
      deps = {
        fmt: fmt,
        name: 'Homer Simpson'
      },
      c = new ModuleComponentDefinition(n, './test/fixtures/helloMessageComposer', { dependencies: ['fmt', 'name'] }),
      cc = new ModuleComponentCreator(c, deps);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r.getMessage()).to.be.equal('Hello world! This is Homer Simpson');
      done();
    });
  });

  it('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
    var n = 'myComponent',
      c = new ModuleComponentDefinition(n, './test/fixtures/objectComponent', {
        initializer: function () {
          return this.firstName + ' ' + this.lastName;
        }
      }),
      cc = new ModuleComponentCreator(c);

    cc.create(function (err, r) {
      expect(err).to.be.null;
      expect(r).to.be.equal('John Doe');
      done();
    });

  });

  it('should invoke callback with error if base value creation threw an error', function (done) {
    var n = 'myComponent',
        c = new ModuleComponentDefinition(n, './test/fixtures/errorThrower'),
        cc = new ModuleComponentCreator(c);

    cc.create(function (err) {
      expect(err.message).to.be.equal('accidental mistake');
      done();
    });
  });

  it('should invoke callback with error if initializer threw an error', function (done) {
    var n = 'myComponent',
        izr = function () {
          throw new Error('accidental mistake');
        },
        c = new ModuleComponentDefinition(n, './test/fixtures/stringComponent', { initializer: izr }),
        cc = new ModuleComponentCreator(c);

    cc.create(function (err) {
      expect(err.message).to.be.equal('accidental mistake');
      done();
    });
  });

});