/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    Component = require('../lib/component'),
    SimpleComponent = require('../lib/simpleComponent');

describe('SimpleComponent', function () {
  /*jshint expr: true*/

  it('should not be possible to create without a value', function () {

    expect(function () {
      /*jshint nonew: false*/

      new SimpleComponent('myComponent');
    }).to.throw('must specify component value');

  });

  it('should be a Component', function () {
    var c = new SimpleComponent('myComponent', 'foo');

    expect(c).to.be.instanceof(Component);

  });

  it('should have the specified value', function () {
    var v = {};
    var c = new SimpleComponent('myComponent', v);

    expect(c).to.be.instanceof(Component);
    expect(c.value).to.be.equal(v);
  });

  it('should able to specify a function as component value', function () {
    var v = function () {};
    var c = new SimpleComponent('myComponent', v);

    expect(c).to.be.instanceof(Component);
    expect(c.value).to.be.equal(v);

  });

  it('should able to specify null as a component value', function () {
    var v = null;
    var c = new SimpleComponent('myComponent', v);

    expect(c).to.be.instanceof(Component);
    expect(c.value).to.be.null;

  });

  it('should able to specify false as a component value', function () {
    var v = false;
    var c = new SimpleComponent('myComponent', v);

    expect(c).to.be.instanceof(Component);
    expect(c.value).to.be.false;

  });

  it('should able to specify scope, initializer and dependencies', function () {
    var o = {},
        i = function () {},
        d = ['a', 'b', 'c'],
        c = new SimpleComponent('myComponent', o, { scope: 'prototype', initializer: i, dependencies: d });

    expect(c.value).to.be.equal(o);

    expect(c.scope).to.be.equal('prototype');
    expect(c.initializer).to.be.equal(i);
    expect(c.dependencies).to.be.eql(d);

    expect(c.isSingleton()).to.be.false;
    expect(c.hasInitializer()).to.be.true;
    expect(c.hasDependencies()).to.be.true;
  });

});