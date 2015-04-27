/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var r = require,
    sinon = r('sinon'),
    DefaultBindings = r('../lib/defaultBindings'),
    SelectorFactory = r('../lib/selectorFactory'),
    binderApi = {
      registerDefinitionBuilder: function () {},
      registerComponentCreator: function () {},
      registerScopeHandler: function () {},
      registerSelector: function () {}
    };

describe('DefaultBindings', function () {
  /*jshint expr: true*/

  afterEach(function () {
    SelectorFactory._reset();
  });

  it('should register the default ComponentDefinitionBuilders, ComponentCreators and ScopeHandlers', function () {
    /*jshint newcap: false*/
    var mB = sinon.mock(binderApi),
        defaultSelectors = r('../lib/defaultSelectors');

    mB.expects('registerDefinitionBuilder').withArgs('use', r('../lib/simpleComponentDefinitionBuilder')).once();
    mB.expects('registerDefinitionBuilder').withArgs('requires', r('../lib/moduleComponentDefinitionBuilder')).once();

    mB.expects('registerComponentCreator').withArgs(r('../lib/simpleComponentDefinition'), r('../lib/simpleComponentCreator')).once();
    mB.expects('registerComponentCreator').withArgs(r('../lib/moduleComponentDefinition'), r('../lib/moduleComponentCreator')).once();

    mB.expects('registerScopeHandler').withArgs('singleton', r('../lib/singletonScopeHandler')).once();
    mB.expects('registerScopeHandler').withArgs('prototype', r('../lib/prototypeScopeHandler')).once();

    mB.expects('registerSelector').withArgs('type', defaultSelectors.type).once();
    mB.expects('registerSelector').withArgs('regexp', defaultSelectors.regexp).once();
    mB.expects('registerSelector').withArgs('name', defaultSelectors.name).once();

    DefaultBindings(binderApi);

    mB.verify();
    mB.restore();
  });

});
