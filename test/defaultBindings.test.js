/*!
 * circuitbox
 * Copyright(c) 2014 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

'use strict';

var r = require,
    sinon = r('sinon'),
  DefaultBindings = r('../lib/defaultBindings'),
  binderApi = {
    registerDefinitionBuilder: function () {},
    registerComponentCreator: function () {},
    registerScopeHandler: function () {}
  };

describe('DefaultBindings', function () {
  /*jshint expr: true*/

  it('should register the default ComponentDefinitionBuilders, ComponentCreators and ScopeHandlers', function () {
    /*jshint newcap: false*/
    var mB = sinon.mock(binderApi);

    mB.expects('registerDefinitionBuilder').withArgs('use', r('../lib/simpleComponentDefinitionBuilder')).once();
    mB.expects('registerDefinitionBuilder').withArgs('requires', r('../lib/moduleComponentDefinitionBuilder')).once();

    mB.expects('registerComponentCreator').withArgs(r('../lib/simpleComponentDefinition'), r('../lib/simpleComponentCreator')).once();
    mB.expects('registerComponentCreator').withArgs(r('../lib/moduleComponentDefinition'), r('../lib/moduleComponentCreator')).once();

    mB.expects('registerScopeHandler').withArgs('singleton', r('../lib/singletonScopeHandler')).once();
    mB.expects('registerScopeHandler').withArgs('prototype', r('../lib/prototypeScopeHandler')).once();

    DefaultBindings(binderApi);

    mB.verify();
    mB.restore();
  });

});
