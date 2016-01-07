var config   = require('config');
var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
  token    : config.get('token'),
  deviceId : config.get('id')
  })
});
board.on("ready", function() {
  var led = new five.Led("D7");
  led.blink();
});

