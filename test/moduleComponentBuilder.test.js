/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    ModuleComponent = require('../lib/moduleComponent'),
    ComponentBuilder = require('../lib/componentBuilder'),
    ModuleComponentBuilder = require('../lib/moduleComponentBuilder');

describe('ModuleComponentBuilder', function () {

  it('inherits ComponentBuilder', function () {
    expect(ModuleComponentBuilder.super_).to.be.equal(ComponentBuilder);
  });

  it('should create a ModuleComponent with the specified name, module-id, scope, initializer and dependencies', function () {
    var originalCwd = process.cwd,
        i = function () {},
        deps = ['a', 'b'],
        mid = './foo';

    process.cwd = sinon.stub().returns('/foo/bar');

    var d = new ModuleComponentBuilder('myComponent', mid)
        .scopedAs('prototype')
        .initializeWith(i)
        .dependsOn(deps)
        .build();

    expect(d).to.be.instanceof(ModuleComponent);
    expect(d.name).to.be.equal('myComponent');
    expect(d.scope).to.be.equal('prototype');
    expect(d.initializer).to.be.equal(i);
    expect(d.dependencies).to.be.eql(deps);
    expect(d.moduleId).to.be.equal('/foo/bar/foo');

    process.cwd = originalCwd;
  });

});