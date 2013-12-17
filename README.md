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

``` js
(function () {
  'use strict';

  // our simple message source
  var simpleMessageSource = function (message) {
    return {
      message: function () {
        return message;
      }
    };
  };

  // Our console message printer
  var consoleMessagePrinter = function (messageSource) {
    return {
      print: function () {
        console.log(messageSource.message());
      }
    };
  };

  var circuitbox = require('circuitbox');

  // create a circuitbox
  var cbx = circuitbox.create({
    options: {
        logger: winstonLogger
    },
    modules: [
      function (registry) {
        // the message to be used
        registry.for('message').use('This is the message');

        // define the message source
        registry.for('messageSource').use(simpleMessageSource).requires('message').scope('singleton');

        // define the message printer
        registry.for('messagePrinter').use(consoleMessagePrinter).requires('messageSource').scope('singleton');
      }
    ]
  });

  // get the message printer and print a message
  cbx.get('messagePrinter', function (printer) {
    printer.print();
  })

})();
```


