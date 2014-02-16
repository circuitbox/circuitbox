/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponent = require('../lib/simpleComponent'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory');

describe('ComponentCreatorFactory', function () {
  /*jshint expr: true*/

  afterEach(function () {
    ComponentCreatorFactory._reset();
  });

  it('should register the specified ComponentCreator for the specified Component and returns it when requested', function () {
    var n = 'myComponent',
        base = 'This is a component',
        c = new SimpleComponent(n, base),
        cc;

    ComponentCreatorFactory.registerCreator(SimpleComponent, SimpleComponentCreator);

    cc = new ComponentCreatorFactory().creatorFor(c);

    expect(cc).to.be.instanceof(SimpleComponentCreator);
    expect(cc.dependencies).to.be.empty;
  });

});