var config   = require('config');
var five = require("johnny-five");
var Particle = require("particle-io");
var keypress = require('keypress');

keypress(process.stdin);
// listen for the "keypress" event

var board = new five.Board({
  debug:true,
  io: new Particle({
  token    : config.get('token'),
  deviceId : config.get('jim')
  })
});
board.on("ready", function() {

  var proximity = new five.Proximity({
    controller: "GP2Y0A02YK0F",
    pin: "A1"
  });
    var proximity2 = new five.Proximity({
    controller: "GP2Y0A02YK0F",
    pin: "A2"
  });
  proximity.on("data", function() {
    console.log("Proximity: ");
    console.log("  cm  : ", this.cm);
    console.log("  in  : ", this.in);
    console.log("-----------------");
  });
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    proximity = null;
    process.exit();
  }
});
});