/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
    'use strict';

    var _ = require('lodash');

    module.exports = function (options) {
        var self = this,
            _components = {
                registry: self
            },
            _name;

        if (options) {
            _name = options.name;
        }

        self.hasComponents = function () {
            return _.isEmpty(_components);
        };

        self.get = function (componentName) {
            return _components[componentName];
        };

        self.name = function () {
            return _name;
        };
    };
})();