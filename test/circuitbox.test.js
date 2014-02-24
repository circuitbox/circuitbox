/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    circuitbox = require('../lib');

describe('circuitbox', function () {

  it('should export ComponentDefinition', function () {
    expect(circuitbox.ComponentDefinition).to.be.equal(require('../lib/componentDefinition'));
  });

  it('should export SimpleComponentDefinition', function () {
    expect(circuitbox.SimpleComponentDefinition).to.be.equal(require('../lib/simpleComponentDefinition'));
  });

  it('should export ModuleComponentDefinition', function () {
    expect(circuitbox.ModuleComponentDefinition).to.be.equal(require('../lib/moduleComponentDefinition'));
  });

  it('should export ComponentDefinitionBuilder', function () {
    expect(circuitbox.ComponentDefinitionBuilder).to.be.equal(require('../lib/componentDefinitionBuilder'));
  });

  it('should export SimpleComponentDefinitionBuilder', function () {
    expect(circuitbox.SimpleComponentDefinitionBuilder).to.be.equal(require('../lib/simpleComponentDefinitionBuilder'));
  });

  it('should export ModuleComponentDefinitionBuilder', function () {
    expect(circuitbox.ModuleComponentDefinitionBuilder).to.be.equal(require('../lib/moduleComponentDefinitionBuilder'));
  });

  it('should export ComponentCreator', function () {
    expect(circuitbox.ComponentCreator).to.be.equal(require('../lib/componentCreator'));
  });

  it('should export SimpleComponentCreator', function () {
    expect(circuitbox.SimpleComponentCreator).to.be.equal(require('../lib/simpleComponentCreator'));
  });

  it('should export ModuleComponentCreator', function () {
    expect(circuitbox.ModuleComponentCreator).to.be.equal(require('../lib/moduleComponentCreator'));
  });

});