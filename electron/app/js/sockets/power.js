const ip = require('ip');
const config = require('config/config.js')
const event = require('js/events')
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
	
}