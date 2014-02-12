/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format;

function Component(name) {
  var options = arguments[1] || {},
      validInit = (_.isFunction(options.initializer) || _.isString(options.initializer));

  if (_.isEmpty(name)) throw new Error('must specify component name');

  if (options.initializer && !validInit)
    throw new Error(fmt('Initializer for \'%s\' must be a function or string', name),
        options.name);

  _.extend(this, {
    name: name,
    scope: 'singleton',
    dependencies: []
  }, _.pick(options, 'initializer', 'scope', 'dependencies'));
}

_.extend(Component.prototype, {

  isSingleton: function () {
    return this.scope === 'singleton';
  },

  hasDependencies: function () {
    return !_.isEmpty(this.dependencies);
  },

  hasInitializer: function () {
    return !!this.initializer;
  }

});

module.exports = Component;