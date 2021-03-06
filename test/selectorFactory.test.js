/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var context = describe,
    expect = require('chai').expect,
    SelectorFactory = require('../lib/selectorFactory');

describe('SelectorFactory', function () {

  it('should detect if an expression contains a selector', function () {
    expect(SelectorFactory.hasSelector('a:b:c')).to.be.equal(true);
  });

  it('should detect if an expression does not contain a selector', function () {
    expect(SelectorFactory.hasSelector('a:')).to.be.equal(false);
  });

  it('should parse a selector expression and extract name, selector and pattern', function () {
    expect(SelectorFactory.parse('a:b:c')).to.be.eql({
      name: 'a',
      selector: 'b',
      pattern: 'c'
    });
  });

  it('should throw error if attempt made to parse an invalid selector expression', function () {
    expect(function () {
      SelectorFactory.parse('a:');
    }).to.throw('Expression "a:" is not a valid selector expression');
  });

  it('should throw error if attempt made to parse an invalid selector expression', function () {
    expect(function () {
      SelectorFactory.parse('a:');
    }).to.throw('Expression "a:" is not a valid selector expression');
  });

  context('registering selectors', function () {

    afterEach(function () {
      SelectorFactory._reset();
    });

    it('should register a specified selector function with the specified name', function () {
      var selectorName = 'b',
          selectorFn = function (pat, cd) { /* jshint unused: false */ };

      expect(function () {
        SelectorFactory.registerSelector(selectorName, selectorFn);
      }).not.to.throw();
      
    });
    
    it('should throw error if a selector with specified name is already registered', function () {
      var selectorName = 'b',
          selectorFn = function (pat, cd) { /* jshint unused: false */ };
      
      SelectorFactory.registerSelector(selectorName, selectorFn);
      
      expect(function () {
        SelectorFactory.registerSelector(selectorName, selectorFn);
      }).to.throw('Selector already registered with name "b"');
      
    });

    it('should throw error if a selector function does not accept 2 parameters', function () {
      var selectorName = 'b',
          selectorFn = function () {};
      
      expect(function () {
        SelectorFactory.registerSelector(selectorName, selectorFn);
      }).to.throw('Specified selector function does not accept 2 parameters, "pattern" and "componentDefinition"');
      
    });

    it('should parse and return selector for specified expression which takes componentDefinition as parameter', function () {
      var selectorExpr = 'values:foo:1-10',
          dummyComponentDefinition = { name: 'watchamacallit' },
          selector;

      SelectorFactory.registerSelector('foo', function (pat, cd) {
        expect(pat).to.be.equal('1-10');
        expect(cd).to.be.equal(dummyComponentDefinition);
      });

      // get the selector for an expression
      selector = SelectorFactory.selectorFor(selectorExpr);

      expect(selector).to.be.a('function');
      
      // invoke the selector with a dummy component definition
      selector(dummyComponentDefinition);
      
    });

    it('should return selector for specified expression object which takes componentDefinition as parameter', function () {
      var selectorExpr = {
            name: 'values',
            selector: 'foo',
            pattern: '1-10'
          },
          dummyComponentDefinition = { name: 'watchamacallit' },
          selector;

      SelectorFactory.registerSelector('foo', function (pat, cd) {
        expect(pat).to.be.equal('1-10');
        expect(cd).to.be.equal(dummyComponentDefinition);
      });

      // get the selector for an expression
      selector = SelectorFactory.selectorFor(selectorExpr);

      expect(selector).to.be.a('function');

      // invoke the selector with a dummy component definition
      selector(dummyComponentDefinition);

    });

    it('should throw error if no selectors are registered for the specified selector expression', function () {
      expect(function () {
        SelectorFactory.selectorFor('values:foo:1-10');
      }).to.throw('No selector registered with name "foo"');
    });

    it('should throw error the specified selector expression object is not valid', function () {
      expect(function () {
        SelectorFactory.selectorFor({});
      }).to.throw('Not a valid selector expression object');
    });

    it('should throw error if no selectors are registered for the specified selector expression object', function () {
      expect(function () {
        SelectorFactory.selectorFor({
          name: 'values',
          selector: 'foo',
          pattern: '1-10'
        });
      }).to.throw('No selector registered with name "foo"');
    });
    
  });
  
});
