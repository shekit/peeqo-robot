const config = require('config/config.js')
const event = require('js/events/events')

var socket = io(config.peeqo.server + '/peeqo_demo')


module.exports = function(){

	socket.on("sleep", function(msg){
		event.do('sleep')
	})

	socket.on("wake", function(msg){

		event.do('wakeUp')
	})

	socket.on("listen", function(msg){

		event.do('listen')

	})

	socket.on("hi", function(msg){

		event.do('greetPublic')

	})

	socket.on("bye", function(msg){
		
		event.do('sayBye')
	})

	socket.on("yes", function(msg){
		
		event.do('sayYes')
	})

	socket.on('no', function(msg){
		event.do('sayNo')
	})

	socket.on('happy', function(msg){
		event.do('beHappy')
	})

	socket.on('sad', function(msg){
		event.do('beSad')
	})

	socket.on("reset", function(msg){
		event.emit("reset")
	})


}