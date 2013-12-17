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

  });
})();