var i2c1 = null

if(process.platform != 'darwin'){
	// doesnt work on mac, so conditional to run on pi

	const i2cBus = require('i2c-bus')

	i2c1 = i2cBus.open(1, function(err){
		if(err){
			console.log("i2c error: "+err )
		} else {
			console.log("I2C OPEN")
		}
	})
}

module.exports = function(){

	var i2c = {}

	i2c.sendByte = function(addr, cmd, byte) {
		if(i2c1){
			i2c1.writeByte(addr, cmd, byte, function(){})
		}
	},

	i2c.sendBuffer = function(addr, cmd, array) {
		if(i2c1){
			var buffer = Buffer.from(array);
			i2c1.writeI2cBlock(addr, cmd, array.length, buffer, function(){})
		}
	}

	return i2c
}


