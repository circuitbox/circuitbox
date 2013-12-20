/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');
  var sinon = require('sinon');

  var deferred = require('../lib/deferred');

  describe('deferred', function () {
    it('should return a new instance when invoked', function () {
      var da = deferred();
      var db = deferred();

      expect(da).not.to.be(db);
    });

    it('should return a promise onto which fulfillment handler can be attached', function () {
      var promise = deferred().promise;

      expect(promise.then).to.be.a('function');
    });

    it('should return a promise onto which failure handler can be attached', function () {
      var promise = deferred().promise;

      expect(promise.fail).to.be.a('function');
    });

    describe('promise', function () {

      it('should register a fulfillment handler and return promise instance', function () {
        var promise = deferred().promise;

        expect(promise.then(function () {})).to.be(promise);
      });

      it('should not register a fulfillment handler if its not a function', function () {
        var promise = deferred().promise;

        expect(function () {
          promise.then({});
        }).to.throwError();

      });

      it('should register a failure handler and return promise instance', function () {
        var promise = deferred().promise;

        expect(promise.fail(function (err) { err.toString(); })).to.be(promise);
      });

      it('should not register a failure handler if its not a function', function () {
        var promise = deferred().promise;

        expect(function () {
          promise.fail({});
        }).to.throwError();

      });

      it('should not register a failure handler it does not accept the error parameter', function () {
        var promise = deferred().promise;

        expect(function () {
          promise.fail(function () {});
        }).to.throwError();

      });

      context('when resolved', function () {
        it('should call the fulfillment handler', function () {
          var handlerSpy = sinon.spy();
          var dfd = deferred();

          dfd.promise.then(handlerSpy);

          dfd.resolve();

          expect(handlerSpy.calledOnce).to.be(true);
        });
      });

      context('when resolved with a value', function () {
        it('should call the fulfillment handler', function () {
          var handlerSpy = sinon.spy();
          var dfd = deferred();

          dfd.promise.then(handlerSpy);

          dfd.resolve('This is what you\'ve been waiting for');

          expect(handlerSpy.withArgs('This is what you\'ve been waiting for').calledOnce).to.be(true);
        });
      });

      context('when rejected with a reason', function () {
        it('should call the failure handler with reason', function () {
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


  });

})();