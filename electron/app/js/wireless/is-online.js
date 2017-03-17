const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()
const response = require('js/data/responses')
const answer = require('js/actions/response')()

module.exports = function(){

	Offline.options = {
		checks: {xhr: {url: 'http://google.com'}},
		requests: false,
		checkOnLoad: true
	}

	Offline.on('down', function(){

		answer.answer({msg:response.other.offline, gifloop:true, type:'local'})

		// send out ble signal so new wifi can be configured
		//startBleAdvertising();
	})

	// Offline.on('up', function(){

	// 	answer.answer({msg:response.reaction.excited})

	// })

	Offline.on('checking', function(err){
		if(err){
			console.log("ERROR:",err)
		}
		console.log("checking internet")
	})
}