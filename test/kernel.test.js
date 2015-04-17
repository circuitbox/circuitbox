/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    context = describe,
    expect = require('chai').expect,
    sinon = require('sinon'),
    Kernel = require('../lib/kernel'),
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    ComponentDefinitionBuilderFactory = require('../lib/componentDefinitionBuilderFactory'),
    SimpleComponentDefinitionBuilder = require('../lib/simpleComponentDefinitionBuilder'),
    SimpleComponentCreator = require('../lib/simpleComponentCreator'),
    ComponentCreatorFactory = require('../lib/componentCreatorFactory'),
    SingletonScopeHandler = require('../lib/singletonScopeHandler'),
    ScopeHandlerFactory = require('../lib/scopeHandlerFactory'),
    EventEmitter = require('events').EventEmitter;

describe('Kernel', function () {
  /*jshint newcap: false*/
  /*jshint expr: true*/

  beforeEach(function () {
    ComponentDefinitionBuilderFactory.registerBuilder('use', SimpleComponentDefinitionBuilder);
    ComponentCreatorFactory.registerCreator(SimpleComponentDefinition, SimpleComponentCreator);
    ScopeHandlerFactory.registerScopeHandler('singleton', SingletonScopeHandler);
  });

  afterEach(function () {
    _.each([
      ComponentDefinitionBuilderFactory,
      ComponentCreatorFactory,
      ScopeHandlerFactory
    ], function (f) {
      f._reset();
    });
  });

  it('should invoke callback once created', function () {
    var cb = sinon.spy();

    Kernel('myKernel', cb);

    expect(cb.calledOnce).to.be.true;
  });

  it('should return promise and fulfill it when created', function () {
    Kernel('myKernel').then(function (k) {
      expect(k.name).to.be.equal('myKernel');
    });
  });

  it('should be creatable with a name', function () {
    Kernel('myKernel', function (err, k) {
      expect(k.name).to.be.equal('myKernel');
    });
  });

  it('should register the specified component modules at creation time and invoke callback', function (done) {
    var modA = sinon.spy(),
        modB = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, modB]
    }, function () {
      expect(modA.calledOnce).to.be.true;
      expect(modB.calledOnce).to.be.true;
      done();
    });
  });

  it('should invoke callback with error if any of the specified component modules throws error', function (done) {
    var modA = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, function () {
        throw new Error('intentional mistake');
      }]
    }, function (err) {
      expect(modA.calledOnce).to.be.true;

      expect(err.message).to.be.equal('intentional mistake');

      done();
    });
  });

  it('should promise to register the specified component modules at creation time and fulfill promise with kernel instance', function (done) {
    var modA = sinon.spy(),
        modB = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, modB]
    }).then(function () {
      expect(modA.calledOnce).to.be.true;
      expect(modB.calledOnce).to.be.true;
      done();
    });
  });

  it('should promise to register the specified component modules at creation time and reject the promise if a module throws error', function (done) {
    var modA = sinon.spy();

    Kernel('myKernel', {
      modules: [modA, function () {
        throw new Error('intentional mistake');
      }]
    }).then(function () {}, function (err) {
      expect(modA.calledOnce).to.be.true;

      expect(err.message).to.be.equal('intentional mistake');

      done();
    });
  });

  context('when a component is required', function () {

    it('should invoke the specified callback with the component when requested', function (done) {
      var n = 'message',
          v = 'The quick brown fox jumped over the lazy dog';

      Kernel('myKernel', {
        modules: [
          function (r) {
            r.for(n).use(v);
          }
        ]
      }).then(function (k) {
        k.get(n, function (err, r) {
          expect(r).to.be.equal(v);
          done();
        });
      });

    });

    it('should invoke the specified callback with an error when requested component creation throws error', function (done) {
      var n = 'message';

      Kernel('myKernel', {
        modules: [
          function (r) {
            r.for(n).use(function () {
              throw new Error('intentional mistake');
            });
          }
        ]
      }).then(function (k) {
        k.get(n, function (err) {
          expect(err.message).to.be.equal('intentional mistake');
          done();
        });
      });

    });

    it('should invoke the specified callback with an error when requested component is not registered', function (done) {
      Kernel('myKernel').then(function (k) {
        k.get('message', function (err) {
          expect(err.message).to.be.equal('No definition found for component \'message\'');
          done();
        });
      });

    });

    it('should promise to provide a component when requested and fulfill it', function (done) {
      var n = 'message',
          v = 'The quick brown fox jumped over the lazy dog';

      Kernel('myKernel', {
        modules: [
          function (r) {
            r.for(n).use(v);
          }
        ]
      }).then(function (k) {
        k.get(n).then(function (r) {
          expect(r).to.be.equal(v);
          done();
        });
      });
    });

    it('should promise to provide a component when requested and reject it if component creation fails', function (done) {
      var n = 'message';

      Kernel('myKernel', {
        modules: [
          function (r) {
            r.for(n).use(function () {
              throw new Error('intentional mistake');
            });
          }
        ]
      }).then(function (k) {
        k.get(n).then(function () {}, function (err) {
          expect(err.message).to.be.equal('intentional mistake');
          done();
        });
      });
    });

    it('should load CoreModule at the time of creation even if no modules are specified', function (done) {
      Kernel('myKernel').then(function (k) {
        k.get('bus').then(function (bus) {
          expect(bus).to.be.an.instanceof(EventEmitter);
          done();
        });
      });
    });

  });

});
