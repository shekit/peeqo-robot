const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){
	var response = {}

	response.answer = function({msg=null, cb=null, gifloop=false, soundloop=false, forceLocal=false} = {}){

		var obj = {
					type: (forceLocal == true) ? 'local':gifType,  // local/remote/direct - on system, giphy, direct gif link
					query: common.setQuery(msg), 
					format: common.setFormat(),
					path:null,
					duration: null,
					loop: gifloop,
					servo: (msg)?msg.servo:null,
					led: (msg)?msg.led:null,
					sound: (msg)?msg.sound:null,
					loopSound: soundloop,
					callback: cb 
				}

		event.emit("animate", obj)

	}

	return response	
}