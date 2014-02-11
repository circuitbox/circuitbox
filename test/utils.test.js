/*!
 * circuitbox
 * Copyright (c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT License
 */

'use strict';

var _ = require('lodash');
var expect = require('expect.js');
var utils = require('../lib/utils');

describe('Utilities', function () {

  describe('#sprintf()', function () {

    it('should return text without any placeholders', function () {
      expect(utils.sprintf('This is a message')).to.be('This is a message');
    });

    it('should return text after replacing placeholders with specified values', function () {
      expect(utils.sprintf('This is a message to %s', 'God')).to.be('This is a message to God');
      expect(utils.sprintf('I have $%.2f worth money in my %s', 34.3, 'pocket')).to.be('I have $34.30 worth money in my pocket');
      expect(utils.sprintf('The task is %d%% complete', 40)).to.be('The task is 40% complete');
    });

  });

  describe('#enumFor()', function () {
    it('should return empty object if no constants specified', function () {
      var testEnum = utils.enumFor();

      expect(_.isEmpty(testEnum)).to.be(true);
    });

    it('should return an object with the specified constants with values starting from 1', function () {
      var testEnum = utils.enumFor('a', 'b', 'c');

      expect(testEnum.a).to.be(1);
      expect(testEnum.b).to.be(2);
      expect(testEnum.c).to.be(3);

    });

    it('should return an object with the specified array constants with values starting from 1', function () {
      var testEnum = utils.enumFor(['a', 'b', 'c']);

      expect(testEnum.a).to.be(1);
      expect(testEnum.b).to.be(2);
      expect(testEnum.c).to.be(3);

    });

    it('should return an object with the specified constants with specified values', function () {
      var testEnum = utils.enumFor({
        'a': 3,
        'b': 2,
        'c': 1
      });

      expect(testEnum.a).to.be(3);
      expect(testEnum.b).to.be(2);
      expect(testEnum.c).to.be(1);

    });
  });

  describe('#normalizeModulePath()', function () {
    var originalCwd;

    beforeEach(function () {
      originalCwd = process.cwd;
      process.cwd = function () {
        return '/foo/bar';
      };
    });

    afterEach(function () {
      process.cwd = originalCwd;
    });

    it('should return module ID as-is if absolute', function () {
      expect(utils.normalizeModulePath('foo')).to.be('foo');
    });

    it('should return path relativized to process.cwd() if relative to current directory', function () {
      expect(utils.normalizeModulePath('./voo')).to.be('/foo/bar/voo');
    });

    it('should return path relativized to process.cwd() if relative to parent directory', function () {
      expect(utils.normalizeModulePath('../voo')).to.be('/foo/voo');
    });

    it('should return path relativized to process.cwd() if relative to module root directory', function () {
      expect(utils.normalizeModulePath('/voo')).to.be('/foo/bar/voo');
    });
  });

});