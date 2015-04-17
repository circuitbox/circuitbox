/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    fmt = require('./utils').fmt;

function ComponentDefinition(name) {
  var opts = arguments[1] || {},
      validIzr = (_.isFunction(opts.initializer) || _.isString(opts.initializer));

  if (_.isEmpty(name)) throw new Error('must specify component name');

  if (opts.initializer && !validIzr)
    throw new Error(fmt('Initializer for \'%s\' must be a function or string', name), opts.name);

  _.extend(this, {
    name: name,
    scope: 'singleton',
    dependencies: []
  }, _.pick(opts, 'initializer', 'scope', 'dependencies'));
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
