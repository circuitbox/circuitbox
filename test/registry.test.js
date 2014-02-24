/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe,
    expect = require('chai').expect,
    sinon = require('sinon'),
    Registry = require('../lib/registry'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder');

describe('Registry', function () {
  /*jshint expr: true*/

  it('should call the module passing a registry to register components', function () {
    var r = new Registry(),
        m = sinon.spy();

    r.registerModule(m);

    expect(m.calledOnce).to.be.true;
    expect(m.getCall(0).args[0].for).to.be.a('function');
  });

  it('should load and call the module passing a registry to register components if module specified as module-id', function () {
    var r = new Registry(),
        aModule = require('./fixtures/aModule');

    r.registerModule('./test/fixtures/aModule');

    expect(aModule.calledOnce).to.be.true;
    expect(aModule.getCall(0).args[0].for).to.be.a('function');
  });

  it('should throw error if an attempt is made to register a module specified as a non-function or non-string', function () {
    var r = new Registry();

    expect(function () {
      r.registerModule(5387);
    }).to.throw('a module must be a function or a module-id string');
  });

  it('should register specified module and build component definitions', function () {
    var r = new Registry();

    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

    expect(r.registerModule(function (config) {
      config.for('myComponent').use('This is a value');
    })).to.be.true;

    expect(r.hasComponents()).to.be.true;
    expect(r.find('myComponent')).to.be.an.instanceof(SimpleComponentDefinition);

    ComponentDefinitionBuilderFactory._reset();
  });

  it('should register specified module and get assembly list for a specified component', function () {
    var r, dl;

    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

    r = new Registry();

    expect(r.registerModule(function (config) {
      config.for('underpants').use('Boxer shorts');
      config.for('socks').use('These are cotton socks');
      config.for('trousers').use('Reid & Taylor Trousers').dependsOn(['underpants']);
      config.for('shoes').use('Hush Puppies').dependsOn(['trousers', 'socks']);
    })).to.be.true;

    dl = r.dependencyListFor('shoes');

    expect(dl.length).to.be.equal(4);
    expect(dl[0]).to.be.equal('socks');
    expect(dl[1]).to.be.equal('underpants');
    expect(dl[2]).to.be.equal('trousers');
    expect(dl[3]).to.be.equal('shoes');

    ComponentDefinitionBuilderFactory._reset();
  });

  it('should throw error if module attempts to register a component without a name', function () {

    expect(function () {
      new Registry().registerModule(function (r) {
        r.for();
      });
    }).to.throw('A valid component name must be specified');

  });

  it('should throw error if module attempts to register a component with the same name as another component', function () {
    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

    expect(function () {
      new Registry().registerModule(function (r) {
        r.for('myComponent').use('This is a value');
        r.for('myComponent').use('This is another value');
      });
    }).to.throw('Another component with the name "myComponent" has already been registered');

    ComponentDefinitionBuilderFactory._reset();
  });

  it('should provide a ComponentDefinitionBuilderFactory to describe component definition', function () {
    new Registry().registerModule(function (r) {
      expect(r.for('myComponent')).to.be.an.instanceof(ComponentDefinitionBuilderFactory);
    });
  });

  context('when a component definition is required', function () {
    var r;

    before(function () {
      ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);

      r = new Registry();

      r.registerModule(function (reg) {
        reg.for('myComponent').use('This is myComponent');
      });

    });

    after(function () {
      ComponentDefinitionBuilderFactory._reset();
    });

    it('should retrieve component definitions in the r with specified name', function () {
      var d = r.find('myComponent');

      expect(d).to.be.an.instanceof(SimpleComponentDefinition);
      expect(d.name).to.be.equal('myComponent');
    });

    it('should throw error when a compoent with specified name is not found', function () {
      expect(function () {
        r.find('unregisteredComponent');
      }).to.throw('No definition found for component \'unregisteredComponent\'');
    });

  });

});