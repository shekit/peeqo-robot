const config = require('config/config.js')
const event = require('js/events/events')
var socket = io(config.peeqo.server + '/peeqo_demo')

module.exports = function(){

	socket.on("sleep", function(msg){

		var obj = {
			gif_type:null,  //local/remote
			gif_category:null,
			gif_url: null,
			gif_loop_forever: false,
			servo:"sleep",
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("close-eyes")
			}
		}

		event.emit("animate",obj)
	})

	socket.on("wake", function(msg){

		event.emit("stop-sound")
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"hello",
			gif_url: null,
			gif_loop_forever: false,
			servo:"wakeup",
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("start-fast-blink")
			}
		}
		event.emit("animate", obj)
	})

	socket.on("listen", function(msg){

		var obj = {
			gif_type:null,  //local/remote/null
			gif_category:null,
			gif_url: null,
			gif_loop_forever: false,
			servo:"alert",
			led:"alert",
			sound:"alert",
			sound_loop_forever: false
		}

		event.emit("animate",obj)
	})

	socket.on("hi", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"hello",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"greenBlink",
			sound:"hi",
			sound_loop_forever: false,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on("bye", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"bye",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"blueBlink",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on("yes", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"yes",
			gif_url: null,
			gif_loop_forever: false,
			servo:"yes",
			led:null,
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	socket.on('sad', function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"r_sad",
			gif_url: null,
			gif_loop_forever: false,
			servo:"sad",
			led:"fadeRed",
			sound:"sad",
			sound_loop_forever: false,
			callback: null
		}

		event.emit("animate", obj)
	})

	socket.on("reset", function(msg){
		event.emit("reset")
	})


}