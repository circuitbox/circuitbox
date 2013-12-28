# circuitbox

A dependency-injection framework for node.js

[![Stories in Ready](https://badge.waffle.io/oddjobsman/circuitbox.png?label=ready)](https://waffle.io/oddjobsman/circuitbox)
[![build status](https://secure.travis-ci.org/oddjobsman/circuitbox.png)](http://travis-ci.org/oddjobsman/circuitbox)
[![dependency status](https://david-dm.org/oddjobsman/circuitbox.png)](https://david-dm.org/oddjobsman/circuitbox)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/oddjobsman/circuitbox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![status](https://sourcegraph.com/api/repos/github.com/oddjobsman/circuitbox/badges/status.png)](https://sourcegraph.com/github.com/oddjobsman/circuitbox)

## Objectives

1. Make wiring up of dependent components simple and easy and manageable
2. Write testable units of code without worrying about their wiring up
3. Provide a robust platform to write large-scale node.js applications.

## Installation

This module can be installed via npm:

``` bash
$ npm install --save circuitbox
```

## Example Usage

``` js
module.circuitbox = require('circuitbox');
var cb = circuitbox.create({
    modules: ['config/commonModule', 'config/webModule']
});
```

``` js
module.exports = function CreditCardProcessor (processor, transactionLog) {
	this.chargeOrder = function (order, creditCard) {
		var tx = processor.processTransaction(creditCard, order.amount);
		transactionLog.recordPayment(tx);
	};
};
```
### Components

Components are objects which provide a service. They usually collaborate with other components that provide other required services. circuitbox prescribes a specific convention with which you can author your components. This conventions helps the component recieve the required dependencies. Below is an example of a component:


``` js
module.exports = function CreditCardProcessor (processor, transactionLog) {
	this.chargeOrder = function (order, creditCard) {
		var tx = processor.processTransaction(creditCard, order.amount);
		transactionLog.recordPayment(tx);
	};
};
```

### Basic Example

Assuming there is a file named `consoleMessagePrinter.js` in the same folder with the code:

``` js
'use strict';

// Our console message printer
// deps is injected by circuitbox with the dependencies
function ConsoleMessagePrinter(deps) {
  return {
    print: function () {
      console.log(deps.messageSource.message());
    }
  };
}

module.exports = ConsoleMessagePrinter;
```

And in our `main.js` file we have code as:

``` js
'use strict';

// our simple message source
// deps is injected by circuitbox with the dependencies
var simpleMessageSource = function (deps) {
  return {
    message: function () {
      return deps.message;
    }
  };
};

// require circuitbox
var circuitbox = require('circuitbox');

// create a circuitbox
circuitbox.create({
  modules: [
    function (registry) {
      // the message to be used
      registry.for('message').use('This is the message');

      // define the message source
      registry.for('messageSource').use(simpleMessageSource)
        .dependsOn('message').scope('singleton');

      // define the message printer - does a module.require internally
      registry.for('messagePrinter').requires('./consoleMessagePrinter')
        .dependsOn('messageSource').scope('singleton');
    }
  ]
}).then(function (cbx) {
  // get the message printer and print a message
  cbx.get('messagePrinter').then(function (printer) {
    printer.print();
  }).fail(function (err) {
    console.log('Could not recieve a printer');
    return;
  });
}).fail(function (err) {
  console.log('Could not create circuitbox');
});
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Follow the [coding conventions](Coding-Conventions)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request