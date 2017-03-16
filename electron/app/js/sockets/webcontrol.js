const config = require('config/config.js')
const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

var socket = io(config.peeqo.server + '/peeqo_webcontrol')


module.exports = function(){

	socket.on("remote-gif", function(msg){
		var obj = {
			gif_type:"remote",  //local/remote
			gif_category:msg,
			format: common.setFormat(),
			gif_url: null,
			gif_loop_forever: false,
			servo:null,
			led:"success",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("direct-gif", function(msg){
		var obj = {
			gif_type:"remote",  //local/remote
			gif_category: null,
			format: common.setFormat(),
			gif_url: msg,
			gif_loop_forever: false,
			servo:null,
			led:null,
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
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