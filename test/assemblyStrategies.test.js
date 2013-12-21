/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var expect = require('expect.js');

  var SimpleComponentDefinition = require('../lib/componentDefinitions').SimpleComponentDefinition;
  var SimpleComponentAssemblyStrategy = require('../lib/assemblyStrategies').SimpleComponentAssemblyStrategy;

  describe('SimpleComponentAssemblyStrategy', function () {

    it('should assemble component and pass to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue
      });

      var strategy = new SimpleComponentAssemblyStrategy(def);

      strategy.assemble(function (value) {
        expect(value).to.be(componentValue);
        done();
      });
    });

    it.skip('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (cb) {
          cb(this.toLowerCase());
        }
      });

      var strategy = new SimpleComponentAssemblyStrategy(def);

      strategy.assemble(function (value) {
        expect(value).to.be(componentValue.toLowerCase());
        done();
      });
    });

  });

})();