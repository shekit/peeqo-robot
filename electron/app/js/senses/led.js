// control LED ring on Peeqo
const ledCommands = require('js/commands/led-cmds')
const i2c = require('js/commands/i2c-cmds')()

module.exports = function(){

	var led = {}

	led.address = 0x04
	led.cmd = 0x01

	led.animate = function(anim){
		console.log("LED", anim)
		if(ledCommands[anim]){
			i2c.sendByte(led.address, led.cmd, ledCommands[anim].cmd)
		}
	}

	return led
}