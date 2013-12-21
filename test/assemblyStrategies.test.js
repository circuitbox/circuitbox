/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint expr: true */

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

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be(componentValue);
        done();
      });
    });

    it('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function () {
          expect(this).to.be(componentValue);     // initializer to be called in the scope of base value
          return this.toLowerCase();
        }
      });

      var strategy = new SimpleComponentAssemblyStrategy(def);

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be(componentValue.toLowerCase());
        done();
      });

    });

    it('should assemble component, initialize it with an async initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (callBack) {
          callBack(null, this.toLowerCase());
        }
      });

      var strategy = new SimpleComponentAssemblyStrategy(def);

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be(componentValue.toLowerCase());
        done();
      });

    });

  });

})();