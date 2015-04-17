/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
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