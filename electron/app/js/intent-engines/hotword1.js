const record = require('node-record-lpcm16')
const Detector = require('snowboy').Detector
const Models = require('snowboy').Models
const path = require('path')
const apiAi = require('js/api.ai')()

const google = require('js/speech')()
const mic = require('js/listen')()

const event = require('js/events')

var models = new Models()

models.add({
	file: path.join(__dirname, 'data/Peeqo.pmdl'),
	sensitivity: '0.5',
	hotwords : 'peeqo'
})

module.exports = function(){

	var snowboy = {}

	snowboy.detector = new Detector({
		resource: path.join(__dirname, 'data/common.res'),
		models: models,
		audioGain: 2.0
	})

	snowboy.detector.on('silence', function(){
		//console.log('silence')
		// if(apiAi.apiAi.isOpen()){
		// 	apiAi.stop();
		// }
	})

	snowboy.detector.on('sound', function(){
		//console.log('sound')
	})

	snowboy.detector.on('error', function(){
		//console.log('error')
	})

	snowboy.detector.on('hotword', function(index, hotword){
		console.log('hotword', index, hotword)
		mic.start(google.detector)
		// if(!apiAi.stateIsOpen() && !isSleeping){
		// 	console.log("LISTEN")
		// 	var obj = {
		// 		gif_type:null,  //local/remote/null
		// 		gif_category:null,
		// 		gif_url: null,
		// 		gif_loop_forever: false,
		// 		servo:"alert",
		// 		led:"alert",
		// 		sound:"alert",
		// 		sound_loop_forever: false,
		// 		callback: function(){
		// 			setTimeout(function(){
		// 				event.emit("listen")
		// 			},800)
		// 		}
		// 	}

		// 	event.emit("animate", obj)

		// } else if(!apiAi.stateIsOpen() && isSleeping){
		// 	console.log("WAKE UP")
		// 	event.emit("led","fadeRed")
		// 	event.emit("listen")
		// }
		
	})

	return snowboy

}