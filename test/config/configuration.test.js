/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

/*jshint nonew: false*/

(function () {
  'use strict';

  var context = describe;
  var expect = require('expect.js');

  var Configuration = require('../../lib/config');

  describe('Configuration', function () {
    context('when created with a kernel and options', function () {
      it('should set the name of the kernel if provided in options', function () {
        var mockKernel = {};

        new Configuration(mockKernel, {name: 'myKernel'});

        expect(mockKernel.name).to.be('myKernel');
      });
    });
  });

})();