/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');
var utils = require('./utils');

var SimpleComponentDefinition = require('./simpleComponentDefinition');
var ComponentAssemblyStrategy = require('./componentAssemblyStrategy');

describe('ComponentAssemblyStrategy', function () {

  it('should have a getter to return the dependencies passed to it', function () {
    var targetComponentName = 'myComponent';

    var dependencies = {
      utils: utils,
      location: 'home'
    };

    var baseComponent = function (deps) {
      return deps.utils.sprintf('This is my %s', deps.location);
    };

    var def = new SimpleComponentDefinition({
      name: targetComponentName,
      component: baseComponent,
      dependencies: ['utils', 'location']
    });

    var strategy = new ComponentAssemblyStrategy(def, dependencies);

    expect(strategy.dependencies).to.be(dependencies);
  });

  it('provides a method to build assembly sequence which throws error by default', function () {
    var targetComponentName = 'myComponent';
    var component = 'This is my message';

    var def = new SimpleComponentDefinition({
      name: targetComponentName,
      component: component,
      initializer: function () {
        expect(this).to.be(component);     // initializer to be called in the scope of component
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

  context('#processBaseComponent()', function () {

    it('returns a null component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = null;

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(null);
      });

    });

    it('returns a string component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = 'This is a string value';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(baseComponent);
      });

    });

    it('returns a number component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = 2344.34;

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(baseComponent);
      });

    });

    it('returns a boolean component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = true;

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(baseComponent);
      });

    });

    it('returns a object component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = {name: 'John Doe', age: 21, male: true};

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(baseComponent);
      });

    });

    it('returns a array component as-is to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = [23, 54, 77, 2, 5];

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be(baseComponent);
      });

    });

    it('returns the return value of a sync function component after invoking it to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = function () {
        return 'This is the result';
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be('This is the result');
      });

    });

    it('returns the return value of a sync function component after invoking it with dependencies to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var dependencies = {
        utils: utils,
        location: 'home'
      };
      var baseComponent = function (deps) {
        return deps.utils.sprintf('This is my %s', deps.location);
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent,
        dependencies: ['utils', 'location']
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be('This is my home');
      });

    });

    it('returns the return value of an async function component after invoking it to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var baseComponent = function (deps, callback) {
        callback(null, 'This is the result');
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent
      });

      var strategy = new ComponentAssemblyStrategy(def);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be('This is the result');
      });

    });

    it('returns the return value of an async function component after invoking it with dependencies to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var dependencies = {
        utils: utils,
        location: 'home'
      };
      var baseComponent = function (deps, callback) {
        callback(null, deps.utils.sprintf('This is my %s', deps.location));
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent,
        dependencies: ['utils', 'location']
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      strategy.processBaseComponent(baseComponent, function (err, component) {
        expect(err).to.be(null);
        expect(component).to.be('This is my home');
      });

    });

    it('passes the error thrown by a sync function component after invoking it to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var dependencies = {
        utils: utils,
        location: 'home'
      };
      var baseComponent = function () {
        throw new Error('an intentional mistake');
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent,
        dependencies: ['utils', 'location']
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      strategy.processBaseComponent(baseComponent, function (err) {
        expect(err.message).to.match(/an intentional mistake/);
      });

    });

    it('passes the error sent by an async function component after invoking it to the specified callback', function () {
      var targetComponentName = 'myComponent';
      var dependencies = {
        utils: utils,
        location: 'home'
      };
      var baseComponent = function (deps, callback) {
        callback(new Error('an accidental mistake'));
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: baseComponent,
        dependencies: ['utils', 'location']
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      strategy.processBaseComponent(baseComponent, function (err) {
        expect(err.message).to.match(/an accidental mistake/);
      });

    });

  });

  context('#runInitializer()', function () {

    it('provides a default implementation of the runInitializer function', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function () {
          expect(this).to.be(component);     // initializer to be called in the scope of component
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
      var component = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function () {
          expect(this).to.be(component);     // initializer to be called in the scope of base value
          return this.toLowerCase();
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be(component.toLowerCase());
      });

    });

    it('should call the specified sync initializer passing the dependencies and with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';
      var dependencies = {
        location: 'home'
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        dependencies: ['location'],
        initializer: function (deps) {
          expect(deps.location).to.be('home');
          expect(this).to.be(component);     // initializer to be called in the scope of base value
          return utils.sprintf(this, deps.location).toLowerCase();
        }
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be('this is my home'.toLowerCase());
      });

    });

    it('should call the specified async initializer with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function (deps, callback) {
          expect(this).to.be(component);     // initializer to be called in the scope of base value
          callback(null, this.toLowerCase());
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be(component.toLowerCase());
      });

    });

    it('should call the specified async initializer passing the dependencies and with this as the baseValue', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';
      var dependencies = {
        location: 'home'
      };

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        dependencies: ['location'],
        initializer: function (deps, callback) {
          expect(deps.location).to.be('home');
          expect(this).to.be(component);     // initializer to be called in the scope of base value
          callback(null, utils.sprintf(this, deps.location).toLowerCase());
        }
      });

      var strategy = new ComponentAssemblyStrategy(def, dependencies);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be('this is my home'.toLowerCase());
      });

    });

    it('should return base value if sync initializer does not return any value', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function (deps, callback) {
          expect(this).to.be(component);     // initializer to be called in the scope of base value
          callback(null, null);
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be(component);
      });

    });

    it('should not invoke initializer if not specified and return base value', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err, result) {
        expect(result).to.be(component);
      });

    });

    it('should invoke callback with error if sync initializer throws an error', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function () {
          throw new Error('an intentional mistake');
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err) {
        expect(err).to.be.an(Error);
        expect(err.message).to.match(/an intentional mistake/);
      });

    });

    it('should invoke callback with error if async initializer sends an error', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my %s';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function (deps, callback) {
          callback(new Error('an accidental mistake'));
        }
      });

      var strategy = new ComponentAssemblyStrategy(def);

      var runInitializerFn = strategy.runInitializer;

      runInitializerFn(component, function (err) {
        expect(err).to.be.an(Error);
        expect(err.message).to.match(/an accidental mistake/);
      });

    });

    it('attempt to assemble calls the callback with an error by default', function () {
      var targetComponentName = 'myComponent';
      var component = 'This is my message';

      var def = new SimpleComponentDefinition({
        name: targetComponentName,
        component: component,
        initializer: function () {
          expect(this).to.be(component);     // initializer to be called in the scope of base value
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

});