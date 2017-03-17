const config = require('config/config.js')
const event = require('js/events/events')

var socket = io(config.peeqo.server + '/peeqo_demo')


module.exports = function(){

	socket.on("sleep", function(msg){
		event.emit('do','sleep')
	})

	socket.on("wake", function(msg){

		event.emit('do','wakeUp')
	})

	socket.on("listen", function(msg){

		event.emit('do','listen')

	})

	socket.on("hi", function(msg){

		event.emit('do','greetPublic')

	})

	socket.on("bye", function(msg){
		
		event.emit('do','sayBye')
	})

	socket.on("yes", function(msg){
		
		event.emit('do','sayYes')
	})

	socket.on('no', function(msg){
		event.emit('do','sayNo')
	})

	socket.on('happy', function(msg){
		event.emit('do','beHappy')
	})

	socket.on('sad', function(msg){
		event.emit('do','beSad')
	})

	socket.on("reset", function(msg){
		event.emit("reset")
	})


}