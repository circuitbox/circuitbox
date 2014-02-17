/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    path = require('path');

/**
 * Returns the specified path after normalizing to the current working directory.
 * If a module-id is specified, it is returned as-is.
 *
 * @param moduleId  the module-id/path to the module to be normalized
 * @returns {*} the normalized module path or module-id
 */
function normalizeModulePath(moduleId) {
  // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
  return (/^\.\/|^\.\.\/|^\//.test(moduleId)) ? path.join(process.cwd(), moduleId) : moduleId;
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
  bindAllTo: bindAllTo,
  normalizeModulePath: normalizeModulePath
});