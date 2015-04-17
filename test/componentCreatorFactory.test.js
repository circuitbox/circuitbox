/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory');

describe('ComponentCreatorFactory', function () {
  /*jshint expr: true*/

  afterEach(function () {
    ComponentCreatorFactory._reset();
  });

  it('should register the specified ComponentCreator for the specified ComponentDefinition and returns it when requested', function () {
    var n = 'myComponent',
        base = 'This is a component',
        c = new SimpleComponentDefinition(n, base),
        cc;

    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);

    cc = new ComponentCreatorFactory().creatorFor(c);

    expect(cc).to.be.instanceof(SimpleComponentCreator);
    expect(cc.dependencies).to.be.empty;
  });

  it('should register the specified ComponentCreator for the specified ComponentDefinition and dependencies and returns it when requested', function () {
    var n = 'myComponent',
        base = 'This is a component',
        deps = ['foo', {name: 'bar'}],
        c = new SimpleComponentDefinition(n, base),
        cc;

    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);

    cc = new ComponentCreatorFactory().creatorFor(c, deps);

    expect(cc).to.be.instanceof(SimpleComponentCreator);
    expect(cc.dependencies).to.be.eql(deps);
  });

  it('should throw error when there is no ComponentCreator registered for the specified registered ComponentDefinition type', function () {
    var n = 'myComponent',
        base = 'This is a component',
        c = new SimpleComponentDefinition(n, base);

    expect(function () {
      /*jshint nonew: true*/

      new ComponentCreatorFactory().creatorFor(c);
    }).to.throw('no registered ComponentCreator for component type SimpleComponentDefinition');
  });

});