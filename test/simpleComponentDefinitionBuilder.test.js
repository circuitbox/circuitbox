/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    ComponentDefinitionBuilder = require('../lib/componentDefinitionBuilder'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder');

describe('SimpleComponentDefinitionBuilder', function () {

  it('inherits ComponentDefinitionBuilder', function () {
    expect(SimpleComponentDefinitionBuilder.super_).to.be.equal(ComponentDefinitionBuilder);
  });

  it('should create a SimpleComponentDefinition with the specified name, object, scope, initializer and dependencies', function () {
    var i = function () {},
        deps = ['a', 'b'],
        v = 'This is the object';

    var d = new SimpleComponentDefinitionBuilder('myComponent', v)
        .scopedAs('prototype')
        .initializeWith(i)
        .dependsOn(deps)
        .build();

    expect(d).to.be.instanceof(SimpleComponentDefinition);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);
    expect(d.value).to.be.equal(v);
  });

});