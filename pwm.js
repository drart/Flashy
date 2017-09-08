var five = require("johnny-five");
var board = new five.Board();
var otherled;
var pin4; 

board.on("ready", function() {

  var led = new five.Led(13);
  otherled = new five.Led(3);
  pin4 = new five.Led(4);


  led.blink(500);
  otherled.brightness(10);

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

var osc = require("osc");
var WebSocket = require("ws");
var socketPort;
var on = 1;

var wss = new WebSocket.Server({
        port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    socketPort = new osc.WebSocketPort({
        socket: socket
    });
    socketPort.send({
        address: "/carrier/lsls",
        args: [{
            type: "f",
            value: 100.38101
        }]
    });

	setInterval(function(){
	    if (on){
			otherled.brightness(0);
			pin4.brightness(220);
		}else{
			otherled.brightness(220);
			pin4.brightness(0);
		}
		on = !on;
	    socketPort.send({
		address: "/carrier/lsls",
		args: [{
		    type: "f",
		    value: on
		}]
	    });
	}, 500);
});

