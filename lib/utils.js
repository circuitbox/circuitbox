/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    util = require('util'),
    path = require('path');

/**
 * Converts specified arguments object to array
 */
function arrgs(args) {
  if (!args || !(arguments.length <= 1 && _.isObject(args)) || _.isEmpty(args))
    return [];

  if (args.length > 1) return _.toArray(args);

  if (_.isArray(args[0])) return args[0];

  if (_.isString(args[0]) || _.isObject(args[0]))
    return [args[0]];
}

/**
 * Returns the specified path after normalizing to specified base path.
 * If no base path is specified, the module is resolved to the current working director.
 * If a module-id is specified, it is returned as-is.
 *
 * @param moduleId  the module-id/path to the module to be normalized
 * @param basePath optional, the path against which the moduleId must be resolved.
 *
 * @returns {*} the normalized module path or module-id
 */
function normalizeModulePath(moduleId, basePath) {
  basePath = basePath || process.cwd();

  // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
  return (/^\.\/|^\.\.\/|^\//.test(moduleId)) ? path.join(basePath, moduleId) : moduleId;
}

/**
 * Binds all the specified functions to the specified context object
 *
 * @param context the context object available as 'this' inside the functions
 * @returns {*} one or more functions to be bound to the specified context
 */
function bindAllTo(context /*, functionsToBind */) {
  var fxs = _.isArray(arguments[1]) ? arguments[1] : _.toArray(arguments).slice(1);

  return _.reduce(_.filter(fxs, _.isFunction), function (r, f) {
    r.push(_.bind(f, context));
    return r;
  }, []);

}

_.extend(exports, {
  arrgs: arrgs,
  bindAllTo: bindAllTo,
  normalizeModulePath: normalizeModulePath,
  fmt: util.format,
  inherits: util.inherits
});