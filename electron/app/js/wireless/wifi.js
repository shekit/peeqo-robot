const piutils = require('pi-utils')
const event = require('js/events/events')
const response = require('js/data/responses')
const answer = require('js/actions/response')()

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

					var cb = function(){
						event.emit("led","off")
					}

					answer.answer(response.other.back, cb)

				}
			})
	}

	return wifi
}

