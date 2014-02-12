/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var Scopes = require('./scopes');
var SimpleComponentDefinition = require('./simpleComponentDefinition');
var ComponentDefinitionBuilder = require('./componentDefinitionBuilder');
var SimpleComponentDefinitionBuilder = require('./simpleComponentDefinitionBuilder');

describe('SimpleComponentDefinitionBuilder', function () {

  it('inherits ComponentDefinitionBuilder', function () {
    expect(SimpleComponentDefinitionBuilder.super_).to.be(ComponentDefinitionBuilder);
  });

  context('when created with a name, object, scope, initializer, and dependencies', function () {

    it('should create a SimpleComponentDefinition with the specified name, object, scope, initializer and dependencies', function () {
      var initializer = function () {};
      var dependencies = ['a', 'b'];
      var component = 'This is the object';

      var definition = new SimpleComponentDefinitionBuilder('myComponent', component)
          .scope(Scopes.prototype)
          .initializeWith(initializer)
          .dependsOn(dependencies)
          .build();

      expect(definition).to.be.a(SimpleComponentDefinition);
      expect(definition.name).to.be('myComponent');
      expect(definition.scope).to.be(Scopes.prototype);
      expect(definition.initializer).to.be(initializer);
      expect(definition.dependencies).to.be(dependencies);
      expect(definition.getComponent()).to.be(component);
    });

  });

});