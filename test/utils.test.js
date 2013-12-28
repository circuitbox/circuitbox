/*!
 * circuitbox
 * Copyright (c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT License
 */

'use strict';

var expect = require('expect.js');
var utils = require('../lib/utils');

describe('Utilities', function () {

  describe('#sprintf()', function () {

    it('should return text without any placeholders', function () {
      expect(utils.sprintf('This is a message')).to.be('This is a message');
    });

    it('should return text after replacing placeholders with specified values', function () {
      expect(utils.sprintf('This is a message to %s', 'God')).to.be('This is a message to God');
      expect(utils.sprintf('I have $%d worth money in my %s', 34.3, 'pocket')).to.be('I have $34.3 worth money in my pocket');
      expect(utils.sprintf('The task is %d% complete', 40)).to.be('The task is 40% complete');
      expect(utils.sprintf('The object\'s value is %j', {name: 'John Doe', age: 32})).to.be('The object\'s value is {"name":"John Doe","age":32}');
    });

  });

  describe('#enumFor()', function () {
    it('should return an object with the specified constants with values starting from 1', function () {
      var testEnum = utils.enumFor('a', 'b', 'c');

      expect(testEnum.a).to.be(1);
      expect(testEnum.b).to.be(2);
      expect(testEnum.c).to.be(3);

    });
  });

});