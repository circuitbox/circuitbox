/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');
var sinon = require('sinon');

var deferred = require('../lib/deferred');

describe('Deferred', function () {
  it('should return a new instance when invoked', function () {
    var da = deferred();
    var db = deferred();

    expect(da).not.to.be(db);
  });

  it('should return a promise onto which completion handler can be attached', function () {
    var promise = deferred().promise;

    expect(promise.done).to.be.a('function');
  });

  it('should return a promise onto which failure handler can be attached', function () {
    var promise = deferred().promise;

    expect(promise.fail).to.be.a('function');
  });

  context('when resolved', function () {
    it('should call the completion handler', function () {
      var handlerSpy = sinon.spy();
      var dfd = deferred();

      dfd.promise.done(handlerSpy);

      dfd.resolve();

      expect(handlerSpy.calledOnce).to.be(true);
    });
  });

  context('when resolved with a value', function () {
    it('should call the completion handler with the resolved value', function () {
      var handlerSpy = sinon.spy();
      var dfd = deferred();

      dfd.promise.done(handlerSpy);

      dfd.resolve('This is what you\'ve been waiting for');

      expect(handlerSpy.withArgs('This is what you\'ve been waiting for').calledOnce).to.be(true);
    });
  });

  context('when rejected with a reason', function () {
    it('should call the failure handler with the reason', function () {
      var called = false;
      var dfd = deferred();

      dfd.promise.fail(function (err) {
        expect(err).to.be('wont process');
        called = true;
      });

      dfd.reject('wont process');

      expect(called).to.be(true);
    });
  });

});