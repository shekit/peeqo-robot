// control servos on Peeqo
const movements = require('js/data/movement-cmds')
const servoCmd = require('js/data/servo-cmds')
const i2c = require('js/i2c-cmds')()

module.exports = function() {

	var servo = {}

	servo.movementTimeouts = [];

	servo.address = 0x07

	function clearMovementTimeouts(){
		for(var i=0;i<servo.movementTimeouts.length;i++){
			clearTimeout(servo.movementTimeouts[i])
		}

		servo.movementTimeouts = [];
	}

	servo.animate = function(name){

		// remove any prev store timers
		clearMovementTimeouts();

		var commands = movements[name].access_cmd;
		var angles = movements[name].angles;
		var durations = movements[name].duration;

		// if by mistake sizes differ then set cmd seq to be equal to move seq and set easing to default
		if(commands.length != angles.length){
			commands.length = angles.length

			for(var i in commands){
				commands[i] = servoCmd.easing500.cmd;
			}
		}

		//stagger and setTimers for the other moves
		for(var i=0;i<angles.length;i++){

			var timerDuration = 0;

			// find sum of time of all previous angles
			if(i>0){
				for(var j=i-1;j>=0;j--){
					timerDuration+=durations[j]
				}
			}

			if(i==angles.length-1){
				//console.log("call reset now: " , timerDuration+durations[i])
				resetServos(timerDuration+durations[i])
			}

			addMovementTimer(i, angles, commands, timerDuration)
		}

	}

	servo.animateRaw = function(vals){
		console.log(vals)
		i2c.sendBuffer(servo.address, servoCmd.easing1000.cmd, vals)
	}

	function addMovementTimer(i, angles, commands, duration){
		var timer = setTimeout(function(){
			i2c.sendBuffer(servo.address, commands[i], angles[i])
		}, duration)

		servo.movementTimeouts.push(timer);
	}

	function resetServos(duration){
		var timer = setTimeout(function(){
			i2c.sendBuffer(servo.address, movements.reset.access_cmd[0] ,movements.reset.angles[0])
		}, duration+500)

		servo.movementTimeouts.push(timer);
	}

	return servo

}