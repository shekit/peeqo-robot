// module to control hue lights

const config = require('config/config.js')
const event = require('js/events')
	
module.exports = function(){
	var hueUrl = config.hue.ip+"/api/"+config.hue.user+"/lights/"
	var bulbIds = ["1,","2","3","4","5","6","7"]

	var hue = {}

	hue.controlLights = function(state){
		for(var i in bulbIds){
			hue.controlLight(bulbIds[i], state)
		}
	}

	hue.controlLight = function(id, state){
		// state is either true(on) or false(off)

		$.ajax({
			type: "PUT",
			url: hueUrl + id + "/state",
			data: JSON.stringify({"on":state}),
			success: function(msg){
				console.log("ON")
			},
			error: function(err){
				console.log("ERROR: " + err)
			}
		})
	}

	return hue
}