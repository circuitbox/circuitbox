/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var r = require;

module.exports = function (binder) {
  binder.registerDefinitionBuilder('use', r('./simpleComponentDefinitionBuilder'));
  binder.registerDefinitionBuilder('requires', r('./moduleComponentDefinitionBuilder'));

  binder.registerComponentCreator(r('./simpleComponentDefinition'), r('./simpleComponentCreator'));
  binder.registerComponentCreator(r('./moduleComponentDefinition'), r('./moduleComponentCreator'));

  binder.registerScopeHandler('singleton', r('./singletonScopeHandler'));
  binder.registerScopeHandler('prototype', r('./prototypeScopeHandler'));
};