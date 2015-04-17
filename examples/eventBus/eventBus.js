/*!
 * circuitbox
 * Copyright (c) 2014-2015 Ranganath Kini <codematix@codematix.me>
 * Copyright (c) 2015 intuitivcloud Systems <engineering@intuitivcloud.com>
 * MIT Licensed
 */

'use strict';

var circuitbox = require('../../lib');

circuitbox.create({
  modules: [
    function (registry) {
      // yes, the console itself can be registered as a component
      registry.for('console').use(global.console);

      // our component which publishes events
      registry.for('publisher').requires('./eventPublisher').dependsOn('bus');

      // our component which subscribes events
      registry.for('subscriber').requires('./eventSubscriber').dependsOn('console', 'bus');
    }
  ]
}).then(function (cbox) {

  // get a subscriber
  cbox.get('subscriber', function (err, subscriber) {
    subscriber.start();   // start subscription to events

    // get the publisher
    cbox.get('publisher', function (err, publisher) {
      // publish a message
      publisher.publish('Wow! Event bus really works!');

      setTimeout(function () {
        publisher.publish('The quick brown fox jumped over the lazy dog!');
      }, 5000);

    });

  });

});