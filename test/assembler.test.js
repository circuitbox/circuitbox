/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('expect.js');
var utils = require('../lib/utils');
var sinon = require('sinon');

var Scopes = require('../lib/scopes');
var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ComponentCreationError = require('../lib/componentCreationError');

var AssemblyContext = require('../lib/assemblyContext');
var Assembler = require('../lib/assembler');

describe('Assembler', function () {
  var registryApi,
      mockRegistry;

  beforeEach(function () {
    registryApi = {
      assemblyListFor: function () {}
    };

    mockRegistry = sinon.mock(registryApi);
  });

  afterEach(function () {
    mockRegistry.verify();
  });

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

  it('should assemble target component and return to specified callback', function (done) {
    var targetComponentName = 'myComponent';
    var componentValue = 'This is my message';

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

  it('should assemble target component with dependencies and return to specified callback', function (done) {
    var targetComponentName = 'message';
    var location = 'Bangalore';
    var message = 'This is my %s';

    var locationComponentDefinition = new SimpleComponentDefinition({
      name: 'location',
      scope: Scopes.singleton,
      component: location
    });

    var messageComponentDefinition = new SimpleComponentDefinition({
      name: targetComponentName,
      scope: Scopes.singleton,
      dependencies: ['location'],
      component: function (deps) {
        return utils.sprintf(message, deps.location);
      }
    });

    mockRegistry.expects('assemblyListFor').withArgs('message').returns([
      locationComponentDefinition,
      messageComponentDefinition
    ]).once();

    mockRegistry.expects('assemblyListFor').withArgs('location').returns([
      locationComponentDefinition
    ]).once();

    Assembler.for(new AssemblyContext('message', {
      registry: registryApi
    })).assemble(function (err, value) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      expect(value).to.be('This is my Bangalore');
      done();
    });
  });

  it('should assemble target component with multi-level dependencies and return to specified callback', function (done) {
    var targetComponentName = 'printer';

    var citiesComponentDefinition = new SimpleComponentDefinition({
      name: 'cities',
      scope: Scopes.singleton,
      component: ['Mumbai', 'Bangalore']
    });

    var locationComponentDefinition = new SimpleComponentDefinition({
      name: 'location',
      scope: Scopes.singleton,
      dependencies: ['cities'],
      component: function (deps) {
        return deps.cities[0];
      }
    });

    var utilsComponentDefinition = new SimpleComponentDefinition({
      name: 'utils',
      scope: Scopes.singleton,
      component: utils
    });

    var languagesComponentDefinition = new SimpleComponentDefinition({
      name: 'languages',
      scope: Scopes.singleton,
      component: {
        'Mumbai': 'Marathi',
        'Bangalore': 'Kannada'
      }
    });

    var messageComponentDefinition = new SimpleComponentDefinition({
      name: 'message',
      scope: Scopes.singleton,
      dependencies: ['languages', 'utils', 'location'],
      component: function (deps) {
        var location = deps.location;
        var language = deps.languages[location];
        return deps.utils.sprintf('This is my %s. We speak %s here.', location, language);
      }
    });

    var printerComponentDefinition = new SimpleComponentDefinition({
      name: targetComponentName,
      scope: Scopes.singleton,
      dependencies: ['message', 'utils', 'cities'],
      component: function (deps) {
        return deps.utils.sprintf('%s You may also want to travel to %s', deps.message, deps.cities[1]);
      }
    });

    mockRegistry.expects('assemblyListFor').withArgs(targetComponentName).returns([
      messageComponentDefinition,
      utilsComponentDefinition,
      citiesComponentDefinition,
      printerComponentDefinition
    ]).once();

    mockRegistry.expects('assemblyListFor').withArgs('message').returns([
      utilsComponentDefinition,
      languagesComponentDefinition,
      locationComponentDefinition,
      messageComponentDefinition
    ]).once();

    mockRegistry.expects('assemblyListFor').withArgs('location').returns([
      citiesComponentDefinition,
      locationComponentDefinition
    ]).once();

    mockRegistry.expects('assemblyListFor').withArgs('utils').returns([
      utilsComponentDefinition
    ]).exactly(2);

    mockRegistry.expects('assemblyListFor').withArgs('cities').returns([
      citiesComponentDefinition
    ]).exactly(2);

    mockRegistry.expects('assemblyListFor').withArgs('languages').returns([
      languagesComponentDefinition
    ]).once();

    Assembler.for(new AssemblyContext(targetComponentName, {
      registry: registryApi
    })).assemble(function (err, value) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      expect(value).to.be('This is my Mumbai. We speak Marathi here. You may also want to travel to Bangalore');
      done();
    });

  });

  it('should assemble target component and return a promise that will return the component value to completion handler', function (done) {
    var targetComponentName = 'myComponent';
    var componentValue = 'This is my message';

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
    });
  });

});