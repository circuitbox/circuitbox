/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    ComponentDefinition = require('../lib/componentDefinition'),
    ModuleComponentDefinition = require('../lib/moduleComponentDefinition');

describe('ModuleComponentDefinition', function () {
  /*jshint expr: false*/

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

  it('should return the module-id normalized to process.cwd()', function () {
    var originalCwd = process.cwd;

    process.cwd = sinon.stub().returns('/foo/bar');

    var c = new ModuleComponentDefinition('myComponent', './foo');

    expect(c.moduleId).to.be.equal('/foo/bar/foo');

    process.cwd = originalCwd;
  });

  it('should load the module ', function () {
    var originalCwd = process.cwd;

    process.cwd = sinon.stub().returns('/foo/bar');

    var c = new ModuleComponentDefinition('myComponent', './foo');

    expect(function () {
      c.load();
    }).to.throw('Cannot find module \'/foo/bar/foo\'');

    process.cwd = originalCwd;
  });

});