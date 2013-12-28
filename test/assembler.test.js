/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');
var sinon = require('sinon');

var Scopes = require('../lib/scopes');
var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ComponentCreationError = require('../lib/componentCreationError');

var AssemblyContext = require('../lib/assemblyContext');
var Assembler = require('../lib/assembler');

describe('Assembler', function () {

  it('should create a new Assembler for the specified AssemblyContext', function () {
    var assembler = Assembler.for(new AssemblyContext('myComponent', {}));
    expect(assembler).to.be.an(Assembler);
  });

  it('should throw error if Assembler is created without an AssemblyContext', function () {
    expect(function () {
      Assembler.for({});
    }).to.throwError(function (e) {
          expect(e).to.be.a(ComponentCreationError);
          expect(e.message).to.match(/Cannot assemble component without a valid assembly context/);
        });
  });

  context.skip('when created', function () {

    it('should assemble target component and return a deferred object that passes the component value to completion handler', function () {
      var registryApi = {
        getAssemblyListFor: function () {}
      };

      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var mockRegistry = sinon.mock(registryApi);

      mockRegistry.expects('getAssemblyListFor').withArgs('myComponent').returns([
        new SimpleComponentDefinition({
          name: targetComponentName,
          scope: Scopes.singleton,
          object: componentValue
        })
      ]).once();

      var assemblyDoneSpy = sinon.spy();
      var assemblyFailedSpy = sinon.spy();

      Assembler.for(new AssemblyContext('myComponent', {
        registry: mockRegistry
      })).assemble()
        .done(assemblyDoneSpy)
        .fail(assemblyFailedSpy);

      expect(assemblyDoneSpy.withArgs(componentValue).calledOnce).to.be(true);
      expect(assemblyFailedSpy.calledOnce).to.be(false);
    });

  });

});