const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){

	Offline.options = {
		checks: {xhr: {url: 'http://google.com'}},
		requests: false,
		checkOnLoad: true
	}

	Offline.on('down', function(){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:"no_internet",
			format: "gif",
			gif_url: null,
			gif_loop_forever: true,
			servo:null,
			led:"error",
			sound:null,
			sound_loop_forever: false
		}

		event.emit("animate", obj)
		// send out ble signal so new wifi can be configured
		//startBleAdvertising();
	})

	Offline.on('up', function(){
		var obj = {
			gif_type:"local",  //local/remote
			gif_category:common.setQueryByType("excited","yay"),
			format:common.setFormat(),
			gif_url: null,
			gif_loop_forever: false,
			servo:"excited",
			led:"success",
			sound:"cheer",
			sound_loop_forever: false
		}

		event.emit("animate", obj)
	})

	Offline.on('checking', function(err){
		if(err){
			console.log("ERROR:",err)
		}
		console.log("checking internet")
	})
}