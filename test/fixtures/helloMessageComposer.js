/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

module.exports = function (deps) {
  var fmt = deps.fmt;
  var name = deps.name;

  return {
    getMessage: function getMessage() {
      return fmt('Hello world! This is %s', name);
    }
  };

};