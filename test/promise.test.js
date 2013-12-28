/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('expect.js');

var promise = require('../lib/promise');

describe('Promise', function () {

  it('should register a completion handler and return promise instance', function () {
    var handlerBag = {};

    var p = promise(handlerBag);
    var completionHandler = function () {};

    expect(p.done(completionHandler)).to.be(p);
    expect(handlerBag.thenHandler).to.be(completionHandler);
  });

  it('should not register a completion handler if its not a function', function () {
    var p = promise({});

    expect(function () {
      p.done({});
    }).to.throwError();

  });

  it('should register a failure handler and return promise instance', function () {
    var handlerBag = {};

    var p = promise(handlerBag);

    var failHandler = function (err) {
      err.toString();
    };

    expect(p.fail(failHandler)).to.be(p);
    expect(handlerBag.failHandler).to.be(failHandler);
  });

  it('should not register a failure handler if its not a function', function () {
    var p = promise({});

    expect(function () {
      p.fail({});
    }).to.throwError();

  });

});