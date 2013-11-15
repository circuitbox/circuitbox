/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  module.exports = function ComponentDefinitionException() {
    this.componentName = arguments[0];
    this.message = arguments[1] || 'Definition for component \'' + this.componentName + '\' is invalid';
  };

})();