const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){
	var response = {}

	response.answer = function(msg, cb){

		var obj = {
					type: gifType,  // local/remote/direct - on system, giphy, direct gif link
					query: common.setQuery(msg), 
					format: common.setFormat(),
					path:null,
					duration: null,
					loop: false,
					servo: msg.servo || null,
					led: msg.led || null,
					sound: msg.sound || null,
					loopSound: false,
					callback: cb
				}

		event.emit("animate", obj)

	}

	return response	
}