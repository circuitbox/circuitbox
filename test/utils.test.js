/*!
 * circuitbox
 * Copyright (c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT License
 */

'use strict';

var _ = require('underscore'),
    async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('Utilities', function () {
  /*jshint expr: true*/

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

  describe('#bindAllTo()', function () {
    var bindAllTo = utils.bindAllTo;

    it('should bind the specified function to the specified object', function () {
      var cxt = 'foo bar',
          f = function () { return this.toUpperCase(); },
          bf = bindAllTo(cxt, f)[0];

      expect(bf()).to.be.equal('FOO BAR');
    });

    it('should bind all the specified functions to the specified object', function () {
      var cxt = 'foo bar',
          fxs = _.times(10, function () { return sinon.spy(); }),
          bf = bindAllTo(cxt, fxs);

      async.waterfall(bf, function () {
        _.each(fxs, function (fx) {
          fx.calledOn(cxt);
        });
      });

    });

    it('should skip all non-functions in the specified list of functions', function () {
      var cxt = 'foo bar',
          fxs = _.times(10, function () { return sinon.spy(); }),
          bf;

      fxs.concat(['This is not a function']);

      bf = bindAllTo(cxt, fxs);

      expect(bf.length).to.be.equal(10);

      async.waterfall(bf, function () {
        _.each(fxs, function (fx) {
          fx.calledOn(cxt);
        });
      });

    });
  });
});