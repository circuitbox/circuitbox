/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

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
var circuitbox = require('../../lib');

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
}).then(function (cbx) {
  
  // get the message printer and print a message
  cbx.get('messagePrinter').then(function (printer) {
    printer.print();
  }, function (err) {
    console.log('Could not recieve a printer', err);
    return;
  });

}, function (err) {
  console.log('Could not create circuitbox', err);
});