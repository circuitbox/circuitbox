/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    circuitbox = require('../lib'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory'),
    ScopeHandlerFactory = require('../lib/scopeHandlerFactory');

describe('circuitbox', function () {
  /*jshint expr: true*/

  afterEach(function () {
    _.each([
      ComponentDefinitionBuilderFactory,
      ComponentCreatorFactory,
      ScopeHandlerFactory
    ], function (f) {
      f._reset();
    });
  });

  it('should export ComponentDefinition', function () {
    expect(circuitbox.ComponentDefinition).to.be.equal(require('../lib/componentDefinition'));
  });

  it('should export SimpleComponentDefinition', function () {
    expect(circuitbox.SimpleComponentDefinition).to.be.equal(require('../lib/simpleComponentDefinition'));
  });

  it('should export ModuleComponentDefinition', function () {
    expect(circuitbox.ModuleComponentDefinition).to.be.equal(require('../lib/moduleComponentDefinition'));
  });

  it('should export ComponentDefinitionBuilder', function () {
    expect(circuitbox.ComponentDefinitionBuilder).to.be.equal(require('../lib/componentDefinitionBuilder'));
  });

  it('should export SimpleComponentDefinitionBuilder', function () {
    expect(circuitbox.SimpleComponentDefinitionBuilder).to.be.equal(require('../lib/simpleComponentDefinitionBuilder'));
  });

  it('should export ModuleComponentDefinitionBuilder', function () {
    expect(circuitbox.ModuleComponentDefinitionBuilder).to.be.equal(require('../lib/moduleComponentDefinitionBuilder'));
  });

  it('should export ComponentCreator', function () {
    expect(circuitbox.ComponentCreator).to.be.equal(require('../lib/componentCreator'));
  });

  it('should export SimpleComponentCreator', function () {
    expect(circuitbox.SimpleComponentCreator).to.be.equal(require('../lib/simpleComponentCreator'));
  });

  it('should export ModuleComponentCreator', function () {
    expect(circuitbox.ModuleComponentCreator).to.be.equal(require('../lib/moduleComponentCreator'));
  });

  it('should be able to create a new Circuitbox with only default any bindings', function (done) {
    circuitbox.create('myKernel', function (err, k) {
      expect(err).to.be.null;
      expect(k.name).to.be.equal('myKernel');
      done();
    });
  });

  it('should be able to create a new Circuitbox with specified bindings', function (done) {
    var modA = sinon.spy(),
        modB = sinon.spy();

    circuitbox.withBindings(modA, modB).create('myKernel', function (err, k) {
      expect(err).to.be.null;
      expect(k.name).to.be.equal('myKernel');

      expect(modA.calledOnce).to.be.true;
      expect(modB.calledOnce).to.be.true;

      done();
    });
  });

});