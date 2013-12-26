/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint expr: true */

(function () {
  'use strict';

  var expect = require('expect.js');
  var sinon = require('sinon');

  var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
  var ComponentAssemblyStrategy = require('../lib/componentAssemblyStrategy');
  var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');

  describe('SimpleComponentAssemblyStrategy', function () {

    it('should be a ComponentAssemblyStrategy', function () {
      expect(SimpleComponentAssemblyStrategy.super_).to.be(ComponentAssemblyStrategy);
    });

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

      var initializerSpy = sinon.spy();

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: initializerSpy
      });

      var strategy = new SimpleComponentAssemblyStrategy(def);

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be(componentValue);
        expect(initializerSpy.calledOnce).to.be(true);
        done();
      });

    });

  });

})();