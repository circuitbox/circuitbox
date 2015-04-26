'use strict';

var minimatch = require('minimatch'),
    rexCache = {};

exports.type = function (pattern, cd) {
  return cd.type === pattern;
};

exports.regexp = function (pattern, cd) {
  var rex = rexCache[pattern];

  // small optimization to improve performance
  // avoids repeated regex compilation
  if (!rex)
    rex = rexCache[pattern] = new RegExp(pattern);

  return rex.test(cd.name);
};

exports.name = function (pattern, cd) {
  return minimatch(cd.name, pattern);
};