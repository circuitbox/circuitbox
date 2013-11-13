# circuitbox

A dependency-injection framework for node

[![build status](https://secure.travis-ci.org/oddjobsman/circuitbox.png)](http://travis-ci.org/oddjobsman/circuitbox)

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
var circuitbox = require('circuitbox');

var cb = circuitbox.create({
    modules: ['config/commonModule', 'config/webModule']
});
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