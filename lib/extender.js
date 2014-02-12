/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');

var utils = require('./utils');
var binder = require('./binder');
var basicBinding = require('./basicBinding');

var pathRegEx = /\//;

function prefixAndLoad(binding) {
  binding = utils.normalizeModulePath(binding);
  binding = pathRegEx.test(binding) ? binding : ('circuitbox-' + binding);
  return require(binding);
}

function loadBinding(binding) {
  binding = _.isString(binding) ? prefixAndLoad(binding) : binding;
  binding.call(null, binder);
}

exports.loadBindings = function loadBindings(bindings) {
  bindings = [basicBinding].concat((bindings || []));

  _(bindings).select(function (b) {
    return _.isFunction(b) || _.isString(b);
  }).each(loadBinding);
};
