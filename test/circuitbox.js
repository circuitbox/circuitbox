/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
    'use strict';

    var context = describe,
        expect = require('expect.js'),
        ComponentFactory = require('../lib/circuitbox');

    describe('circuitbox', function () {

        context('when created', function () {
            var registry = new ComponentFactory();

            it('should not be empty', function () {
                expect(registry.hasComponents()).to.be(false);
            });

            it('should have itself registered', function () {
                expect(registry.get('registry')).to.be(registry);
            });

        });

        context('when created without a name', function () {
            var registry = new ComponentFactory();

            it('should not have a name', function () {
                expect(registry.name()).not.to.be.ok();
            });

        });

        context('when created with a name', function () {
            var registry = new ComponentFactory({name: 'test'});

            it('should have the specified name', function () {
                expect(registry.name()).to.be('test');
            });

        });
    });
})();