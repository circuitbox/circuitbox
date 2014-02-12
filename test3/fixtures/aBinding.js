'use strict';

var expect = require('expect.js');

module.exports = function aBinding(binder) {
  expect(binder).to.be(require('.././binder'));
};