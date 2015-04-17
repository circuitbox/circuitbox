/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    path = require('path'),
    fmt = require('util').format,
    ComponentDefinition = require('../lib/componentDefinition'),
    ModuleComponentDefinition = require('../lib/moduleComponentDefinition');

describe('ModuleComponentDefinition', function () {
  /*jshint expr: false*/

  beforeEach(function () {
    global.__cbx = {
      _basePath: __dirname
    };
  });

  afterEach(function () {
    global.__cbx = undefined;
  });

  it('should not be possible to create without a module-id', function () {

    expect(function () {
      /*jshint nonew: false*/

      new ModuleComponentDefinition('myComponent');
    }).to.throw('must specify a valid module-id');

  });

  it('should be a ComponentDefinition', function () {
    var c = new ModuleComponentDefinition('myComponent', 'foo');

    expect(c).to.be.instanceof(ComponentDefinition);

  });

  it('should return the module-id normalized to global base path', function () {
    expect(new ModuleComponentDefinition('myComponent', './foo').moduleId).to.be.equal(path.join(__dirname, './foo'));
  });

  it('should load the module ', function () {
    var c = new ModuleComponentDefinition('myComponent', './foo'),
        ep = path.join(__dirname, './foo');

    expect(function () {
      c.load();
    }).to.throw(fmt('Cannot find module \'%s\'', ep));
  });

});