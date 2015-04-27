/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Engineering <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    expect = require('chai').expect,
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    ModuleComponentDefinition = require('../lib/moduleComponentDefinition'),
    defaultSelectors = require('../lib/defaultSelectors');

describe('Default Selectors', function () {
  var components;

  before(function () {
    components = [
      new SimpleComponentDefinition('a', 'Foo'),
      new SimpleComponentDefinition('b', 'Bar'),

      new SimpleComponentDefinition('evenNumber', 2),
      new SimpleComponentDefinition('oddNumber', 1),

      new SimpleComponentDefinition('GET /foo/bar', 'Get Foo-Bar'),
      new SimpleComponentDefinition('POST /foo/bar', 'Post Foo-Bar'),

      new ModuleComponentDefinition('express', 'foo'),
      new ModuleComponentDefinition('nimrod', 'nimrod')
    ];
  });

  describe('Type Selector', function () {
    var sel = defaultSelectors.type;

    it('should return all component definitions of type core.simple', function () {
      var simpleSel = _.partial(sel, 'core.simple'),
          defs = _.filter(components, simpleSel);

      expect(defs).to.have.lengthOf(6);
    });

    it('should return all component definitions of type core.module', function () {
      var moduleSel = _.partial(sel, 'core.module'),
          defs = _.filter(components, moduleSel);

      expect(defs).to.have.lengthOf(2);
    });

    it('should return empty list when matching component definitions of unknown type', function () {
      /* jshint expr: true */
      var unknownSel = _.partial(sel, 'core.foo'),
          defs = _.filter(components, unknownSel);

      expect(defs).to.be.empty;
    });

  });

  describe('RegExp Selector', function () {
    var sel = defaultSelectors.regexp;

    it('should return all component definitions whose name ends with Number', function () {
      var simpleSel = _.partial(sel, '.*Number$'),
          defs = _.filter(components, simpleSel);

      expect(defs).to.have.lengthOf(2);
      expect(defs[0].name).to.be.eql('evenNumber');
      expect(defs[1].name).to.be.eql('oddNumber');
    });

    it('should return all component definitions whose name has a single character', function () {
      var simpleSel = _.partial(sel, '^[a-z]$'),
          defs = _.filter(components, simpleSel);

      expect(defs).to.have.lengthOf(2);
      expect(defs[0].name).to.be.eql('a');
      expect(defs[1].name).to.be.eql('b');
    });

    it('should return all component definitions whose name matches the regular expression', function () {
      var simpleSel = _.partial(sel, '^[GET|POST].*$'),
          defs = _.filter(components, simpleSel);

      expect(defs).to.have.lengthOf(2);
      expect(defs[0].name).to.be.eql('GET /foo/bar');
      expect(defs[1].name).to.be.eql('POST /foo/bar');
    });

    it('should return empty list when no matching components were found', function () {
      /* jshint expr: true */
      var unknownSel = _.partial(sel, '2'),
          defs = _.filter(components, unknownSel);

      expect(defs).to.be.empty;
    });

  });

  describe('Name Selector', function () {
    var sel = defaultSelectors.name;

    it('should return all component definitions whose name ends with Number', function () {
      var simpleSel = _.partial(sel, '*Number'),
          defs = _.filter(components, simpleSel);

      expect(defs).to.have.lengthOf(2);
      expect(defs[0].name).to.be.eql('evenNumber');
      expect(defs[1].name).to.be.eql('oddNumber');
    });

    it('should return empty list when no matching components were found', function () {
      /* jshint expr: true */
      var unknownSel = _.partial(sel, '*Foo'),
          defs = _.filter(components, unknownSel);

      expect(defs).to.be.empty;
    });

  });

});