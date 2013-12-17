/*! 
 * circuitbox
 * Copyright (c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT License
 */

(function () {
  'use strict';

  var expect = require('expect.js');
  var utils = require('../lib/utils');

  describe('Utilities', function () {

    describe('#isString()', function () {
      it('should return true if a string is passed', function () {
        expect(utils.isString('This is a string')).to.be(true);
      });

      it('should return true if an empty string is passed', function () {
        expect(utils.isString('')).to.be(true);
      });

      it('should return false if an integer is passed', function () {
        expect(utils.isString(3432)).to.be(false);
      });

      it('should return false if a float is passed', function () {
        expect(utils.isString(3432.34)).to.be(false);
      });

      it('should return false if zero is passed', function () {
        expect(utils.isString(0)).to.be(false);
      });

      it('should return false if null is passed', function () {
        expect(utils.isString(null)).to.be(false);
      });

      it('should return false if boolean is passed', function () {
        expect(utils.isString(true)).to.be(false);
      });

      it('should return false if an empty array is passed', function () {
        expect(utils.isString([])).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isString(['a', 1, null])).to.be(false);
      });

      it('should return false if an empty object is passed', function () {
        expect(utils.isString({})).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isString({name: 'John Doe', age: 31})).to.be(false);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isString(undefined)).to.be(false);
      });

      it('should return false if function is passed', function () {
        expect(utils.isString(function () {})).to.be(false);
      });

    });

    describe('#isNumber()', function () {
      it('should return false if a string is passed', function () {
        expect(utils.isNumber('This is a string')).to.be(false);
      });

      it('should return false if an empty string is passed', function () {
        expect(utils.isNumber('')).to.be(false);
      });

      it('should return true if an integer is passed', function () {
        expect(utils.isNumber(3432)).to.be(true);
      });

      it('should return true if a float is passed', function () {
        expect(utils.isNumber(3432.34)).to.be(true);
      });

      it('should return true if zero is passed', function () {
        expect(utils.isNumber(0)).to.be(true);
      });

      it('should return false if null is passed', function () {
        expect(utils.isNumber(null)).to.be(false);
      });

      it('should return false if boolean is passed', function () {
        expect(utils.isNumber(true)).to.be(false);
      });

      it('should return false if an empty array is passed', function () {
        expect(utils.isNumber([])).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isNumber(['a', 1, null])).to.be(false);
      });

      it('should return false if an empty object is passed', function () {
        expect(utils.isNumber({})).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isNumber({name: 'John Doe', age: 31})).to.be(false);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isNumber(undefined)).to.be(false);
      });

      it('should return false if function is passed', function () {
        expect(utils.isNumber(function () {})).to.be(false);
      });

    });

    describe('#isBoolean()', function () {
      it('should return false if a string is passed', function () {
        expect(utils.isBoolean('This is a string')).to.be(false);
      });

      it('should return false if an empty string is passed', function () {
        expect(utils.isBoolean('')).to.be(false);
      });

      it('should return false if an integer is passed', function () {
        expect(utils.isBoolean(3432)).to.be(false);
      });

      it('should return false if a float is passed', function () {
        expect(utils.isBoolean(3432.34)).to.be(false);
      });

      it('should return false if zero is passed', function () {
        expect(utils.isBoolean(0)).to.be(false);
      });

      it('should return false if null is passed', function () {
        expect(utils.isBoolean(null)).to.be(false);
      });

      it('should return true if true is passed', function () {
        expect(utils.isBoolean(true)).to.be(true);
      });

      it('should return true if false is passed', function () {
        expect(utils.isBoolean(false)).to.be(true);
      });

      it('should return false if an empty array is passed', function () {
        expect(utils.isBoolean([])).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isBoolean(['a', 1, null])).to.be(false);
      });

      it('should return false if an empty object is passed', function () {
        expect(utils.isBoolean({})).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isBoolean({name: 'John Doe', age: 31})).to.be(false);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isBoolean(undefined)).to.be(false);
      });

      it('should return false if function is passed', function () {
        expect(utils.isBoolean(function () {})).to.be(false);
      });

    });

    describe('#isObject()', function () {
      it('should return false if a string is passed', function () {
        expect(utils.isObject('This is a string')).to.be(false);
      });

      it('should return false if an empty string is passed', function () {
        expect(utils.isObject('')).to.be(false);
      });

      it('should return false if an integer is passed', function () {
        expect(utils.isObject(3432)).to.be(false);
      });

      it('should return false if a float is passed', function () {
        expect(utils.isObject(3432.34)).to.be(false);
      });

      it('should return false if zero is passed', function () {
        expect(utils.isObject(0)).to.be(false);
      });

      it('should return true if null is passed', function () {
        expect(utils.isObject(null)).to.be(true);
      });

      it('should return false if boolean is passed', function () {
        expect(utils.isObject(true)).to.be(false);
      });

      it('should return false if an empty array is passed', function () {
        expect(utils.isObject([])).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isObject(['a', 1, null])).to.be(false);
      });

      it('should return true if an empty object is passed', function () {
        expect(utils.isObject({})).to.be(true);
      });

      it('should return true if a non-empty object is passed', function () {
        expect(utils.isObject({name: 'John Doe', age: 31})).to.be(true);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isObject(undefined)).to.be(false);
      });

      it('should return false if function is passed', function () {
        expect(utils.isObject(function () {})).to.be(false);
      });

    });

    describe('#isArray()', function () {
      it('should return false if a string is passed', function () {
        expect(utils.isArray('This is a string')).to.be(false);
      });

      it('should return false if an empty string is passed', function () {
        expect(utils.isArray('')).to.be(false);
      });

      it('should return false if an integer is passed', function () {
        expect(utils.isArray(3432)).to.be(false);
      });

      it('should return false if a float is passed', function () {
        expect(utils.isArray(3432.34)).to.be(false);
      });

      it('should return false if zero is passed', function () {
        expect(utils.isArray(0)).to.be(false);
      });

      it('should return false if null is passed', function () {
        expect(utils.isArray(null)).to.be(false);
      });

      it('should return false if boolean is passed', function () {
        expect(utils.isArray(true)).to.be(false);
      });

      it('should return true if an empty array is passed', function () {
        expect(utils.isArray([])).to.be(true);
      });

      it('should return true if a non-empty array is passed', function () {
        expect(utils.isArray(['a', 1, null])).to.be(true);
      });

      it('should return false if an empty object is passed', function () {
        expect(utils.isArray({})).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isArray({name: 'John Doe', age: 31})).to.be(false);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isArray(undefined)).to.be(false);
      });

      it('should return false if function is passed', function () {
        expect(utils.isArray(function () {})).to.be(false);
      });

    });

    describe('#isFunction()', function () {
      it('should return false if a string is passed', function () {
        expect(utils.isFunction('This is a string')).to.be(false);
      });

      it('should return false if an empty string is passed', function () {
        expect(utils.isFunction('')).to.be(false);
      });

      it('should return false if an integer is passed', function () {
        expect(utils.isFunction(3432)).to.be(false);
      });

      it('should return false if a float is passed', function () {
        expect(utils.isFunction(3432.34)).to.be(false);
      });

      it('should return false if zero is passed', function () {
        expect(utils.isFunction(0)).to.be(false);
      });

      it('should return false if null is passed', function () {
        expect(utils.isFunction(null)).to.be(false);
      });

      it('should return false if boolean is passed', function () {
        expect(utils.isFunction(true)).to.be(false);
      });

      it('should return false if an empty array is passed', function () {
        expect(utils.isFunction([])).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isFunction(['a', 1, null])).to.be(false);
      });

      it('should return false if an empty object is passed', function () {
        expect(utils.isFunction({})).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isFunction({name: 'John Doe', age: 31})).to.be(false);
      });

      it('should return false if undefined is passed', function () {
        expect(utils.isFunction(undefined)).to.be(false);
      });

      it('should return true if function is passed', function () {
        expect(utils.isFunction(function () {})).to.be(true);
      });

    });
    

    describe('#isEmpty()', function () {

      it('should return true if an empty string is passed', function () {
        expect(utils.isEmpty('')).to.be(true);
      });

      it('should return true if an empty array is passed', function () {
        expect(utils.isEmpty([])).to.be(true);
      });

      it('should return true if an empty object is passed', function () {
        expect(utils.isEmpty({})).to.be(true);
      });

      it('should return true if null is passed', function () {
        expect(utils.isEmpty(null)).to.be(true);
      });

      it('should return true if undefined is passed', function () {
        expect(utils.isEmpty(undefined)).to.be(true);
      });

      it('should return false if true is passed', function () {
        expect(utils.isEmpty(true)).to.be(false);
      });

      it('should return true if false is passed', function () {
        expect(utils.isEmpty(false)).to.be(true);
      });

      it('should return false if a non-empty string is passed', function () {
        expect(utils.isEmpty('This is a string')).to.be(false);
      });

      it('should return false if a non-empty array is passed', function () {
        expect(utils.isEmpty(['John', 23, null])).to.be(false);
      });

      it('should return false if a non-empty object is passed', function () {
        expect(utils.isEmpty({name: 'John Doe', age: 10})).to.be(false);
      });

    });

    describe('#keys()', function () {

      it('should return an array of all the keys in the specified object', function () {
        expect(utils.keys({name: 'John Doe', age: 32})).to.be.eql(['name', 'age']);
      });

      it('should return an empty array if specified object is empty', function () {
        expect(utils.keys({})).to.be.empty();
      });

      it('should return an empty array if a non-object is specified', function () {
        expect(utils.keys([])).to.be.empty();
        expect(utils.keys(['abc', 343])).to.be.empty();
        expect(utils.keys('A string value')).to.be.empty();
        expect(utils.keys(3422)).to.be.empty();
        expect(utils.keys(true)).to.be.empty();
        expect(utils.keys(null)).to.be.empty();
        expect(utils.keys(undefined)).to.be.empty();
      });

    });

    describe('#values()', function () {

      it('should return an array of all the values in the specified object', function () {
        var aliveFn = function () {};
        expect(utils.values({name: 'John Doe', age: 32, account: null, isAlive: aliveFn})).to.be.eql(['John Doe', 32, null, aliveFn]);
      });

      it('should return an empty array if the specified object is empty', function () {
        expect(utils.values({})).to.be.empty();
      });

      it('should return an array of all the values in the specified array', function () {
        var aliveFn = function () {};
        expect(utils.values(['John Doe', 32, null, aliveFn])).to.be.eql(['John Doe', 32, null, aliveFn]);
      });

      it('should return an empty array if the specified array is empty', function () {
        expect(utils.values([])).to.be.empty();
      });

      it('should return an array with the specified string as the only item', function () {
        expect(utils.values('A string value')).to.be.eql(['A string value']);
      });

      it('should return an array with the specified number as the only item', function () {
        expect(utils.values(3422)).to.be.eql([3422]);
      });

      it('should return an array with the specified boolean as the only item', function () {
        expect(utils.values(true)).to.be.eql([true]);
      });

      it('should return an array with the specified function as the only item', function () {
        var aliveFn = function () {};
        expect(utils.values(aliveFn)).to.be.eql([aliveFn]);
      });

      it('should return an empty array if null or undefined is specified', function () {
        expect(utils.values(null)).to.be.empty();
        expect(utils.values(undefined)).to.be.empty();
      });

    });

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

  });
})();