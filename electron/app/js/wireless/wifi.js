const piutils = require('pi-utils')
const event = require('js/events/events')
const response = require('js/data/responses')

module.exports = function(){

	var wifi = {}
	
	wifi.scan = function (){
		piutils.wifi.scanNetworks()
			.then((networks, err) => {
				if(err){
					console.log(err)
				}
				return networks
			})
	}

	wifi.getIp = function(){
		return piutils.wifi.getLocalIP()
	}

	wifi.connect = function(ssid, pass){

		piutils.wifi.connect(ssid, pass)
			.then(result => {
				if(result){
					console.log("Connected to wifi")
					var obj = {
						type: gifType,  // local/remote/direct - on system, giphy, direct gif link
						query: common.setQuery(response.other.back), 
						format: common.setFormat(),
						path:null,
						duration: null,
						loop: false,
						servo: response.other.back.servo,
						led:response.other.back.led,
						sound: response.other.back.sound,
						loopSound: false,
						callback: function(){
							console.log("LEDDD OFFF")
							event.emit("led","off")
						}
					}

					event.emit("animate", obj)
				}
			})
	}

	return wifi
}

