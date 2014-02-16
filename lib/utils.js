/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    path = require('path');

function normalizeModulePath(moduleId) {
  // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
  return (/^\.\/|^\.\.\/|^\//.test(moduleId)) ? path.join(process.cwd(), moduleId) : moduleId;
}

function bindAllTo(context /*, functionsToBind */) {
  var fxs = _.isArray(arguments[1]) ? arguments[1] : _.toArray(arguments).slice(1);

  return _.reduce(fxs, function (r, f) {
    r.push(_.bind(f, context));
    return r;
  }, []);

}

_.extend(exports, {
  bindAllTo: bindAllTo,
  normalizeModulePath: normalizeModulePath
});