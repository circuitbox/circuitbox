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

  it('should be able to register a builder', function () {
    ComponentBuilderFactory.registerBulder('use', SimpleComponentBuilder);

    var b = ComponentBuilderFactory.use('foo');
  });
});