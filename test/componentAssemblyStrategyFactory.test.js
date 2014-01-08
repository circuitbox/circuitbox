/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var expect = require('expect.js');

var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ModuleBasedComponentDefinition = require('../lib/moduleBasedComponentDefinition');

var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('../lib/moduleBasedComponentAssemblyStrategy');

var ComponentAssemblyStrategyFactory = require('../lib/componentAssemblyStrategyFactory');

describe('ComponentAssemblyStrategyFactory', function () {

  it('returns a SimpleComponentAssemblyStrategy for a SimpleComponentDefinition with no dependencies', function () {
    var definition = new SimpleComponentDefinition({
      name: 'myComponent',
      component: 'This is a component'
    });

    var strategy = ComponentAssemblyStrategyFactory.strategyFor(definition);

    expect(strategy).to.be.a(SimpleComponentAssemblyStrategy);
    expect(strategy.dependencies).to.be.empty();
  });

  it('returns a SimpleComponentAssemblyStrategy for a SimpleComponentDefinition with dependencies', function () {
    var dependencies = {
      name: 'Foo',
      message: 'Hello, World!'
    };

    var definition = new SimpleComponentDefinition({
      name: 'myComponent',
      component: 'This is a component',
      dependencies: _.keys(dependencies)
    });

    var strategy = ComponentAssemblyStrategyFactory.strategyFor(definition, dependencies);

    expect(strategy).to.be.a(SimpleComponentAssemblyStrategy);
    expect(strategy.dependencies).to.be(dependencies);
  });

  it('returns a ModuleBasedComponentAssemblyStrategy for a ModuleBasedComponentDefinition with no dependencies', function () {
    var definition = new ModuleBasedComponentDefinition({
      name: 'myComponent',
      moduleId: './myComponent'
    });

    var strategy = ComponentAssemblyStrategyFactory.strategyFor(definition);

    expect(strategy).to.be.a(ModuleBasedComponentAssemblyStrategy);
    expect(strategy.dependencies).to.be.empty();
  });

  it('returns a ModuleBasedComponentAssemblyStrategy for a ModuleBasedComponentDefinition with dependencies', function () {
    var dependencies = {
      name: 'Foo',
      message: 'Hello, World!'
    };

    var definition = new ModuleBasedComponentDefinition({
      name: 'myComponent',
      moduleId: './myComponent',
      dependencies: _.keys(dependencies)
    });

    var strategy = ComponentAssemblyStrategyFactory.strategyFor(definition, dependencies);

    expect(strategy).to.be.a(ModuleBasedComponentAssemblyStrategy);
    expect(strategy.dependencies).to.be(dependencies);
  });

});