/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format;

function ComponentDefinition(name) {
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

_.extend(ComponentDefinition.prototype, {

  /**
   * Returns whether or not this component is scoped as a singleton
   *
   * @returns {boolean} <code>true</code> if component is scoped as a singleton; <code>false</code> otherwise
   */
  isSingleton: function () {
    return this.scope === 'singleton';
  },

  /**
   * Returns whether or not this component has any dependencies
   *
   * @returns {boolean} <code>true</code> if component has dependencies; <code>false</code> otherwise
   */
  hasDependencies: function () {
    return !_.isEmpty(this.dependencies);
  },

  /**
   * Returns whether or not this component has an initializer
   *
   * @returns {boolean} <code>true</code> if component has an initializer; <code>false</code> otherwise
   */
  hasInitializer: function () {
    return !!this.initializer;
  }

});

module.exports = ComponentDefinition;