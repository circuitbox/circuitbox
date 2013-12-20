/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder');
  var ModuleBasedComponentDefinitionBuilder = require('../lib/moduleBasedComponentDefinitionBuilder');

  var ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory');

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

        var definition = factory.require(moduleId);

        expect(definition).to.be.a(ModuleBasedComponentDefinitionBuilder);
        expect(definition.options.name).to.be('myComponent');
        expect(definition.options.moduleId).to.be(moduleId);

        expect(componentList.length).to.be(1);
        expect(componentList[0]).to.be(definition);
      });

    });

  });

})();