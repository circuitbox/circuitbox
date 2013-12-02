/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var expect = require('expect.js');

  var definitions = require('../../lib/definitions');
  var ComponentConfiguration = require('../../lib/config/componentConfiguration');
  var ConfigurationDefinitionBuilderFactory = require('../../lib/definitions/builders');

  describe('ComponentConfiguration', function () {

    it('should provide a ComponentDefinitionBuilderFactory to describe component definition', function () {
      var componentName = 'myComponent';

      var config = new ComponentConfiguration();

      var factory = config.for(componentName);
      expect(factory).to.be.a(ConfigurationDefinitionBuilderFactory);
    });

    it('should throw error if component name is not specified while describing a component definition', function () {

      var config = new ComponentConfiguration();

      expect(function () {
        config.for();
      }).to.throwError(function (e) {
          expect(e).to.be.a(definitions.ComponentDefinitionError);
          expect(e.message).to.match(/A valid component name must be specified/);
        });

    });
  });
})();