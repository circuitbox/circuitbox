/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Kernel = require('../lib/kernel');
  var ComponentRegistry = require('../lib/components/componentRegistry');

  var NoSuchComponentDefinitionException = require('../lib/definitions/noSuchComponentDefinitionError');

  describe('Kernel', function () {

    context('when created', function () {
      var kernel = new Kernel();

      it('should be empty', function () {
        expect(kernel.hasComponents).to.be(false);
      });

      it('should provide access to its component registry', function () {
        expect(kernel.registry).to.be.a(ComponentRegistry);
      });

      it.skip('should throw error if an unregistered component is requested', function () {
        expect(function () {
          kernel.get('unregisteredComponent');
        }).to.throwException(function (e) {
            expect(e).to.be.a(NoSuchComponentDefinitionException);
            expect(e.message).to.match(/Component 'unregisteredComponent' could not be found/);
          });
      });

    });

    context('when created without a name', function () {
      var kernel = new Kernel();

      it('should not have a name', function () {
        expect(kernel.name).not.to.be.ok();
      });

    });

    context('when created with a name', function () {
      var kernel =  new Kernel({name: 'test'});

      it('should have the specified name', function () {
        expect(kernel.name).to.be('test');
      });

    });
  });
})();