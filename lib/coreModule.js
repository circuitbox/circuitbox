/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

module.exports = function (r) {

  // event-bus registration
  r.for('bus').use(function () {
    return new (require('events')).EventEmitter();
  });

};