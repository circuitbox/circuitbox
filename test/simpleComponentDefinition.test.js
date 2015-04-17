/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    ComponentDefinition = require('../lib/componentDefinition'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition');

describe('SimpleComponentDefinition', function () {
  /*jshint expr: true*/

  it('should not be possible to create without a value', function () {

    expect(function () {
      /*jshint nonew: false*/

      new SimpleComponentDefinition('myComponent');
    }).to.throw('must specify component value');

  });

  it('should be a ComponentDefinition', function () {
    var c = new SimpleComponentDefinition('myComponent', 'foo');

    expect(c).to.be.instanceof(ComponentDefinition);

  });

  it('should have the specified value', function () {
    var v = {};
    var c = new SimpleComponentDefinition('myComponent', v);

    expect(c).to.be.instanceof(ComponentDefinition);
    expect(c.value).to.be.equal(v);
  });

  it('should able to specify a function as component value', function () {
    var v = function () {};
    var c = new SimpleComponentDefinition('myComponent', v);

    expect(c).to.be.instanceof(ComponentDefinition);
    expect(c.value).to.be.equal(v);

  });

  it('should able to specify null as a component value', function () {
    var v = null;
    var c = new SimpleComponentDefinition('myComponent', v);

    expect(c).to.be.instanceof(ComponentDefinition);
    expect(c.value).to.be.null;

  });

  it('should able to specify false as a component value', function () {
    var v = false;
    var c = new SimpleComponentDefinition('myComponent', v);

    expect(c).to.be.instanceof(ComponentDefinition);
    expect(c.value).to.be.false;

  });

  it('should able to specify scope, initializer and dependencies', function () {
    var o = {},
        i = function () {},
        d = ['a', 'b', 'c'],
        c = new SimpleComponentDefinition('myComponent', o, { scope: 'prototype', initializer: i, dependencies: d });

    expect(c.value).to.be.equal(o);

    expect(c.scope).to.be.equal('prototype');
    expect(c.initializer).to.be.equal(i);
    expect(c.dependencies).to.be.eql(d);

    expect(c.isSingleton()).to.be.false;
    expect(c.hasInitializer()).to.be.true;
    expect(c.hasDependencies()).to.be.true;
  });

});