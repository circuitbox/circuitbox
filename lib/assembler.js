/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var _ = require('underscore'),
    when = require('when'),
    ComponentCreationError = require('./componentCreationError'),
    ComponentAssemblyStrategyFactory = require('./componentAssemblyStrategyFactory'),
    AssemblyContext = require('./assemblyContext');

function Assembler(cxt) {
  var self = this,
      r = cxt.registry,
      cmpName = cxt.targetComponentName;

  if (!(cxt instanceof AssemblyContext))
    throw new ComponentCreationError('Cannot assemble component without a valid assembly context', '');

/*
  function assembleComponent(componentName, asyncCallback) {
    Assembler.for(new AssemblyContext(componentName, {
      registry: r
    })).assemble()
      .done(function (result) {
        asyncCallback(null, result);
      }, function (err) {
        asyncCallback(err);
      });
  }
*/

  function assembleCallback(callback) {
    var defLists = r.assemblyListFor(cmpName),
        tgtCmpDef = _.last(defLists),
        s = ComponentAssemblyStrategyFactory.strategyFor(tgtCmpDef);

    s.assemble(callback);
  }

  function assemblePromise() {
    return when.promise(function (resolve, reject) {
      assembleCallback(function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  self.assemble = function assemble() {
    if (arguments.length === 1 && _.isFunction(arguments[0])) {
      assembleCallback(arguments[0]);
    }
    return assemblePromise();
  };
}

Assembler.for = function createAssemblerFor(context) {
  return new Assembler(context);
};

module.exports = Assembler;