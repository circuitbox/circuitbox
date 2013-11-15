/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var utils = require('../utils/');
  var ComponentDefinition = require('./componentdefinition');

  function SpecifiedComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};

    ComponentDefinition.call(self, options);
  }

  utils.inherits(SpecifiedComponentDefinition, ComponentDefinition);

  module.exports = SpecifiedComponentDefinition;

})();