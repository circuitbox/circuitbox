/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var Scopes = require('./scopes');
var ComponentDefinition = require('./componentDefinition');
var SimpleComponentDefinition = require('./simpleComponentDefinition');

describe('SimpleComponentDefinition', function () {

  it('inherits ComponentDefinition', function () {
    expect(SimpleComponentDefinition.super_).to.be(ComponentDefinition);
  });

  context('when created with name and object', function () {

    it('should return a the specified object as base value', function () {
      var objectValue = 'This is the object';

      var cd = new SimpleComponentDefinition({
        name: 'myComponent',
        scope: Scopes.prototype,
        component: objectValue
      });

      var component = cd.getComponent();
      expect(component).to.be(objectValue);
    });
  });

});