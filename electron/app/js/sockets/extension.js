const config = require('config/config.js')
const event = require('js/events/events')
var socket = io(config.peeqo.server + '/peeqo_extension')

module.exports = function(){

	socket.on("blocked", function(msg){

		if(msg.indexOf("facebook")>-1){
			msg = "facebook"
		} else if(msg.indexOf("twitter")>-1){
			msg = "twitter"
		} else if(msg.indexOf("reddit")>-1){
			msg = "reddit"
		}
		event.emit("check-blocked",msg)
	})

	

}