/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint camelcase: false*/

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Scopes = require('../../lib/components/scopes');
  var ComponentDefinition = require('../../lib/components/componentDefinition');
  var SimpleComponentDefinition = require('../../lib/components/simpleComponentDefinition');

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

        expect(cd.getEmitter()).to.be.a(Function);
        expect((cd.getEmitter())()).to.be(objectValue);
      });
    });

  });

})();