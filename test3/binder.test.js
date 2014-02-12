/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */
 
'use strict';

var expect = require('expect.js');

var ComponentDefinitionBuilderFactory = require('./componentDefinitionBuilderFactory');
var ComponentAssemblyStrategyFactory = require('./componentAssemblyStrategyFactory');
var binder = require('./binder');

describe('Binder', function () {

  it('should export ComponentDefinitionBuilderFactory#registerBuilder as definitionBuilder', function () {
    expect(binder.definitionBuilder).to.be(ComponentDefinitionBuilderFactory.registerBuilder);
  });

  it('should export ComponentAssemblyStrategyFactory#registerAssemblyStrategy as assemblyStrategy', function () {
    expect(binder.assemblyStrategy).to.be(ComponentAssemblyStrategyFactory.registerAssemblyStrategy);
  });

});