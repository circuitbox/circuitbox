/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var path = require('path');

function normalizeModulePath(moduleId) {
  // logic borrowed from point 2 in http://nodejs.org/api/modules.html#modules_all_together
  return (/^\.\/|^\.\.\/|^\//.test(moduleId)) ? path.join(process.cwd(), moduleId) : moduleId;
}

exports.normalizeModulePath = normalizeModulePath;