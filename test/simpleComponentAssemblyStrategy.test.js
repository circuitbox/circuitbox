/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint expr: true */

(function () {
  'use strict';

  var expect = require('expect.js');
  var utils = require('../lib/utils');

  var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
  var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');

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

    it('should assemble component with dependencies, initialize it with initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'John Doe';
      var templateValue = 'This is my message - by %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps) {
          expect(this).to.be(componentValue);
          expect(deps.template).to.be(templateValue);
          return utils.sprintf(deps.template, this);
        },
        dependencies: ['template']
      });

      var strategy = new SimpleComponentAssemblyStrategy(def, {
        template: templateValue
      });

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be('This is my message - by John Doe');
        done();
      });

    });

    it('should assemble component, initialize it with an async initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps, callBack) {
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

    it('should assemble component with dependencies, initialize it with an async initializer and pass component to specified callback', function (done) {
      var targetComponentName = 'myComponent';
      var componentValue = 'John Doe';
      var templateValue = 'This is my message - by %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps, callBack) {
          expect(deps.template).to.be(templateValue);
          callBack(null, utils.sprintf(deps.template, this));
        },
        dependencies: ['template']
      });

      var strategy = new SimpleComponentAssemblyStrategy(def, {
        template: templateValue
      });

      strategy.assemble(function (err, value) {
        expect(err).to.be.falsy;
        expect(value).to.be('This is my message - by John Doe');
        done();
      });

    });

  });

})();