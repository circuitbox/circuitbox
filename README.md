# circuitbox

A dependency injection framework for node.js. It does true dependency injection and also supports asynchronous creation and initialization of components.

[![NPM version](https://badge.fury.io/js/circuitbox.png)](http://badge.fury.io/js/circuitbox)
[![build status](https://secure.travis-ci.org/oddjobsman/circuitbox.png)](http://travis-ci.org/oddjobsman/circuitbox)
[![dependency status](https://david-dm.org/oddjobsman/circuitbox.png)](https://david-dm.org/oddjobsman/circuitbox)
[![Coverage Status](https://coveralls.io/repos/oddjobsman/circuitbox/badge.png?branch=master)](https://coveralls.io/r/oddjobsman/circuitbox?branch=master)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/oddjobsman/circuitbox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM](https://nodei.co/npm/circuitbox.png?stars=true&downloads=true)](https://nodei.co/npm/circuitbox/)

Its design has been influenced by frameworks like [Spring](http://projects.spring.io/spring-framework/) and [Google Guice](https://code.google.com/p/google-guice/) and [StructureMap](http://docs.structuremap.net/).

## Installation

This module can be installed via npm:

``` bash
$ npm install --save circuitbox
```

### tl;dr Example

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
        .dependsOn('message');

      // define the message printer - does a module.require internally
      registry.for('messagePrinter').requires('./consoleMessagePrinter')
        .dependsOn('messageSource');
    }
  ]
}).done(function (cbx) {
  
  // get the message printer and print a message
  cbx.get('messagePrinter').done(function (printer) {
    printer.print();
  }, function (err) {
    console.log('Could not recieve a printer');
    return;
  });

}, function (err) {
  console.log('Could not create circuitbox');
});
```

### Motivation

#### Application Size

The node.js platform was for long dismissed as a platform to build hobby projects and toy project. However that view has now changed. node.js has become a serious application development platform.

This seriousness has now led many organizations to consider building enterprise-scale applications with node. Now that people are building these large-scale applications, the idea of modularity, componentizing and dependency injection take more prominence.

From my experience, no application starts big. All applications start small and then grow large. As applications grow the number of moving parts that need to work together also grows. Unless there is a lot of discipline applied, managing these little parts and ensuring they work together accurately can be quite a challenge.

I see dependency-injection as an important core capability to address this challenge. It has been battle tested in other popular platforms like Java/.NET. DI allows you to cleanly identify components and efficiently manage dependencies between them.

#### Tight Coupling
One of the pain points I built circuitbox to solve was the tight-coupling and testability of node.js modules. I believe, though JavaScript has a dynamic type-system, it is not free from the problems of tight-coupling. In node, each uses the `require` method to import code from other modules. Although this is a core feature of node, it actually introduces tight-coupling between the two modules.

I would consider node's `require` to be Java/C#'s (or even JavaScript) `new` operator. Newing up objects internally causes tight coupling between two objects or in node's case two modules.

#### Code smells
A problem I have experienced while maintaining some PHP code is where one file has several includes. This causes the file to be very fragmented and very difficult to read and maintain. Unfortunately, I have seen a lot of projects where code was being ported over from PHP but not restructured or re-structured poorly. And the problems with fragmented code comes into node.js too.

Some particulars problems I have come to experience are:

- Module code interspersed with `require` calls makes its readablity and maintainability hard.
- Referencing modules within your library using the package name assuming they are always hosted inside another.
- Dynamic `require` calls where you are not sure which module gets imported.

I am not claiming that all of these problems can be solved with dependency injection. It would take some discipline from the developers and a little nudge from the frameworks/tools you use to prevent the pitfalls.

#### Testability
Using a TDD/BDD workflow really changes the way you approach the construction and maintenance of your code. I do not want to write another rant about how useful these workflows are except to say they should be a quint-essential part of your development process and practice.

Tightly coupled modules are hard to test. You really have to work hard for it and use [magic](https://github.com/thlorenz/proxyquire) to stub out the internal uses of `require` in a node.js module. The community is divided over a reliable method to stub `require` calls out. You do not want to spend a lot of time stubbing dependencies when testing a component. If you do, then TDD/BDD is not working for you.

#### Dependency Injection vs. Dependency Lookup
Currently, there are a lot of libraries out there that claim to do dependency-injection, [about 40 of them](https://npmjs.org/browse/keyword/dependency%20injection). By my assessment, I saw that a significant number of them don't do dependency-injection. Case-in-point, the [desire](https://npmjs.org/package/desire) framework:

```js
var App = function(desire) {

  var ui = desire('ui')
  var version = desire('version')

  return {
    run: function() {
      console.log('application version ' + version)
      ui.show()
      console.log('ui is visible')
    }
  }

}
```
Here `App` is a function that creates an object with a `run` method. See how it is doing dependency lookup in the line `var ui = desire('ui')`? The `desire` container is not smart enough to automatically inject `ui` into `App` and make it available for use. Most frameworks seem to have used this style.

This is not dependency injection but dependency lookup where the container is simply acting as a registry of components and each component has to lookup this registry and retrieve its dependencies before execution. The problem here is that the names of the components are still hard-wired into the target components and that becomes hard for changing things later. For instance, what if I wanted 2 different types of `ui` components later, one named `webui` and other named `androidui` and `App` would need to use the right one based on where it has started?

For dependency injection to work, the container must first be given (or detect) the component configuration ahead-of-time. During execution, when the program asks the container for a component, the container uses the target component's configuration, assembles its dependencies, creates & initializes the target component and then gives it to the program for use.

#### Lock-In
In the `desire` code example shown above, also observe the lock-in. Since you are directly accessing the `desire` container, you are bound to `desire`'s API and if you decide to move away from the library, you will need to change your code at several places where there is a reference to `desire`.

You do not want this kind of forced relationship with a framework.

### Design Principles
1. Provide true dependency injection where container knows all the components it hosts and knows how to create, initialize them with their dependencies.
2. Support node.js' asynchronus style. The asynchronous style is one of the key differentiators for apps built on node. It is very core to node being fast and scalable. I wanted to ensure I bring this style to circuitbox ensuring that components might need to be created or initialized asynchronously.
3. Encourage components to be testable
4. Be nice, dont lock-in - provide a simple way to wire components together without requiring components to be tightly-coupled with `circuitbox`.
5. Allow existing node.js library modules to be used with circuitbox and provide the same DI facility for them.

### A Taste of Circuitbox

So lets take a look at `circuitbox`, first let me define a component in a file `consoleMessagePrinter.js` with the code:

```js
module.exports = function ConsoleMessagePrinter(deps) {
  'use strict';

  return {
    print: function () {
      console.log(deps.messageSource.message());
    }
  };
}
```

Notice here that the code looks quite close dependency lookup style code of the `desire` example I provided earlier. However, the component does not get direct access to the registry. It gets a parameter called `deps` which at runtime will include all the dependencies that was declared for the component. The component then takes a reference of its dependency and uses it. In this case `ConsoleMessagePrinter` uses a `messageSource` as a dependency to get the message which it prints to the `console`.

The point to notice here is that you wrap your component code with a function closure that takes the component's dependencies as a parameter. It then returns the actual component which will be used by other components. I call this function closure as a 'creator function' or 'creator'.

Wrapping your existing component code with a 'creator' is probably the only thing that `circuitbox` asks you do to make the component dependency injectable.

Next, lets define the `messageSource` component and how we can wire this up with `circuitbox`. I put the following code in a file called `main.js`:

```js
'use strict';

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
        .dependsOn('message');

      // define the message printer - does a module.require internally
      registry.for('messagePrinter').requires('./consoleMessagePrinter')
        .dependsOn('messageSource');
    }
  ]
}).done(function (cbx) {

  // get the message printer and print a message
  cbx.get('messagePrinter').done(function (printer) {
    printer.print();
  }, function (err) {
    console.log('Could not recieve a printer');
    return;
  });

}, function (err) {
  console.log('Could not create circuitbox');
});
```

In this snippet, we initially define a `simpleMessageSource` component which also is wrapped in a creator. It needs a `message` as a dependency which is provided via the `deps` parameter.

We then import the `circuitbox` library and create a new instance of it using the `create` method. The method takes component configuration as an object hash in its parameter. This configuration object should contain a `modules` attribute that represents an `Array` of functions that define modules. Modules are a good way of logically grouping your components. `circuitbox` provides a fluent API to express component definitions to help readability.

In this case we have a single module function which accepts one parameter named `registry`. It represents the component registry that `circuitbox` will use to lookup components. This function is where modules can define the components to `circuitbox` that must be served during runtime.

First, we define the `message` component which is a simple string value. Yes, components can be complex functions, objects, arrays, strings, booleans, numbers. Even `null` value. The definition starts with the `for` method where we provide the name of the component and chain to the `use` method to tell `circuitbox` to use the specified value as the component.

The next component we define is the `messageSource`. Note that the component is defined in the same file. Again, we call the`for` and `use` method to point it to the `simpleMessageSource` creator function. We then chain on to call the `dependsOn` where we declare that `messageSource` depends on `message`. This is the way we tell `circuitbox` about a component's depdendencies and it will do the injection at runtime. The injection logic `circuitbox` uses is name-based. So ensure you name your components correctly.

Finally we define the `messagePrinter` component. Here we start the definition with a `for` but then call the `requires` method and pass it the path of the `consoleMessagePrinter.js` module. This method tell `circuitbox` to use node.js's `require` method to import an external module. This imports the code from the file and points to the `ConsoleMessagePrinter` component we discussed earlier.

Great, so far so good. Now we have defined all our components to `circuitbox`, so how do we kickstart? In the spirit of asynchronous style of node.js, `circuitbox` implements asynchronous constructs in many places:

1. Creating an `circuitbox` is asynchronous
2. A component creator function can be asynchronous
3. A component initializer function can also be asynchronous
2. Component retrieval is asynchronous.

`circuitbox` provides 2 styles of asynchronous constructs, the [callback](http://book.mixu.net/node/ch7.html) style and the promises style. The `create` method on `circuitbox` not only takes the component configuration, you can optionally specify a callback function as the second parameter. This callback function takes 2 parameter an `err` parameter and the `circuitbox` parameter. The former is provided if there was an error initializing the configuration and creating a container. The latter is a fully initialized `circuitbox` DI container which can be used to request components.

The above code snippet demonstrates the [promise](http://promises-aplus.github.io/promises-spec/) style of asynchronous constructs. `circuitbox` uses the [when.js](https://github.com/cujojs/when) library for implementing promises. If the `create` method is not provided a callback, it triggers an initialization of the DI container and returns a promise object. We chain onto the promise object and call the `done` method which recieves a fully initialized `circuitbox` container.

Regardless of the style you prefer to use, once you have a instance of `circuitbox` container, you can call the `get` method passing the name of the component you require. Like the `create` method, the `get` method also takes an optional callback which is called when the requested component is created and initialized. As demonstrated above, the `get` method also returns a promise object in the absence of a callback argument.

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

### Roadmap
So what are the next set of features on the project?

- Support for aliasing components with additional names
- Bindings to popular libraries. These however, may be published as separate libraries. I am considering  libraries such as:
  -  express - In progress. See [circuitbox-express](https://github.com/oddjobsman/circuitbox-express)
  -  mongoose
  -  mysql
  -  redis

Head over to the [waffle.io](https://waffle.io/oddjobsman/circuitbox) page for a better view of things to come.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Follow the [coding conventions](http://github.com/oddjobsman/circuitbox/wiki/Coding-Conventions)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request
