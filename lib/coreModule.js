/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

module.exports = function (r) {

  // event-bus registration
  r.for('bus').use(function () {
    return new (require('events')).EventEmitter();
  });

};