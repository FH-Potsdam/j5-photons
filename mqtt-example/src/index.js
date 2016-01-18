import config from 'config';
import * as five from 'johnny-five';
import Particle from 'particle-io';
// let Particle = require('particle-io');
import * as mqtt from 'mqtt';
import open from 'open';

open('https://shiftr.io/try#terminal'); // see it online

const clientJohn = mqtt.connect(`mqtt://try:try@broker.shiftr.io`, { 'clientId':'john' });
const clientJim = mqtt.connect(`mqtt://try:try@broker.shiftr.io`, { 'clientId':'jim' });
const clientPulse = mqtt.connect(`mqtt://try:try@broker.shiftr.io`, { 'clientId':'pulse' });

// this client sends a puls to fire
clientPulse.on('connect',()=>{
  setInterval(()=>{
    clientPulse.publish('/input/john','Pulse');
  }, 5000);
});

// this client listens to input/john and publishes to input/jim
clientJohn.on('connect',()=>{
  clientJohn.subscribe('/input/john');
  let boardJohn = new five.Board({
    io: new Particle({
      token: config.get(`token`),
      deviceId: config.get(`john`)
    })
  });

  boardJohn.on('ready',()=>{
    let led1 = new five.Led({ pin: 'D7', board: boardJohn });
    clientJohn.on('message',(topic, message)=>{
    console.log(`John received a ${message.toString()} on topic: ${topic}`);
    clientJohn.publish('/input/jim','ping');
    led1.toggle();
    });
  });
});

// this client only listens 7o input/jim
clientJim.on('connect',()=>{
  clientJim.subscribe('/input/jim');
  let boardJim = new five.Board({
    io: new Particle({
      token: config.get(`token`),
      deviceId: config.get(`jim`)
    })
  });
  boardJim.on('ready',()=>{
      let led2 = new five.Led({ pin: 'D7', board: boardJim });
    clientJim.on('message',(topic, message)=>{
    console.log(`John received a ${message.toString()} on topic: ${topic}`);
    // clientJim.publish('/input/john','pong');
    led2.toggle();
    });
  });
});
