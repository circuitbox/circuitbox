/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var ComponentCreationError = require('./componentCreationError');
  var AssemblyContext = require('./assemblyContext');
  var deferred = require('./deferred');

  function Assembler(context) {
    if (!(context instanceof AssemblyContext)) {
      throw new ComponentCreationError('Cannot assemble component without a valid assembly context', '');
    }
    context.targetComponentName.toString();

    var self = this;

    self.assemble = function assemble() {
      var componentAssembly = deferred();
      return componentAssembly.promise;
    };
  }

  Assembler.for = function createAssemblerFor(context) {
    return new Assembler(context);
  };

  module.exports = Assembler;

})();