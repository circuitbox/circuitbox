/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Scopes = require('../../../lib/components/scopes');

  var SimpleComponentDefinition = require('../../../lib/components/simpleComponentDefinition');
  var ComponentDefinitionBuilder = require('../../../lib/components/builders/componentDefinitionBuilder');
  var SimpleComponentDefinitionBuilder = require('../../../lib/components/builders/simpleComponentDefinitionBuilder');

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
        expect(definition.getEmitter()()).to.be(objectValue);
      });
    });
  });
})();