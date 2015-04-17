/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory');

describe('ComponentDefinitionBuilderFactory', function () {

  afterEach(function () {
    ComponentDefinitionBuilderFactory._reset();
  });

  it('should be able to register a builder and create a ComponentDefinitionBuilder', function () {
    var l = [],
        b;

    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

    b = new ComponentDefinitionBuilderFactory(l, 'myComponent').use('foo');

    expect(b).to.be.instanceof(SimpleComponentDefinitionBuilder);
    expect(b.name).to.be.equal('myComponent');
    expect(b.value).to.be.equal('foo');

    expect(l.length).to.be.equal(1);
    expect(l[0]).to.be.equal(b);

  });

  it('should throw error if a ComponentDefinitionBuilder has already been registered with the specified method', function () {

    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

    expect(function () {
      ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);
    }).to.throw('builder already registered for method use');

  });


});