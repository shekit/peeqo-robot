const config = require('config/config.js')
const event = require('js/events/events')
const answer = require('js/actions/response')()

var socket = io(config.peeqo.server + '/peeqo_webcontrol')


module.exports = function(){

	socket.on("remote-gif", function(msg){
		// search for a gif with this msg
		answer.answer({type:'remote', query:msg})

	})

	socket.on("direct-gif", function(msg){

		// give direct url to a gif found online

		answer.answer({type:'none', path:msg, format:'gif'})

	})

	socket.on("servo-raw", function(msg){
		console.log(msg)
		if(typeof(msg)!= "object" || msg.length != 6){
			return
		}

		event.emit("servo-raw",msg)

	})

	socket.on("animate", function(obj){
		event.emit("animate", obj)
	})

}