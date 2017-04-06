const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){
	var response = {}

	response.answer = function({msg=null, cb=null, gifloop=false, soundloop=false, type=null, servo=null, query=null, format=null, path=null, textOverlay=null} = {}){

		var move = null

		if(servo){
			move = servo
		} else if(msg){
			move = msg.servo
		}

		var obj = {
					type: (type)?type:mediaType,  // local/remote/direct - on system, giphy, direct gif link
					query: query || common.setQuery(msg), 
					format: format || common.setFormat(),
					path: path || null,
					textOverlay: (textOverlay)?textOverlay:null,
					duration: null,
					loop: gifloop,
					servo: move,
					led: (msg)?msg.led:null,
					sound: (msg)?msg.sound:null,
					loopSound: soundloop,
					callback: cb 
				}

		event.emit("animate", obj)

	}

	return response	
}