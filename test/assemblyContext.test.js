/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var context = describe;
var expect = require('expect.js');

var AssemblyContext = require('../lib/assemblyContext');

describe('AssemblyContext', function () {

  context('when created with a kernel and registry and component resolver', function () {
    var targetComponentName = 'myComponent';
    var registry = {};

    it('must hold reference to the specified target component name, kernel, registry', function () {
      var context = new AssemblyContext(targetComponentName, {
        registry: registry
      });

      expect(context.targetComponentName).to.be(targetComponentName);
      expect(context.registry).to.be(registry);
    });

  });

});