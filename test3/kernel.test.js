/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

 /*jshint newcap:false */

'use strict';

var EventEmitter = require('events').EventEmitter;

var context = describe;
var expect = require('expect.js');
var async = require('async');

var Scopes = require('./scopes');
var Kernel = require('./kernel');

describe('Kernel', function () {

  context('when created with modules', function () {
    Kernel({
      modules: [
        function (registry) {
          registry.for('name').use('John Doe');
          registry.for('utils').requires('./lib3/utils');
          registry.for('composer').requires('./test3/fixtures/helloMessageComposer').dependsOn(['name', 'utils']);
          registry.for('message').use(function (deps) {
            return deps.composer.getMessage();
          }).dependsOn(['composer']).initializeWith(function () {
            return this.toLowerCase();
          });
          registry.for('randomNumber').use(function () {
            return Math.random();
          }).scope(Scopes.singleton);
        }
      ]
    }, function (err, kernel) {
      it('should be empty', function () {
        expect(kernel.hasComponents).to.be(true);
      });

      it('should return the component to the specified callback', function (done) {
        kernel.get('message', function (err, message) {
          expect(err).to.be(null);
          expect(message).to.be('hello world! this is john doe');
          done();
        });
      });

      it('should return the promise to provide the component to the specified handler', function (done) {
        kernel.get('message').done(function (message) {
          expect(message).to.be('hello world! this is john doe');
          done();
        }, function (err) {
          done(err);
        });
      });

      it('should return the same singleton component to the specified handler on multiple requests', function (done) {

        async.parallel([
          function (asyncCallback) {
            kernel.get('randomNumber').done(function (firstRandomNumber) {
              asyncCallback(null, firstRandomNumber);
            }, function (err) {
              done(err);
            });
          },
          function (asyncCallback) {
            kernel.get('randomNumber').done(function (nextRandomNumber) {
              asyncCallback(null, nextRandomNumber);
            }, function (err) {
              done(err);
            });
          }
        ], function (err, results) {
          if (err) {
            done(err);
            return;
          }
          expect(results[0]).to.be(results[1]);
          done();
        });

      });

      it('should register events.EventEmitter as bus component', function () {
        kernel.get('bus').done(function (bus) {
          expect(bus).to.be.an(EventEmitter);
        });
      });
      
    });
  });

  context('when created without a name', function () {
    it('should not have a name', function () {
      Kernel().done(function (kernel) {
          expect(kernel.name).not.to.be.ok();
        });
    });
  });

  context('when created with a name', function () {
    it('should have the specified name', function () {
      Kernel({name: 'test'}, function (err, kernel) {
        expect(kernel.name).to.be('test');
      });
    });
  });
});