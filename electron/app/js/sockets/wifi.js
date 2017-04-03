const config = require('config/config.js')
const wifi = require('js/wireless/wifi')()

var socket = io(config.peeqo.server + '/peeqo_wifi')


module.exports = function(){

	socket.on("wifi", function(data){
		wifi.connect(data.ssid, data.pass)
	})

}