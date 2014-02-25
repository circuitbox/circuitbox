/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var expect = require('chai').expect;

module.exports = function aBinding(binder) {
  expect(binder).to.be.equal(require('../../lib/binder'));
};