/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint expr: true */

'use strict';

var expect = require('expect.js');

var utils = require('../lib/utils');

var ModuleBasedComponentDefinition = require('../lib/moduleBasedComponentDefinition');
var ComponentAssemblyStrategy = require('../lib/componentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('../lib/moduleBasedComponentAssemblyStrategy');

describe('ModuleBasedComponentAssemblyStrategy', function () {

  it('should be a ComponentAssemblyStrategy', function () {
    expect(ModuleBasedComponentAssemblyStrategy.super_).to.be(ComponentAssemblyStrategy);
  });

  it('should assemble non-function component and pass to specified callback', function (done) {
    var targetComponentName = 'myComponent';

    var def = new ModuleBasedComponentDefinition({
      name: targetComponentName,
      moduleId: './test/fixtures/stringComponent'
    });

    var strategy = new ModuleBasedComponentAssemblyStrategy(def);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value).to.be('The quick brown fox jumped over the lazy dog.');
      done();
    });
  });

  it('should assemble function component by invoking it with dependencies and pass its return value to specified callback as component', function (done) {
    var targetComponentName = 'myComponent';
    var dependencies = {
      utils: utils,
      name: 'Homer Simpson'
    };

    var def = new ModuleBasedComponentDefinition({
      name: targetComponentName,
      moduleId: './test/fixtures/helloMessageComposer',
      dependencies: ['utils', 'name']
    });

    var strategy = new ModuleBasedComponentAssemblyStrategy(def, dependencies);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value.getMessage()).to.be('Hello world! This is Homer Simpson');
      done();
    });
  });

  it('should assemble component, initialize it with initializer and pass component to specified callback', function (done) {
    var targetComponentName = 'myComponent';

    var def = new ModuleBasedComponentDefinition({
      name: targetComponentName,
      moduleId: './test/fixtures/objectComponent',
      initializer: function () {
        return this.firstName + ' ' + this.lastName;
      }
    });

    var strategy = new ModuleBasedComponentAssemblyStrategy(def);

    strategy.assemble(function (err, value) {
      expect(err).to.be.falsy;
      expect(value).to.be('John Doe');
      done();
    });

  });

});