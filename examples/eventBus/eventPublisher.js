'use strict';

module.exports = function (deps) {
  return {
    publish: function (message) {
      deps.bus.emit('message', message);
    }
  };
};