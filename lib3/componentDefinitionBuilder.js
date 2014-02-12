/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
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
    if (!arguments.length)
      return self;
    if (arguments.length === 1 && _.isArray(arguments[0])) {
      options.dependencies = dependencies;
      return self;
    }
    if (arguments.length === 1 && _.isString(arguments[0])) {
      var list = _.chain(arguments[0].split(',')).reduce(function (result, item) {
        result.push(item.trim());
        return result;
      }, []).value();
      return self.dependsOn(list);
    }
    return self.dependsOn(_.toArray(arguments));
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