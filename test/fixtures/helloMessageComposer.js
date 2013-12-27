/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  module.exports = function (deps) {
    var utils = deps.utils;
    var name = deps.name;

    return {
      getMessage: function getMessage() {
        return utils.sprintf('Hello world! This is %s', name);
      }
    };
  };

})();