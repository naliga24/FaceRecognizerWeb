/**
 * Module dependencies
 */
var should = require("should")
  , throttledLog = require('..')();

var ITERATIONS = 1000000;

function iterate(log, message) {
  var start = Date.now();
  for (var i = ITERATIONS - 1; i >= 0; i--) {
    log(message);
  };
  return Date.now() - start;
};

describe("throttled-log", function(){
  it("should be faster than normal console.log", function() {
    var unthrottled = iterate(console.log.bind(console), "unthrottled");
    var throttled = iterate(throttledLog, "throttled");
    unthrottled.should.be.above(throttled);
    console.error("unthrottled:",unthrottled,"throttled:",throttled);
  });
});
