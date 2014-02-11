/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('expect.js');
var sinon = require('sinon');

var binder = require('../lib/binder');
var extender = require('../lib/extender');

describe('Extender', function () {

  it('should load a specified binding function passing it a binder', function () {
    var bindingSpy = sinon.spy();

    extender.loadBindings([bindingSpy]);

    expect(bindingSpy.withArgs(binder).calledOnce).to.be(true);

  });

  it('should load a specified binding module passing it a binder', function () {
    extender.loadBindings(['./test/fixtures/aBinding']);
  });

  it('should prefix binding module id with "circuitbox-", then load it by passing it a binder', function (done) {
    /*jshint expr: true*/

    expect(function () {
      extender.loadBindings(['express']);
    }).to.throwError(function (err) {
      expect(err.message).to.be('Cannot find module \'circuitbox-express\'');
      done();
    });

  });

});