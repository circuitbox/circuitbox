/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

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

  it('should assemble target component and return to specified handler', function (done) {
    var registryApi = {
      assemblyListFor: function () {}
    };

    var targetComponentName = 'myComponent';
    var componentValue = 'This is my message';

    var mockRegistry = sinon.mock(registryApi);

    mockRegistry.expects('assemblyListFor').withArgs('myComponent').returns([
      new SimpleComponentDefinition({
        name: targetComponentName,
        scope: Scopes.singleton,
        component: componentValue
      })
    ]).once();

    Assembler.for(new AssemblyContext('myComponent', {
      registry: registryApi
    })).assemble(function (err, value) {
      expect(err).to.be(null);
      expect(value).to.be(componentValue);
      done();
    });
  });

  it('should assemble target component and return a promise that will return the component value to completion handler', function (done) {
    var registryApi = {
      assemblyListFor: function () {}
    };

    var targetComponentName = 'myComponent';
    var componentValue = 'This is my message';

    var mockRegistry = sinon.mock(registryApi);

    mockRegistry.expects('assemblyListFor').withArgs('myComponent').returns([
      new SimpleComponentDefinition({
        name: targetComponentName,
        scope: Scopes.singleton,
        component: componentValue
      })
    ]).once();

    Assembler.for(new AssemblyContext('myComponent', {
      registry: registryApi
    })).assemble()
      .done(function (value) {
        expect(value).to.be(componentValue);
        done();
      }, function (err) {
          console.log(err);
        });
  });

});