/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

function AssemblyContext(componentName, options) {
  options = options || {};

  Object.defineProperties(this, {
    targetComponentName: {
      get: function getTargetComponentName() {
        return componentName;
      }
    },
    kernelView: {
      get: function () {
        return options.kernelView;
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