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

  var Scopes = require('../lib/scopes');
  var ComponentDefinition = require('../lib/componentDefinition');

  var ComponentCreationError = require('../lib/componentCreationError');
  var ComponentDefinitionError = require('../lib/componentDefinitionError');

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

})();