var five = require("johnny-five");
var midi = require("midi");

var input = new midi.input();

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

/*
	    if (on){
			otherled.brightness(0);
			pin4.brightness(220);
		}else{
			otherled.brightness(220);
			pin4.brightness(0);
		}
		on = !on;

*/
