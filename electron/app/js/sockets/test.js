const config = require('config/config.js')
const event = require('js/events/events')
var socket = io(config.peeqo.server + '/peeqo_test')

module.exports = function(){

	socket.on('cameraOn', function(msg){
		event.emit('do',null,'cameraOn')
	})

	socket.on('cameraOff', function(msg){
		event.emit('do',null,'cameraOff')
	})

	socket.on("takePicture", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"countdown",
			gif_url: null,
			gif_loop_forever: true,
			servo:null,
			led:null,
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
		setTimeout(function(){
			event.emit("take-picture", true)
		},4000)
	})

	socket.on('activateMusic', function(msg){
		event.emit('do',null,'addSkill')
	})

	socket.on("deactivateMusic", function(msg){
		event.emit("unlearn","spotify")
	})

	socket.on("playMusic", function(msg){
		event.emit("play-music", "beatles")
	})

	socket.on("stopMusic", function(msg){
		event.emit("stop-music")
	})

	socket.on("lightsOn", function(msg){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"thumbs_up",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"success",
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("hue",true)
			}
		}

		event.emit("animate", obj)
	})

	socket.on("lightsOff", function(msg){

		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"thumbs_up",
			gif_url: null,
			gif_loop_forever: false,
			servo:"lookup",
			led:"success",
			sound:null,
			sound_loop_forever: false,
			callback: function(){
				event.emit("hue",false)
			}
		}

		event.emit("animate", obj)
	})

	socket.on('blockReddit', function(msg){
		event.emit('do',null,'blockReddit')
	})

	socket.on("blockFacebook", function(msg){
		event.emit("block-site", "facebook", true)
		event.emit("block-site", "reddit", true)
	})

	socket.on("blockTwitter", function(msg){
		event.emit("block-site", "twitter", true)
	})

	socket.on("unblockFacebook", function(msg){
		event.emit("block-site", "facebook", false)
		event.emit("block-site", "reddit", false)
	})

	socket.on("unblockTwitter", function(msg){
		event.emit("block-site", "twitter", false)
	})

	socket.on("blinkLed", function(msg){
		event.emit("led","error")
	})

}