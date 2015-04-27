/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Engineering <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

// Our console message printer
function ConsoleMessagePrinter() {
  return {
    print: function (message) {
      console.log(message);
    }
  };
}

module.exports = ConsoleMessagePrinter;