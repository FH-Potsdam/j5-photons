var config   = require('config');
var Particle = require("particle-io");
var board = new Particle({
  token    : config.get('token'),
  deviceId : config.get('john')
});
board.on("ready", function() {
  console.log("CONNECTED");
  // Log all the readings for A1
  this.analogRead("A1", function(data) {
    console.log(data);
  });

});