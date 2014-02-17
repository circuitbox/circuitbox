/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    ComponentDefinition = require('../lib/componentDefinition'),
    ComponentDefinitionBuilder = require('../lib/componentDefinitionBuilder');

describe('ComponentDefinitionBuilder', function () {

  it('should create a ComponentDefinition with the specified name, initializer and dependencies', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentDefinitionBuilder('myComponent')
        .initializeWith(i)
        .dependsOn(deps)
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(ComponentDefinition);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

  it('should create a ComponentDefinition with the specified name, initializer and dependencies specified as a CSV string', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentDefinitionBuilder('myComponent')
        .initializeWith(i)
        .dependsOn('a,b')
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(ComponentDefinition);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

  it('should create a ComponentDefinition with the specified name, initializer and dependencies specified in arguments', function () {
    var i = function () {},
        deps = ['a', 'b'];

    var d = new ComponentDefinitionBuilder('myComponent')
        .initializeWith(i)
        .dependsOn('a', 'b')
        .scopedAs('prototype')
        .build();

    expect(d).to.be.instanceof(ComponentDefinition);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);

  });

});