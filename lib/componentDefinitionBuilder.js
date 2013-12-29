/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var ComponentDefinition = require('./componentDefinition');

function ComponentDefinitionBuilder(name) {
  var self = this;

  var options = { name: name };

  Object.defineProperty(self, 'options', {
    get: function getOptions() {
      return options;
    }
  });

  self.initializeWith = function initializeWith(initializer) {
    options.initializer = initializer;
    return self;
  };

  self.dependsOn = function dependsOn(dependencies) {
    options.dependencies = dependencies;
    return self;
  };

  self.scope = function scopeWith(scope) {
    options.scope = scope;
    return self;
  };

  self.build = function buildDefinition() {
    return new ComponentDefinition(options);
  };
}

module.exports = ComponentDefinitionBuilder;