/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    Kernel = require('../lib/kernel');

describe('Kernel', function () {
  /*jshint newcap: false*/
  /*jshint expr: true*/

  it('should invoke callback once created', function () {
    var cb = sinon.spy();

    Kernel('myKernel', cb);

    expect(cb.calledOnce).to.be.true;
  });

  it('should return promise and fulfill it when created', function () {
    Kernel('myKernel').then(function (k) {
      expect(k.name).to.be.equal('myKernel');
    });
  });

  it('should be creatable with a name', function () {
    Kernel('myKernel', function (err, k) {
      expect(k.name).to.be.equal('myKernel');
    });
  });

  it('should register the specified component modules at creation time and invoke callback', function (done) {
    var modA = sinon.spy(),
        modB = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, modB]
    }, function () {
      expect(modA.calledOnce).to.be.true;
      expect(modB.calledOnce).to.be.true;
      done();
    });
  });

  it('should invoke callback with error if any of the specified component modules throws error', function (done) {
    var modA = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, function () {
        throw new Error('intentional mistake');
      }]
    }, function (err) {
      expect(modA.calledOnce).to.be.true;

      expect(err.message).to.be.equal('intentional mistake');

      done();
    });
  });

  it('should promise to register the specified component modules at creation time and fulfill promise with kernel instance', function (done) {
    var modA = sinon.spy(),
        modB = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, modB]
    }).then(function () {
      expect(modA.calledOnce).to.be.true;
      expect(modB.calledOnce).to.be.true;
      done();
    });
  });

  it('should promise to register the specified component modules at creation time and reject the promise if a module throws error', function (done) {
    var modA = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, function () {
        throw new Error('intentional mistake');
      }]
    }).then(function () {}, function (err) {
      expect(modA.calledOnce).to.be.true;

      expect(err.message).to.be.equal('intentional mistake');

      done();
    });
  });

});