/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var sinon = require('sinon');

var SimpleComponentDefinition = require('../lib/simpleComponentDefinition');
var ModuleBasedComponentDefinition = require('../lib/moduleBasedComponentDefinition');

var SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder');
var ModuleBasedComponentDefinitionBuilder = require('../lib/moduleBasedComponentDefinitionBuilder');

var SimpleComponentAssemblyStrategy = require('../lib/simpleComponentAssemblyStrategy');
var ModuleBasedComponentAssemblyStrategy = require('../lib/moduleBasedComponentAssemblyStrategy');

var basicBinding = require('../lib/basicBinding');

var binderApi = {
  definitionBuilder: function () {},
  assemblyStrategy: function () {}
};

describe('BasicBinding', function () {
  var mockBinder;

  beforeEach(function () {
    mockBinder = sinon.mock(binderApi);
  });

  afterEach(function () {
    mockBinder.verify();
    mockBinder.restore();
  });

  it('should register SimpleComponent and ModuleBasedComponent definition builders and assembly strategies', function () {

    mockBinder.expects('definitionBuilder').withArgs('use', SimpleComponentDefinitionBuilder).once();
    mockBinder.expects('assemblyStrategy').withArgs(SimpleComponentDefinition, SimpleComponentAssemblyStrategy).once();

    mockBinder.expects('definitionBuilder').withArgs('requires', ModuleBasedComponentDefinitionBuilder).once();
    mockBinder.expects('assemblyStrategy').withArgs(ModuleBasedComponentDefinition, ModuleBasedComponentAssemblyStrategy).once();

    basicBinding(binderApi);

  });

});