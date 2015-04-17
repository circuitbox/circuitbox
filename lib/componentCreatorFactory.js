/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash'),
    fmt = require('./utils').fmt,
    cMap = {};

function ComponentCreatorFactory() {}

/**
 * Returns an instance of a ComponentCreatorFactory for the specified componentDefinition
 * which optionally injects the specified dependencies
 *
 * @param componentDefinition {ComponentDefinition} the componentDefinition for which a creator is required
 * @param dependencies {Array} an optional list of dependencies which the creator must inject
 * @returns {ComponentCreator} a new instance of a ComponentCreator registered for the specified ComponentDefinition type
 */
ComponentCreatorFactory.prototype.creatorFor = function (componentDefinition, dependencies) {
  /*jshint newcap: false*/
  var cType = componentDefinition.constructor.name,
      cc = cMap[cType];

  if (!cc) throw new Error(fmt('no registered ComponentCreator for component type %s', cType));

  return new cc(componentDefinition, (dependencies || {}));
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
