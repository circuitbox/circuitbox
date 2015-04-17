/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    ComponentDefinition = require('./componentDefinition');

/**
 * Creates a new instance of a <code>ComponentDefinitionBuilder</code> which
 * provides a chainable fluent-api to create <code>ComponentDefinition<code> definitions
 *
 * @param name  the name of the <code>ComponentDefinition</code>
 *
 * @constructor
 */
function ComponentDefinitionBuilder(name) {
  _.extend(this, {
    name: name,
    options: {}
  });
}

_.extend(ComponentDefinitionBuilder.prototype, {

  /**
   * Allows you to specify the component's scope
   *
   * @param scope {String} a string that represents the scope of this component
   *
   * @returns {ComponentDefinitionBuilder} current instance of <code>ComponentDefinitionBuilder</code>
   */
  scopedAs: function (scope) {
    this.options.scope = scope;
    return this;
  },

  /**
   * Allows you to specify the component's initializer.
   *
   * <p>If initializer is specified as a <code>string</code>, it must be a function
   * on the component that is created.</p>
   *
   * <p>Initializers are always invoked in the context of the component.</p>
   *
   * <p>The return value of an initializer function is what will be used to inject into dependent components.</p>
   *
   * @param initializer {Function|String} the initializer function to be used to initialize the component
   *
   * @returns {ComponentDefinitionBuilder} current instance of <code>ComponentDefinitionBuilder</code>.
   */
  initializeWith: function (initializer) {
    this.options.initializer = initializer;
    return this;
  },

  /**
   * Allows you to specify the component's dependencies.
   *
   * @param dependencies {*} names of one or more dependencies. Can be specified as an <code>array</code>, list of
   *                         <code>string</code>s or as a comma separated <code>string</code>
   *
   * @returns {ComponentDefinitionBuilder} current instance of <code>ComponentDefinitionBuilder</code>.
   */
  dependsOn: function (dependencies) {
    var a = arguments;

    if (!a.length) return this;

    if (a.length === 1 && _.isArray(dependencies)) {
      this.options.dependencies = dependencies;
      return this;
    }

    if (a.length === 1 && _.isString(dependencies)) {
      var lst = _.chain(dependencies.split(',')).reduce(function (r, i) {
        r.push(i.trim());
        return r;
      }, []).value();

      return this.dependsOn(lst);
    }

    return this.dependsOn(_.toArray(a));
  },

  /**
   * Returns a new instance of <code>ComponentDefinition</code> with the specified
   * name, scope, initializer and dependencies
   *
   * @returns {ComponentDefinition} a new instance of <code>ComponentDefinition</code>
   */
  build: function () {
    return new ComponentDefinition(this.name, this.options);
  }

});

module.exports = ComponentDefinitionBuilder;
