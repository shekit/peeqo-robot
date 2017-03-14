const piutils = require('pi-utils')
const event = require('js/events/events')

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
					console.log("Connected")
					var obj = {
						gif_type:null,  //local/remote
						gif_category:null,
						gif_url: null,
						gif_loop_forever: true,
						servo:null,
						led:"success",
						sound:null,
						sound_loop_forever: false
					}

					event.emit("animate", obj)
				}
			})
	}

	return wifi
}

