(function () {
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
  
})();