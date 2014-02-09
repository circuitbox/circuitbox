/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var expect = require('expect.js');

var utils = require('../lib/utils');

var ComponentDefinition = require('../lib/componentDefinition');
var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ModuleBasedComponentDefinition = require('../lib/moduleBasedComponentDefinition');

var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('../lib/moduleBasedComponentAssemblyStrategy');

var ComponentAssemblyStrategyFactory = require('../lib/componentAssemblyStrategyFactory');

function TestComponentDefinition() {
  var self = this;
  var options = arguments[0] || {};

  ComponentDefinition.call(self, options);

  self.getComponent = function getComponent() {
    return options.component;
  };
}

utils.inherits(TestComponentDefinition, ComponentDefinition);

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

  it('should register the specified ComponentAssemblyStrategy for the specified ComponentDefinition and return a new component', function () {
    var dependencies = {
      name: 'Foo',
      message: 'Hello, World!'
    };

    ComponentAssemblyStrategyFactory.registerAssemblyStrategy(TestComponentDefinition, SimpleComponentAssemblyStrategy);

    var definition = new TestComponentDefinition({
      name: 'myComponent',
      component: 'This is a component',
      dependencies: _.keys(dependencies)
    });

    var strategy = ComponentAssemblyStrategyFactory.strategyFor(definition, dependencies);

    expect(strategy).to.be.a(SimpleComponentAssemblyStrategy);
    expect(strategy.dependencies).to.be(dependencies);
  });

  it('should throw error if attempting to register a specified ComponentAssemblyStrategy for a non-ComponentDefinition', function () {
    var nonComponentDefinition = function Foo() {
    };

    expect(function () {
      ComponentAssemblyStrategyFactory.registerAssemblyStrategy(nonComponentDefinition, SimpleComponentAssemblyStrategy);
    }).to.throwError(function (e) {
      expect(e.message).to.be('Cannot register assembly strategy for a non-ComponentDefinition');
    });
  });

  it('should throw error if attempting to register a non-ComponentAssemblyStrategy for a specified ComponentDefinition', function () {
    var nonAssemblyStrategy = function Foo() {
    };

    expect(function () {
      ComponentAssemblyStrategyFactory.registerAssemblyStrategy(TestComponentDefinition, nonAssemblyStrategy);
    }).to.throwError(function (e) {
      expect(e.message).to.be('Cannot register a non-ComponentAssemblyStrategy');
    });
  });

});