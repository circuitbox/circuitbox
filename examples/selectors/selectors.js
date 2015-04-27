/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Engineering <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

// require circuitbox
var _ = require('lodash'),
    circuitbox = require('../../lib');

// create a circuitbox
circuitbox.create({
  modules: [
    function (registry) {
      // define the message printer - does a module.require internally
      registry.for('messagePrinter').requires('./consoleMessagePrinter');

      registry.for('helloCommand').use(function (deps) {
        return function (p) {
          deps.messagePrinter.print('Hello ' + p.name + '!');
        };
      }).dependsOn('messagePrinter');

      registry.for('goodbyeCommand').use(function (deps) {
        return function (p) {
          deps.messagePrinter.print('Goodbye ' + p.name + '!');
        };
      }).dependsOn('messagePrinter');

      registry.for('locationCommand').use(function (deps) {
        return function (p) {
          deps.messagePrinter.print('I live in ' + p.city + '!');
        };
      }).dependsOn('messagePrinter');

      registry.for('peopleManager').use(function (deps) {
        return function (p) {
          _.each(deps.commands, function (cmd) {
            cmd.call(null, p);
          });
        };
      }).dependsOn('commands:name:*Command');

    }
  ]
}).then(function (cbx) {

  // get the message printer and print a message
  cbx.get('peopleManager').then(function (pm) {
    pm({
      name: 'John Doe',
      city: 'Timbuctoo'
    });
  }, function (err) {
    console.log('Could not recieve a people manager', err);
    return;
  });

}, function (err) {
  console.log('Could not create circuitbox', err);
});