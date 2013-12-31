/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var Scopes = require('../lib/scopes');
var ModuleBasedComponentDefinition = require('../lib/moduleBasedComponentDefinition');
var ComponentDefinitionBuilder = require('../lib/componentDefinitionBuilder');
var ModuleBasedComponentDefinitionBuilder = require('../lib/moduleBasedComponentDefinitionBuilder');

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
          .scope(Scopes.prototype)
          .initializeWith(initializer)
          .dependsOn(dependencies)
          .build();

      expect(definition).to.be.a(ModuleBasedComponentDefinition);
      expect(definition.name).to.be('myComponent');
      expect(definition.scope).to.be(Scopes.prototype);
      expect(definition.initializer).to.be(initializer);
      expect(definition.dependencies).to.be(dependencies);
      expect(definition.getModuleId()).to.be(moduleId);
    });

  });

});