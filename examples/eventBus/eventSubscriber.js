/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

module.exports = function (deps) {
  var console = deps.console;

  function printMessage(message) {
    console.log('Recieved message: ', message);
  }

  return {
    start: function () {
      deps.bus.on('message', printMessage);
    }
  };

};