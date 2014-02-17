/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format,
    cMap = {};

function ComponentCreatorFactory() {}

/**
 * Returns an instance of a ComponentCreator for the specified component
 * which optionally injects the specified dependencies
 *
 * @param component {ComponentDefinition} the component for which a creator is required
 * @param dependencies {Array} an optional list of dependencies which the creator must inject
 * @returns {ComponentCreator} a new instance of a ComponentCreator registered for the specified ComponentDefinition type
 */
ComponentCreatorFactory.prototype.creatorFor = function (component, dependencies) {
  /*jshint newcap: false*/
  var cType = component.constructor.name,
      cc = cMap[cType];

  if (!cc) throw new Error(fmt('no registered ComponentCreator for component type %s', cType));

  return new cc(component, (dependencies || {}));
};

_.extend(ComponentCreatorFactory, {

  /**
   * Registers the specified ComponentCreator for the specified ComponentDefinition
   *
   * @param componentType the ComponentDefinition type to which the specified ComponentCreator is to be associated
   * @param creator the ComponentCreator type which is to be associated with the specified ComponentDefinition
   */
  registerCreator: function (componentType, creator) {
    var typeName = componentType.name;

    if (cMap[typeName]) throw new Error(fmt('builder already registered for method %s', typeName));

    cMap[typeName] = creator;
  },

  _reset: function () {
    cMap = {};
  }

});

module.exports = ComponentCreatorFactory;