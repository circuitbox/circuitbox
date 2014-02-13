/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    Component = require('../lib/component');

describe('Component', function () {
  /*jshint expr: true */

  it('should not be able to create a component without a name', function () {
    expect(function () {
      /*jshint nonew: false*/

      new Component();
    }).to.throw('must specify component name');
  });

  it('should return the specified component name', function () {
    var n = 'myComponent',
        c = new Component(n);

    expect(c.name).to.be.equal(n);
  });

  it('should be created with a singleton scope by default if no scope is specified', function () {
    var c = new Component('myComponent');

    expect(c.scope).to.be.equal('singleton');
    expect(c.isSingleton()).to.be.true;

  });

  it('should be created with a specified prototype scope', function () {
    var c = new Component('myComponent', {scope: 'prototype'});

    expect(c.scope).to.be.equal('prototype');
    expect(c.isSingleton()).to.be.false;

  });

  it('should be created with a specified singleton scope', function () {
    var c = new Component('myComponent', {scope: 'singleton'});

    expect(c.scope).to.be.equal('singleton');
    expect(c.isSingleton()).to.be.true;

  });

  it('should not have any dependencies by default if no dependencies is specified', function () {
    var c = new Component('myComponent');

    expect(c.dependencies).to.be.empty;
    expect(c.hasDependencies()).to.be.false;

  });

  it('should have the specified dependencies', function () {
    var c = new Component('myComponent', {dependencies: ['a', 'b']});

    expect(c.dependencies).to.be.eql(['a', 'b']);
    expect(c.hasDependencies()).to.be.true;

  });

  it('should not have any initializer by default if no initializer is specified', function () {
    var c = new Component('myComponent');

    expect(c.initializer).to.be.undefined;
    expect(c.hasInitializer()).to.be.false;

  });

  it('should have the specified initializer function', function () {
    var i = function () {},
        c = new Component('myComponent', {initializer: i});

    expect(c.initializer).to.be.a('function');
    expect(c.initializer).to.be.equal(i);
    expect(c.hasInitializer()).to.be.true;

  });

  it('should have the specified initializer function name', function () {
    var i = 'initMe',
        c = new Component('myComponent', {initializer: i});

    expect(c.initializer).to.be.a('string');
    expect(c.initializer).to.be.equal(i);
    expect(c.hasInitializer()).to.be.true;

  });

  it('should throw error if specified initializer is not a function or string', function () {
    /*jshint nonew: false*/

    expect(function () {
      new Component('myComponent', {initializer: {}});
    }).to.throw('Initializer for \'myComponent\' must be a function or string');

  });

});