/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    fmt = require('util').format,
    creatorMap = {};

function ComponentCreatorFactory() {}

ComponentCreatorFactory.prototype.creatorFor = function (component, dependencies) {
  var defType = component.constructor.name;
  return new (creatorMap[defType])(component, (dependencies || {}));
};

_.extend(ComponentCreatorFactory, {

  registerCreator: function (componentType, creator) {
    var typeName = componentType.name;
    if (creatorMap[typeName]) throw new Error(fmt('builder already registered for method %s', typeName));
    creatorMap[typeName] = creator;
  },

  _reset: function () {
    creatorMap = {};
  }

});

module.exports = ComponentCreatorFactory;