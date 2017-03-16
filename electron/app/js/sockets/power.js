const config = require('config/config.js')
const event = require('js/events/events')

if(process.platform != 'darwin'){
	const wifi = require('js/wireless/wifi')
}

var socket = io(config.peeqo.server + '/peeqo_power')

module.exports = function(){

	socket.on("shutdown", function(msg){
		event.emit("shutdown")
	})

	socket.on("reboot", function(msg){
		event.emit("reboot")
	})

	socket.on("refresh", function(msg){
		event.emit("refresh")
	})

	socket.on("reset", function(msg){
		event.emit("reset")
	})

	socket.on("ip", function(msg){
		var ip = wifi.getIp()
		socket.emit("ip", ip)
	})
	
}