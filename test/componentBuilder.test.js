/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    Component = require('../lib/component'),
    ComponentBuilder = require('../lib/componentBuilder');

describe('ComponentBuilder', function () {

  it('should create a Component with the specified name, initializer and dependencies', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentBuilder('myComponent')
        .initializeWith(i)
        .dependsOn(deps)
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(Component);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

  it('should create a Component with the specified name, initializer and dependencies specified as a CSV string', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentBuilder('myComponent')
        .initializeWith(i)
        .dependsOn('a,b')
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(Component);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

  it('should create a Component with the specified name, initializer and dependencies specified in arguments', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentBuilder('myComponent')
        .initializeWith(i)
        .dependsOn('a', 'b')
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(Component);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

});