/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var expect = require('expect.js');
  var utils = require('../lib/utils');

  var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
  var ComponentAssemblyStrategy = require('../lib/componentAssemblyStrategy');

  describe('ComponentAssemblyStrategy', function () {

    it('provides a method to build assembly sequence which throws error by default', function () {
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

      var strategy = new ComponentAssemblyStrategy(def);

      expect(function () {
        strategy.buildAssemblySequence();
      }).to.throwError(function (e) {
            expect(e.message).to.match(/not implemented exception/);
          });

    });

    it('provides a default implementation of the runInitializer function', function () {
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

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;
      expect(runInitializerFn).to.be.ok();
      expect(runInitializerFn).to.be.a('function');
    });

    it('should call the specified sync initializer with this as the baseValue', function () {
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

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be(componentValue.toLowerCase());
      });

    });

    it('should call the specified sync initializer passing the dependencies and with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';
      var dependencies = {
        location: 'home'
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        dependencies: ['location'],
        initializer: function (deps) {
          expect(deps.location).to.be('home');
          expect(this).to.be(componentValue);     // initializer to be called in the scope of base value
          return utils.sprintf(this, deps.location).toLowerCase();
        }
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be('this is my home'.toLowerCase());
      });

    });

    it('should call the specified async initializer with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps, callback) {
          expect(this).to.be(componentValue);     // initializer to be called in the scope of base value
          callback(null, this.toLowerCase());
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be(componentValue.toLowerCase());
      });

    });

    it('should call the specified async initializer passing the dependencies and with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';
      var dependencies = {
        location: 'home'
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        dependencies: ['location'],
        initializer: function (deps, callback) {
          expect(deps.location).to.be('home');
          expect(this).to.be(componentValue);     // initializer to be called in the scope of base value
          callback(null, utils.sprintf(this, deps.location).toLowerCase());
        }
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be('this is my home'.toLowerCase());
      });

    });

    it('should return base value if sync initializer does not return any value', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps, callback) {
          expect(this).to.be(componentValue);     // initializer to be called in the scope of base value
          callback(null, null);
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be(componentValue);
      });

    });

    it('should not invoke initializer if not specified and return base value', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err, result) {
        expect(result).to.be(componentValue);
      });

    });

    it('should invoke callback with error if sync initializer throws an error', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function () {
          throw new Error('an intentional mistake');
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err) {
        expect(err).to.be.an(Error);
        expect(err.message).to.match(/an intentional mistake/);
      });

    });

    it('should invoke callback with error if async initializer sends an error', function () {
      var targetComponentName = 'myComponent';
      var componentValue = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        object: componentValue,
        initializer: function (deps, callback) {
          callback(new Error('an accidental mistake'));
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(componentValue, function (err) {
        expect(err).to.be.an(Error);
        expect(err.message).to.match(/an accidental mistake/);
      });

    });

    it('attempt to assemble calls the callback with an error by default', function () {
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

      var strategy = new ComponentAssemblyStrategy(def);

      expect(function () {
        strategy.assemble(function () {});
      }).to.throwError(function (e) {
            expect(e.message).to.match(/not implemented exception/);
          });

    });

  });

})();