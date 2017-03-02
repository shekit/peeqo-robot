// Module has functions to power on and off the pi
// Remember to properly power off peeqo everytime
// instead of just cutting power
const event = require('js/events')
const execSync = require('child_process').execSync

module.exports = function(){

	var control = {}

	control.shutdown = function(){
		event.emit("reset")
		setTimeout(function(){
			execSync('sudo shutdown -h now')
		},1000)
		
	},

	control.reboot = function(){
		event.emit("reset")
		setTimeout(function(){
			execSync('sudo reboot -h now')
		},1000)
		
	}

	return control
}