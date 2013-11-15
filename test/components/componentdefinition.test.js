/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Scopes = require('../../lib/components/scopes');
  var ComponentDefinition = require('../../lib/components/componentdefinition');
  var ComponentCreationException = require('../../lib/components/componentcreationexception');

  describe('ComponentDefinition', function () {

    context('when created with only a name', function () {
      it('should be created with specified name and prototype scope', function () {
        var cd = new ComponentDefinition({name: 'myComponent'});
        expect(cd.name()).to.be('myComponent');
        expect(cd.scope()).to.be(Scopes.prototype);
      });
    });

    context('when created with a name and scope', function () {
      it('should be created with specified name and specified scope', function () {
        var cd = new ComponentDefinition({name: 'myComponent', scope: Scopes.singleton});
        expect(cd.name()).to.be('myComponent');
        expect(cd.scope()).to.be(Scopes.singleton);
      });
    });

    it('should provide a build method to construct component which throws a an error by default', function () {
      var cd = new ComponentDefinition({name: 'myComponent'});

      expect(function () {
        cd.build();
      }).to.throwException(function (e) {
        expect(e).to.be.a(ComponentCreationException);
        expect(e.message).to.match(/Component \'myComponent\' could not be created/);
      });
    });
  });
})();