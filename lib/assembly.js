/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var deferred = require('./deferred');
  var ComponentCreationError = require('./errors').ComponentCreationError;

  function AssemblyContext(componentName, options) {
    Object.defineProperties(this, {
      targetComponentName: {
        get: function getTargetComponentName() {
          return componentName;
        }
      },
      registry: {
        get: function getRegistry() {
          return options.registry;
        }
      },
      callBack: {
        get: function getCallBack() {
          return options.callBack;
        }
      }
    });
  }

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

  module.exports = {
    AssemblyContext: AssemblyContext,
    Assembler: Assembler
  };

})();