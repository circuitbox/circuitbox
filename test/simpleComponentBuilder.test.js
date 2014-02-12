/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponent = require('../lib/simpleComponent'),
    ComponentBuilder = require('../lib/componentBuilder'),
    SimpleComponentBuilder = require('../lib/simpleComponentBuilder');

describe('SimpleComponentBuilder', function () {

  it('inherits ComponentBuilder', function () {
    expect(SimpleComponentBuilder.super_).to.be.equal(ComponentBuilder);
  });

  it('should create a SimpleComponent with the specified name, object, scope, initializer and dependencies', function () {
    var i = function () {},
        deps = ['a', 'b'],
        v = 'This is the object';

    var d = new SimpleComponentBuilder('myComponent', v)
        .scopedAs('prototype')
        .initializeWith(i)
        .dependsOn(deps)
        .build();

    expect(d).to.be.instanceof(SimpleComponent);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);
    expect(d.value).to.be.equal(v);
  });

});