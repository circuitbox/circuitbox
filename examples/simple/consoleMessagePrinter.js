/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Engineering <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

// Our console message printer
// deps is injected by circuitbox with the dependencies
function ConsoleMessagePrinter(deps) {
  return {
    print: function () {
      console.log(deps.messageSource.message());
    }
  };
}

module.exports = ConsoleMessagePrinter;