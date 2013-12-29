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

  self.assemble = function assemble() {
    return when.promise(function (resolve, reject) {
      var defLists = r.assemblyListFor(cmpName),
          tgtCmpDef = _.last(defLists),
          s = ComponentAssemblyStrategyFactory.strategyFor(tgtCmpDef);

      s.assemble(function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
      
    });
  };
}

Assembler.for = function createAssemblerFor(context) {
  return new Assembler(context);
};

module.exports = Assembler;