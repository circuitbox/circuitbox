/*!
 * circuitbox
 * Copyright (c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT License
 */

'use strict';

var expect = require('chai').expect;

describe('Utilities', function () {
  var utils = require('../lib/utils');

  describe('#normalizeModulePath()', function () {
    var originalCwd,
        normalizeModulePath = utils.normalizeModulePath;

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
      expect(normalizeModulePath('foo')).to.be.equal('foo');
    });

    it('shoulrn path relativized to process.cwd() if relative to current directory', function () {
      expect(normalizeModulePath('./voo')).to.be.equal('/foo/bar/voo');
    });

    it('shoulrn path relativized to process.cwd() if relative to parent directory', function () {
      expect(normalizeModulePath('../voo')).to.be.equal('/foo/voo');
    });

    it('shoulrn path relativized to process.cwd() if relative to module root directory', function () {
      expect(normalizeModulePath('/voo')).to.be.equal('/foo/bar/voo');
    });
  });

});