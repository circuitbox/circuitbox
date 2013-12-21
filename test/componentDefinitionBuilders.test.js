/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Scopes = require('../lib/scopes');

  var componentDefinitions = require('../lib/componentDefinitions');
  var ComponentDefinition = componentDefinitions.ComponentDefinition;
  var SimpleComponentDefinition = componentDefinitions.SimpleComponentDefinition;
  var ModuleBasedComponentDefinition = componentDefinitions.ModuleBasedComponentDefinition;

  var componentDefinitionBuilders = require('../lib/componentDefinitionBuilders');
  var ComponentDefinitionBuilder = componentDefinitionBuilders.ComponentDefinitionBuilder;
  var SimpleComponentDefinitionBuilder = componentDefinitionBuilders.SimpleComponentDefinitionBuilder;
  var ModuleBasedComponentDefinitionBuilder = componentDefinitionBuilders.ModuleBasedComponentDefinitionBuilder;
  var ComponentDefinitionBuilderFactory = componentDefinitionBuilders.ComponentDefinitionBuilderFactory;

  describe('ComponentDefinitionBuilder', function () {

    context('when created with a name, scope, initializer and dependencies', function () {

      it('should create a ComponentDefinition with the specified name, initializer and dependencies', function () {
        var initializer = function () {};
        var dependencies = ['a', 'b'];

        var definition = new ComponentDefinitionBuilder('myComponent')
          .initializeWith(initializer)
          .dependsOn(dependencies)
          .scope(Scopes.singleton)
          .build();

        expect(definition).to.be.a(ComponentDefinition);
        expect(definition.name).to.be('myComponent');
        expect(definition.scope).to.be(Scopes.singleton);
        expect(definition.initializer).to.be(initializer);
        expect(definition.dependencies).to.be(dependencies);

      });

    });

  });

  describe('SimpleComponentDefinitionBuilder', function () {

    it('inherits ComponentDefinitionBuilder', function () {
      expect(SimpleComponentDefinitionBuilder.super_).to.be(ComponentDefinitionBuilder);
    });

    context('when created with a name, object, scope, initialzer, and dependencies', function () {

      it('should create a SimpleComponentDefinition with the specified name, object, scope, initializer and dependencies', function () {
        var initializer = function () {};
        var dependencies = ['a', 'b'];
        var objectValue = 'This is the object';

        var definition = new SimpleComponentDefinitionBuilder('myComponent', objectValue)
          .scope(Scopes.singleton)
          .initializeWith(initializer)
          .dependsOn(dependencies)
          .build();

        expect(definition).to.be.a(SimpleComponentDefinition);
        expect(definition.name).to.be('myComponent');
        expect(definition.scope).to.be(Scopes.singleton);
        expect(definition.initializer).to.be(initializer);
        expect(definition.dependencies).to.be(dependencies);
        expect(definition.emitter()).to.be(objectValue);
      });

    });

  });

  describe('ModuleBasedComponentDefinitionBuilder', function () {

    it('inherits ComponentDefinitionBuilder', function () {
      expect(ModuleBasedComponentDefinitionBuilder.super_).to.be(ComponentDefinitionBuilder);
    });

    context('when created with a name, module-id, scope, initializer, and dependencies', function () {

      it('should create a SimpleComponentDefinition with the specified name, module-id, scope, initializer and dependencies', function () {
        var initializer = function () {};
        var dependencies = ['a', 'b'];
        var moduleId = './myComponentModule';

        var definition = new ModuleBasedComponentDefinitionBuilder('myComponent', moduleId)
          .scope(Scopes.singleton)
          .initializeWith(initializer)
          .dependsOn(dependencies)
          .build();

        expect(definition).to.be.a(ModuleBasedComponentDefinition);
        expect(definition.name).to.be('myComponent');
        expect(definition.scope).to.be(Scopes.singleton);
        expect(definition.initializer).to.be(initializer);
        expect(definition.dependencies).to.be(dependencies);
        expect(definition.emitter()).to.be(moduleId);
      });

    });

  });

  describe('ComponentDefinitionBuilderFactory', function () {

    context('when created with a and component registry component name', function () {
      var factory, componentList;

      beforeEach(function () {
        componentList = [];
        factory = new ComponentDefinitionBuilderFactory(componentList, 'myComponent');
      });

      it('should return a SimpleComponentDefinitionBuilder when #use() is invoked with an object and pushed to componentList', function () {
        var objectValue = 'This is a value';

        var definition = factory.use(objectValue);

        expect(definition).to.be.a(SimpleComponentDefinitionBuilder);
        expect(definition.options.name).to.be('myComponent');
        expect(definition.options.object).to.be(objectValue);

        expect(componentList.length).to.be(1);
        expect(componentList[0]).to.be(definition);
      });

      it('should register and return a ModuleBasedComponentDefinitionBuilder when #require() is invoked with an module-id', function () {
        var moduleId = './myComponentModule';

        var definition = factory.requires(moduleId);

        expect(definition).to.be.a(ModuleBasedComponentDefinitionBuilder);
        expect(definition.options.name).to.be('myComponent');
        expect(definition.options.moduleId).to.be(moduleId);

        expect(componentList.length).to.be(1);
        expect(componentList[0]).to.be(definition);
      });

    });

  });

})();