/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var ComponentDefinition = require('./componentDefinition');

  function ComponentDefinitionBuilder(name) {
    var self = this;

    var _options = {
      name: name
    };

    Object.defineProperty(self, 'options', {
      get: function getOptions() {
        return _options;
      }
    });

    self.initializeWith = function initializeWith(initializer) {
      _options.initializer = initializer;
      return self;
    };

    self.dependsOn = function dependsOn(dependencies) {
      _options.dependencies = dependencies;
      return self;
    };

    self.scope = function scopeWith(scope) {
      _options.scope = scope;
      return self;
    };

    self.build = function buildDefinition() {
      return new ComponentDefinition(_options);
    };
  }

  module.exports = ComponentDefinitionBuilder;

})();