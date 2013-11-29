/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var SimpleComponentDefinitionBuilder = require('../../../lib/definitions/builders/simpleComponentDefinitionBuilder');
  var ModuleBasedComponentDefinitionBuilder = require('../../../lib/definitions/builders/moduleBasedComponentDefinitionBuilder');

  var ComponentDefinitionBuilderFactory = require('../../../lib/definitions/builders');

  describe('ComponentDefinitionBuilderFactory', function () {

    context('when created with a component name', function () {
      var factory;

      beforeEach(function () {
        factory = new ComponentDefinitionBuilderFactory('myComponent');
      });

      it('should return a SimpleComponentDefinitionBuilder when #use() is invoked with an object', function () {
        var objectValue = 'This is a value';

        var definition = factory.use(objectValue);

        expect(definition).to.be.a(SimpleComponentDefinitionBuilder);
        expect(definition.options.name).to.be('myComponent');
        expect(definition.options.object).to.be(objectValue);

      });

      it('should return a ModuleBasedComponentDefinitionBuilder when #require() is invoked with an module-id', function () {
        var moduleId = './myComponentModule';

        var definition = factory.require(moduleId);

        expect(definition).to.be.a(ModuleBasedComponentDefinitionBuilder);
        expect(definition.options.name).to.be('myComponent');
        expect(definition.options.moduleId).to.be(moduleId);

      });

    });

  });

})();