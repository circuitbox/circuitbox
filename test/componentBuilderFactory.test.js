/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponentBuilder = require('../lib/simpleComponentBuilder'),
    ComponentBuilderFactory = require('../lib/componentBuilderFactory');

describe('ComponentBuilderFactory', function () {

  afterEach(function () {
    ComponentBuilderFactory._reset();
  });

  it('should be able to register a builder and create a ComponentDefinitionBuilder', function () {
    var l = [],
        b;

    ComponentBuilderFactory.registerBuilder('use', SimpleComponentBuilder);

    b = new ComponentBuilderFactory(l, 'myComponent').use('foo');

    expect(b).to.be.instanceof(SimpleComponentBuilder);
    expect(b.name).to.be.equal('myComponent');
    expect(b.value).to.be.equal('foo');

    expect(l.length).to.be.equal(1);
    expect(l[0]).to.be.equal(b);

  });

  it('should throw error if a ComponentBuilder has already been registered with the specified method', function () {

    ComponentBuilderFactory.registerBuilder('use', SimpleComponentBuilder);

    expect(function () {
      ComponentBuilderFactory.registerBuilder('use', SimpleComponentBuilder);
    }).to.throw('builder already registered for method use');

  });


});