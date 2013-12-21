/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint nonew: false*/
/*jshint expr: true*/

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');
  
  var errors = require('../lib/errors');
  var componentDefinitions = require('../lib/componentDefinitions');

  var Scopes = require('../lib/scopes');
  var ComponentDefinition = componentDefinitions.ComponentDefinition;
  var SimpleComponentDefinition = componentDefinitions.SimpleComponentDefinition;
  var ModuleBasedComponentDefinition = componentDefinitions.ModuleBasedComponentDefinition;

  var ComponentCreationError = errors.ComponentCreationError;
  var ComponentDefinitionError = errors.ComponentDefinitionError;

  describe('ComponentDefinition', function () {

    context('when created with only a name', function () {

      it('should be created with specified name and prototype scope', function () {
        var cd = new ComponentDefinition({name: 'myComponent'});
        expect(cd.name).to.be('myComponent');
        expect(cd.scope).to.be(Scopes.prototype);
      });

    });

    context('when created with a name and scope', function () {

      it('should be created with specified name and specified scope', function () {
        var cd = new ComponentDefinition({name: 'myComponent', scope: Scopes.singleton});
        expect(cd.name).to.be('myComponent');
        expect(cd.scope).to.be(Scopes.singleton);
      });

    });

    context('when created with a name and list of dependencies', function () {

      it('should be created with specified name and specified dependency list', function () {
        var dependencies = ['a', 'b'];
        var cd = new ComponentDefinition({
          name: 'myComponent',
          dependencies: dependencies
        });
        expect(cd.name).to.be('myComponent');
      });

    });

    context('when created with an initializer', function () {

      it('should return initializer function', function () {
        var initializer = function () {};

        var cd = new ComponentDefinition({
          name: 'myComponent',
          initializer: initializer
        });

        expect(cd.name).to.be('myComponent');
        expect(cd.initializer).to.be(initializer);
      });

      it('should return initializer function name', function () {
        var cd = new ComponentDefinition({
          name: 'myComponent',
          initializer: 'initializer'
        });

        expect(cd.name).to.be('myComponent');
        expect(cd.initializer).to.be('initializer');
      });

      it('should throw error if initializer is not a function or string', function () {
        expect(function () {
          new ComponentDefinition({
            name: 'myComponent',
            initializer: {}
          });
        }).throwException(function (e) {
          expect(e).to.be.a(ComponentDefinitionError);
          expect(e.message).to.match(/Initializer for 'myComponent' must be a function/);
        });
      });

      it('should provide a method to get base component which throws an error by default', function () {
        var cd = new ComponentDefinition({name: 'myComponent'});

        expect(function () {
          cd.emitter;
        }).to.throwException(function (e) {
            expect(e).to.be.a(ComponentCreationError);
            expect(e.message).to.match(/Component 'myComponent' could not be created/);
          });
      });

    });
  });

  describe('SimpleComponentDefinition', function () {

    it('inherits ComponentDefinition', function () {
      expect(SimpleComponentDefinition.super_).to.be(ComponentDefinition);
    });

    context('when created with name and object', function () {
      
      it('should return a function which emits specified object', function () {
        var objectValue = 'This is the object';

        var cd = new SimpleComponentDefinition({
          name: 'myComponent',
          scope: Scopes.singleton,
          object: objectValue
        });

        var emitter = cd.emitter;
        expect(emitter).to.be.a(Function);
        expect(emitter()).to.be(objectValue);
      });
    });

  });
  
  describe('ModuleBasedComponentDefinition', function () {
    
    it('inherits ComponentDefinition', function () {
      expect(ModuleBasedComponentDefinition.super_).to.be(ComponentDefinition);
    });

    context('when created with name and module id', function () {
      
      it('should return a function that emits the specified module id', function () {
        var d = new ModuleBasedComponentDefinition({
          name: 'myComponent',
          moduleId: './myComponentModule'
        });

        var result = d.emitter();

        expect(result).to.be.a('string');
        expect(result).to.be('./myComponentModule');
      });
      
    });
    
  });
})();