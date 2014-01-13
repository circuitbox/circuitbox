/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var kernel = require('./kernel');

// core API exports
exports.Scopes = require('./scopes');

exports.ComponentCreationError = require('./componentCreationError');
exports.ComponentDefinitionError = require('./componentDefinitionError');
exports.NoSuchComponentDefinitionError = require('./noSuchComponentDefinitionError');

exports.create = function create() {
  var options = arguments[0] || {};
  var callback = arguments[1];
  return kernel(options, callback);
};

// extension points exports
exports.ComponentDefinition = require('./componentDefinition');
exports.SimpleComponentDefintion = require('./simpleComponentDefinition');
exports.ModuleBasedComponentDefinition = require('./moduleBasedComponentDefinition');

exports.ComponentAssemblyStrategy = require('./componentAssemblyStrategy');
exports.SimpleComponentAssemblyStrategy = require('./simpleComponentAssemblyStrategy');
exports.ModuleBasedComponentAssemblyStrategy = require('./moduleBasedComponentAssemblyStrategy');