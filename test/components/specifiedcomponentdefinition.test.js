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
  var ComponentDefinition = require('../../lib/components/componentdefinition');
  var SpecifiedComponentDefinition = require('../../lib/components/specifiedcomponentdefinition');

  describe('SpecifiedComponentDefinition', function () {

    it('inherits ComponentDefinition', function () {
      expect(SpecifiedComponentDefinition.super_).to.be(ComponentDefinition);
    });

    context('when created with name and scope', function () {
      it('should have the specified name and scope', function () {
        var cd = new SpecifiedComponentDefinition({name: 'myComponent', scope: Scopes.singleton});
        expect(cd.name()).to.be('myComponent');
        expect(cd.scope()).to.be(Scopes.singleton);
      });
    });

    context('when created with name and object', function () {
      it('should emit specified object', function () {
        var objectValue = 'This is the object';

        var cd = new SpecifiedComponentDefinition({
          name: 'myComponent',
          scope: Scopes.singleton,
          object: objectValue
        });

        expect(cd.emit()).to.be.equal(objectValue);
      });
    });

  });

})();