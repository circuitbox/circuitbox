/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    ModuleComponentDefinition = require('../lib/moduleComponentDefinition'),
    ComponentDefinitionBuilder = require('../lib/componentDefinitionBuilder'),
    ModuleComponentDefinitionBuilder = require('../lib/moduleComponentDefinitionBuilder');

describe('ModuleComponentDefinitionBuilder', function () {

  beforeEach(function () {
    global.__cbx = {
      _basePath: __dirname
    };
  });

  afterEach(function () {
    global.__cbx = undefined;
  });

  it('inherits ComponentDefinitionBuilder', function () {
    expect(ModuleComponentDefinitionBuilder.super_).to.be.equal(ComponentDefinitionBuilder);
  });

  it('should create a ModuleComponentDefinition with the specified name, module-id, scope, initializer and dependencies', function () {
    var originalCwd = process.cwd,
        i = function () {},
        deps = ['a', 'b'],
        mid = './foo';

    process.cwd = sinon.stub().returns('/foo/bar');

    var d = new ModuleComponentDefinitionBuilder('myComponent', mid)
        .scopedAs('prototype')
        .initializeWith(i)
        .dependsOn(deps)
        .build();

    expect(d).to.be.instanceof(ModuleComponentDefinition);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);
    expect(d.moduleId).to.be.equal(__dirname + '/foo');

    process.cwd = originalCwd;
  });

});