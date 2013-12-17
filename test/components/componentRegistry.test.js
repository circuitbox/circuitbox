/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');
  var sinon = require('sinon');

  var definitions = require('../../lib/definitions');
  var components = require('../../lib/components');

  var ComponentRegistry = components.ComponentRegistry;
  var SimpleComponentDefinition = require('../../lib/definitions/simpleComponentDefinition');
  var NoSuchComponentDefinitionError = definitions.NoSuchComponentDefinitionError;

  var ConfigurationDefinitionBuilderFactory = definitions.ComponentDefinitionBuilderFactory;

  describe('ComponentRegistry', function () {

    it('should call the module passing a registry to register components', function () {
      var registry = new ComponentRegistry();

      var module = sinon.spy();

      registry.registerModule(module);

      expect(module.calledOnce).to.be(true);
      expect(module.getCall(0).args[0].for).to.be.a('function');
    });

    it('should register specified module and build component defintions', function () {
      var registry = new ComponentRegistry();

      expect(registry.registerModule(function (config) {
        config.for('myComponent').use('This is a value');
      })).to.be(true);

      var componentDefinitions = registry.registeredDefinitions;

      expect(componentDefinitions.length).to.be(1);
      expect(componentDefinitions[0]).to.be.a(SimpleComponentDefinition);
    });

    it('should throw error if module attempts to register a component without a name', function () {
      var registry = new ComponentRegistry();

      registry.registerModule(function (registry) {
        expect(function () {
          registry.for();
        }).to.throwError(function (e) {
          expect(e).to.be.a(definitions.ComponentDefinitionError);
          expect(e.message).to.match(/A valid component name must be specified/);
        });
      });

    });

    it('should throw error if module attempts to register a component with the same name as another component', function () {
      var registry = new ComponentRegistry();

      expect(function () {
        registry.registerModule(function (registry) {
          registry.for('myComponent').use('This is a value');
          registry.for('myComponent').use('This is another value');
        });
      }).to.throwError(function (e) {
        expect(e).to.be.a(definitions.ComponentDefinitionError);
        expect(e.message).to.match(/Another component with the name "myComponent" has already been registered/);
      });

    });

    it('should provide a ComponentDefinitionBuilderFactory to describe component definition', function () {
      var registry = new ComponentRegistry();

      registry.registerModule(function (registry) {
        var factory = registry.for('myComponent');
        expect(factory).to.be.a(ConfigurationDefinitionBuilderFactory);
      });
    });

    context('when a component definition is required', function () {
      var registry = new ComponentRegistry();
        
      registry.registerModule(function (registry) {
        registry.for('myComponent').use('This is myComponent');
      });
      
      it('should retrieve component definitions in the registry with specified name', function () {
        var componentDef = registry.findDefinitionForComponent('myComponent');
        
        expect(componentDef).to.be.a(SimpleComponentDefinition);
        expect(componentDef.name).to.be('myComponent');
      });
      
      it('should throw error when a compoent with specified name is not found', function () {
        expect(function () {
          registry.findDefinitionForComponent('unregisteredComponent');
        }).to.throwError(function (e) {
          expect(e).to.be.a(NoSuchComponentDefinitionError);
          expect(e.message).to.match(/Component 'unregisteredComponent' could not be found/);
        });
      });
      
    });

  });
})();