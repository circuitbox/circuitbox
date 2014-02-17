/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe,
    expect = require('chai').expect,
    fmt = require('../lib/utils').fmt,
    SimpleComponentDefinition = require('../lib/simpleComponentDefinition'),
    ComponentCreator = require('../lib/componentCreator');

describe('ComponentCreator', function () {
  /*jshint expr: true*/

  it('should return the dependencies passed to it', function () {
    var n = 'myComponent',
      deps = {
        fmt: fmt,
        location: 'home'
      },
      base = function (deps) {
        return deps.fmt.sprintf('This is my %s', deps.location);
      },
      d = new SimpleComponentDefinition(n, base, {
        dependencies: ['u', 'location']
      }),
      c = new ComponentCreator(d, deps);

    expect(c.dependencies).to.be.eql(deps);
  });

  it('provides a method #creationSequence() to build creation sequence that throws error by default', function () {
    var n = 'myComponent',
      base = 'This is my message',
      def = new SimpleComponentDefinition(n, base, {
        initializer: function () {
          expect(this).to.be.equal(base);     // initializer to be called in the scope of base
          return this.toLowerCase();
        }
      }),
      c = new ComponentCreator(def);

    expect(function () {
      c.creationSequence();
    }).to.throw('not implemented exception');

  });

  it('should throw an error if an attempt is made to #create()', function () {
    var n = 'myComponent',
      base = 'This is my message',
      d = new SimpleComponentDefinition(n, base, {
        initializer: function () {
          return this.toLowerCase();
        }
      }),
      c = new ComponentCreator(d);

    expect(function () {
      c.create(function () {});
    }).to.throw('not implemented exception');

  });

  context('#buildBase()', function () {

    it('returns a null component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = null,
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.null;
      });

    });

    it('returns a string component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = 'This is a string value',
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal(base);
      });

    });

    it('returns a number component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = 2344.34,
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal(base);
      });

    });

    it('returns a boolean component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = true,
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.true;
      });

    });

    it('returns a object component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = {name: 'John Doe', age: 21, male: true},
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal(base);
      });

    });

    it('returns an array component as-is to the specified callback', function () {
      var n = 'myComponent',
        base = [23, 54, 77, 2, 5],
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.eql(base);
      });

    });

    it('returns the return value of a sync function component after invoking it to the specified callback', function () {
      var n = 'myComponent',
        base = function () {
          return 'This is the result';
        },
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal('This is the result');
      });

    });

    it('returns the return value of a sync function component after invoking it with dependencies to the specified callback', function () {
      var n = 'myComponent',
        deps = {
          fmt: fmt,
          location: 'home'
        },
        base = function (deps) {
          return deps.fmt('This is my %s', deps.location);
        },
        d = new SimpleComponentDefinition(n, base, {
          dependencies: ['u', 'location']
        }),
        c = new ComponentCreator(d, deps);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal('This is my home');
      });

    });

    it('returns the return value of an async function component after invoking it to the specified callback', function (done) {
      var n = 'myComponent',
        base = function (deps, cb) {
          cb(null, 'This is the result');
        },
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal('This is the result');
        done();
      });

    });

    it('returns the return value of an async function component after invoking it with dependencies to the specified callback', function (done) {
      var n = 'myComponent',
        deps = {
          fmt: fmt,
          location: 'home'
        },
        base = function (deps, cb) {
          cb(null, deps.fmt('This is my %s', deps.location));
        },
        d = new SimpleComponentDefinition(n, base, { dependencies: ['u', 'location'] }),
        c = new ComponentCreator(d, deps);

      c.buildBase(base, function (err, r) {
        expect(err).to.be.null;
        expect(r).to.be.equal('This is my home');
        done();
      });

    });

    it('passes the error thrown by a sync function component after invoking it to the specified callback', function () {
      var n = 'myComponent',
        deps = {
          fmt: fmt,
          location: 'home'
        },
        base = function () {
          throw new Error('an intentional mistake');
        },
        d = new SimpleComponentDefinition(n, base, { dependencies: ['u', 'location'] }),
        c = new ComponentCreator(d, deps);

      c.buildBase(base, function (err) {
        expect(err.message).to.be.equal('an intentional mistake');
      });

    });

    it('passes the error sent by an async function component after invoking it to the specified callback', function (done) {
      var n = 'myComponent',
        deps = {
          fmt: fmt,
          location: 'home'
        },
        base = function (deps, cb) {
          cb(new Error('an intentional mistake'));
        },
        d = new SimpleComponentDefinition(n, base, { dependencies: ['u', 'location'] }),
        c = new ComponentCreator(d, deps);

      c.buildBase(base, function (err) {
        expect(err.message).to.be.equal('an intentional mistake');
        done();
      });

    });

  });

  context('#initialize()', function () {

    it('provides a default implementation of the initialize function', function () {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function () {
            expect(this).to.be.equal(base);     // initializer to be called in the scope of component
            return this.toLowerCase();
          }
        }),
        c = new ComponentCreator(d),
        izr = c.initialize;

      expect(izr).to.be.ok;
      expect(izr).to.be.a('function');
    });

    it('should call the specified sync initializer with this as the base', function () {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function () {
            expect(this).to.be.equal(base);     // initializer to be called in the scope of component
            return this.toLowerCase();
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal(base.toLowerCase());
      });
    });

    it('should call the specified sync initializer passing the dependencies and with this as the base', function () {
      var n = 'myComponent',
        base = 'This is my %s',
        deps = {
          location: 'home'
        },
        d = new SimpleComponentDefinition(n, base, {
          dependencies: ['location'],
          initializer: function (deps) {
            expect(deps.location).to.be.equal('home');
            expect(this).to.be.equal(base);     // initializer to be called in the scope of base value
            return fmt(this, deps.location).toLowerCase();
          }
        }),
        c = new ComponentCreator(d, deps);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal('this is my home'.toLowerCase());
      });
    });

    it('should call the specified async initializer with this as the base', function (done) {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function (deps, cb) {
            expect(this).to.be.equal(base);     // initializer to be called in the scope of base value
            cb(null, this.toLowerCase());
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal(base.toLowerCase());
        done();
      });
    });

    it('should call the specified async initializer passing the dependencies and with this as the base', function (done) {
      var n = 'myComponent',
        base = 'This is my %s',
        deps = {
          location: 'home'
        },
        d = new SimpleComponentDefinition(n, base, {
          dependencies: ['location'],
          initializer: function (deps, cb) {
            expect(deps.location).to.be.equal('home');
            expect(this).to.be.equal(base);     // initializer to be called in the scope of base value
            cb(null, fmt(this, deps.location).toLowerCase());
          }
        }),
        c = new ComponentCreator(d, deps);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal('this is my home'.toLowerCase());
        done();
      });
    });

    it('should return base value if sync initializer does not return any value', function () {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function () {
            return null;
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal(base);
      });
    });

    it('should return base value if async initializer does not return any value', function (done) {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function (deps, cb) {
            cb(null, null);
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal(base);
        done();
      });
    });

    it('should not invoke initializer if not specified and return base value', function (done) {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base),
        c = new ComponentCreator(d);

      c.initialize(base, function (err, r) {
        expect(r).to.be.equal(base);
        done();
      });
    });

    it('should invoke callback with error if sync initializer throws an error', function () {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function () {
            throw new Error('an intentional mistake');
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err) {
        expect(err.message).to.be.equal('an intentional mistake');
      });
    });

    it('should invoke callback with error if async initializer sends an error', function (done) {
      var n = 'myComponent',
        base = 'This is my message',
        d = new SimpleComponentDefinition(n, base, {
          initializer: function (deps, cb) {
            cb(new Error('an accidental mistake'));
          }
        }),
        c = new ComponentCreator(d);

      c.initialize(base, function (err) {
        expect(err.message).to.be.equal('an accidental mistake');
        done();
      });
    });

  });

});