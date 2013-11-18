/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  module.exports = function ComponentCreationException() {
    this.componentName = arguments[0];
    this.message = arguments[1] || 'Component \'' + this.componentName + '\' could not be created';
  };

})();