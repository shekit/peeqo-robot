$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/controlpanel')

	$("body").on("click","#shutdown", function(event){
		event.preventDefault();

		socket.emit("shutdown","yes")
	})

	$("body").on("click","#reboot", function(event){
		event.preventDefault();

		socket.emit("reboot","yes")
	})

	$("body").on("click","#lightsOff", function(event){
		event.preventDefault();

		controlAllLights(false)
	})

	$("body").on("click","#lightsOn", function(event){
		event.preventDefault();

		controlAllLights(true)
	})

	// HUE LIGHTS
	var hueUrl = "http://172.22.151.104/api/3e31399221ae56b717e9c5ae29552ce3/lights/"

	var bulbIds = ["2","3","4","5","6","7"]

	function controlAllLights(state){
		
		for(var i in bulbIds){
			controlLight(bulbIds[i], state)
		}
	}

	function controlLight(id, state){
		// state is either true(on) or false(off)

		//var bulbNumbers = id

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

})