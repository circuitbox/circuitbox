/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var CircuitBox = require('../lib/circuit_Box');
  var NoSuchComponentDefinitionException = require('../lib/components/no_SuchComponentDefinitionException');

  describe('CircuitBox', function () {

    context('when created', function () {
      var cbx = new CircuitBox();

      it('should be empty', function () {
        expect(cbx.hasComponents()).to.be(false);
      });

      it('should throw error if an unregistered component is requested', function () {
        expect(function () {
          cbx.get('unregisteredComponent');
        }).to.throwException(function (e) {
            expect(e).to.be.a(NoSuchComponentDefinitionException);
            expect(e.message).to.match(/Component 'unregisteredComponent' could not be found/);
          });
      });

    });

    context('when created without a name', function () {
      var registry = new CircuitBox();

      it('should not have a name', function () {
        expect(registry.name()).not.to.be.ok();
      });

    });

    context('when created with a name', function () {
      var registry =  new CircuitBox({name: 'test'});

      it('should have the specified name', function () {
        expect(registry.name()).to.be('test');
      });

    });
  });
})();