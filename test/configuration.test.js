/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint nonew: false*/

'use strict';

var context = describe;
var expect = require('expect.js');
var sinon = require('sinon');

var Configuration = require('../lib/configuration');
var ComponentDefinitionError = require('../lib/componentDefinitionError');

describe('Configuration', function () {
  var kernelViewApi;
  var mockKernelView;

  beforeEach(function () {
    kernelViewApi = {
      setName: function () {},
      registerModule: function () {}
    };

    mockKernelView = sinon.mock(kernelViewApi);
  });

  afterEach(function () {
    mockKernelView.verify();
  });

  context('when created with a kernel-view and options', function () {

    it('should set the name of the kernel if provided in options', function () {
      mockKernelView.expects('setName').withArgs('myKernel').once();

      new Configuration(kernelViewApi, {name: 'myKernel'});
    });

    it('should register all modules specified providing them an instance of the kernel\'s registry', function () {
      var mockRegistryView = { for: function () {} };

      var moduleASpy = sinon.spy();
      var moduleBSpy = sinon.spy();

      mockKernelView.expects('registerModule').withArgs(moduleASpy).callsArgWith(0, mockRegistryView).once();
      mockKernelView.expects('registerModule').withArgs(moduleBSpy).callsArgWith(0, mockRegistryView).once();

      new Configuration(kernelViewApi, {modules: [
        moduleASpy,
        moduleBSpy
      ]});

      expect(moduleASpy.withArgs(mockRegistryView).calledOnce).to.be(true);
      expect(moduleBSpy.withArgs(mockRegistryView).calledOnce).to.be(true);
    });

    it('should throw error if one of the modules specified is not a function', function () {
      var moduleASpy = sinon.spy();

      expect(function () {
        new Configuration(kernelViewApi, {modules: [
          moduleASpy,
          {}
        ]});
      }).to.throwError(function (e) {
        console.log(e.message);
        expect(e).to.be.a(ComponentDefinitionError);
        expect(e.message).to.match(/Cannot initialize module which is not a function or module-id$/);
      });

    });

    it('should register modules specified as a mix of module-id strings and functions providing them an instance of the kernel\'s registry', function () {
      var mockRegistryView = { for: function () {} };

      var aModuleSpy = require('./fixtures/aModule');
      var moduleBSpy = sinon.spy();

      mockKernelView.expects('registerModule').withArgs(aModuleSpy).callsArgWith(0, mockRegistryView).once();
      mockKernelView.expects('registerModule').withArgs(moduleBSpy).callsArgWith(0, mockRegistryView).once();

      new Configuration(kernelViewApi, {modules: [
        './test/fixtures/aModule',
        moduleBSpy
      ]});

      expect(aModuleSpy.withArgs(mockRegistryView).calledOnce).to.be(true);
      expect(moduleBSpy.withArgs(mockRegistryView).calledOnce).to.be(true);
    });

  });

});