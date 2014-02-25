/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    Registry = require('../lib/registry'),
    EventEmitter = require('events').EventEmitter,
    CoreModule = require('../lib/coreModule');

describe('CoreModule', function () {

  beforeEach(function () {
    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);
  });

  afterEach(function () {
    ComponentDefinitionBuilderFactory._reset();
  });

  it('should register events.EventEmitter as bus in the registry as a singleton', function () {
    var r = new Registry(),
        d;

    r.registerModule(CoreModule);

    d = r.find('bus');

    expect(d).to.be.an.instanceof(SimpleComponentDefinition);
    expect(d.name).to.be.equal('bus');
    expect(d.value()).to.be.an.instanceof(EventEmitter);

  });

});