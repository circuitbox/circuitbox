/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
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