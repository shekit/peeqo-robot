const piutils = require('pi-utils')

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
				}
			})
	}

	return wifi
}

