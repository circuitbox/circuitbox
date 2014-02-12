/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');
var ModuleBasedComponentDefinitionBuilder = require('./moduleBasedComponentDefinitionBuilder');
var ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory');

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
      expect(definition.options.component).to.be(objectValue);

      expect(componentList.length).to.be(1);
      expect(componentList[0]).to.be(definition);
    });

    it('should return a ModuleBasedComponentDefinitionBuilder when #require() is invoked with an module-id and pushed to componentList', function () {
      var moduleId = './myComponentModule';

      var definition = factory.requires(moduleId);

      expect(definition).to.be.a(ModuleBasedComponentDefinitionBuilder);
      expect(definition.options.name).to.be('myComponent');
      expect(definition.options.moduleId).to.be(moduleId);

      expect(componentList.length).to.be(1);
      expect(componentList[0]).to.be(definition);
    });

    it('should register a the specified definition builder with the specified method', function () {
      var objectValue = 'This is a value';

      ComponentDefinitionBuilderFactory.registerBuilder('foo', SimpleComponentDefinitionBuilder);
      factory = new ComponentDefinitionBuilderFactory(componentList, 'myComponent');

      var definition = factory.foo(objectValue);

      expect(definition).to.be.a(SimpleComponentDefinitionBuilder);
      expect(definition.options.name).to.be('myComponent');
      expect(definition.options.component).to.be(objectValue);

      expect(componentList.length).to.be(1);
      expect(componentList[0]).to.be(definition);
    });

  });

});