/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint expr: true */

'use strict';

var expect = require('expect.js');
var sinon = require('sinon');

var utils = require('../lib/utils');

var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ComponentAssemblyStrategy = require('../lib/componentAssemblyStrategy');
var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');

describe('SimpleComponentAssemblyStrategy', function () {

  it('should be a ComponentAssemblyStrategy', function () {
    expect(SimpleComponentAssemblyStrategy.super_).to.be(ComponentAssemblyStrategy);
  });

  it('should assemble non-function component and pass to specified callback', function (done) {
    var targetComponentName = 'myComponent';
    var component = 'This is my message';

    var def = new SimpleComponentDefinition({
      name: targetComponentName,
      component: component
    });

    var strategy = new SimpleComponentAssemblyStrategy(def);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value).to.be(component);
      done();
    });
  });

  it('should assemble function component by invoking it with dependencies and pass its return value to specified callback as component', function (done) {
    var targetComponentName = 'myComponent';
    var component = function (deps) {
      return deps.utils.sprintf('This is my %s', deps.location);
    };
    var dependencies = {
      utils: utils,
      location: 'home'
    };

    var def = new SimpleComponentDefinition({
      name: targetComponentName,
      component: component,
      dependencies: ['utils', 'location']
    });

    var strategy = new SimpleComponentAssemblyStrategy(def, dependencies);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value).to.be('This is my home');
      done();
    });
  });

  it('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
    var targetComponentName = 'myComponent';
    var component = 'This is my message';

    var initializerSpy = sinon.spy();

    var def = new SimpleComponentDefinition({
      name: targetComponentName,
      component: component,
      initializer: initializerSpy
    });

    var strategy = new SimpleComponentAssemblyStrategy(def);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value).to.be(component);
      expect(initializerSpy.calledOnce).to.be(true);
      done();
    });

  });

});