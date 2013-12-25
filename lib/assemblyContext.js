/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

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

  module.exports = AssemblyContext;

})();