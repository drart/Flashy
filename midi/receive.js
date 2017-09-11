var five = require("johnny-five");
var board = new five.Board();
var otherled;
var pin4; 

var osc = require("osc");
var WebSocket = require("ws");
var socketPort;
var on = 1;

board.on("ready", function() {

  var led = new five.Led(13);
  otherled = new five.Led(3);
  pin4 = new five.Led(4);

  led.blink(500);

  this.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    on: function() {
      otherled.brightness(0);
    },
    off: function() {
      otherled.brightness(230);
    }
  });
});


var wss = new WebSocket.Server({
        port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    socketPort = new osc.WebSocketPort({
        socket: socket
    });

    socketPort.on("message", function (oscMsg) {
        console.log("An OSC Message was received!", oscMsg);
	/*
		
	*/
    });


});

