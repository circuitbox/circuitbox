/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

module.exports = function (deps) {
  return {
    publish: function (message) {
      deps.bus.emit('message', message);
    }
  };
};