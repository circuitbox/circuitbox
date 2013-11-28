/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var ComponentDefinition = require('../componentDefinition');

  function ComponentDefinitionBuilder(name) {
    var self = this;
    self.options = {
      name: name
    };

    self.initializeWith = function initializeWith(initializer) {
      self.options.initializer = initializer;
      return self;
    };

    self.dependsOn = function dependsOn(dependencies) {
      self.options.dependencies = dependencies;
      return self;
    };

    self.scope = function scopeWith(scope) {
      self.options.scope = scope;
      return self;
    };

    self.done = function buildDefinition() {
      return new ComponentDefinition(self.options);
    };
  }

  module.exports = ComponentDefinitionBuilder;

})();