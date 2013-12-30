/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var Kernel = require('../lib/kernel');

describe('Kernel', function () {

  context('when created with modules', function () {
    var kernel = new Kernel({
      modules: [
        function (registry) {
          registry.for('name').use('John Doe');
          registry.for('utils').requires('./lib/utils');
          registry.for('composer').requires('./test/fixtures/helloMessageComposer').dependsOn(['name', 'utils']);
          registry.for('message').use(function (deps) {
            return deps.composer.getMessage();
          }).dependsOn(['composer']).initializeWith(function () {
            return this.toLowerCase();
          });
        }
      ]
    });

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
        console.log(err);
        expect().fail();
      });
    });

  });

  context('when created without a name', function () {
    var kernel = new Kernel();

    it('should not have a name', function () {
      expect(kernel.name).not.to.be.ok();
    });

  });

  context('when created with a name', function () {
    var kernel =  new Kernel({name: 'test'});

    it('should have the specified name', function () {
      expect(kernel.name).to.be('test');
    });

  });
});