const config = require('config/config.js')
const event = require('js/events')

const apiConfig = {
	server: config.apiAi.server,
	token: config.apiAi.token,
	sessionId: config.apiAi.sessionId
}

var apiState = false

module.exports = function(){

	var ai = {}

	ai.apiAi = new ApiAi(apiConfig)

	ai.listeningDuration = 2000

	ai.start = function(){
		ai.apiAi.init();
	}

	ai.stop = function(){
		ai.apiAi.stopListening();
	}

	ai.stateIsOpen = function(api){
		return apiState
	}

	ai.timer = function(duration){
		setTimeout(function(){
			ai.stop()
		}, duration)
	}

	ai.apiAi.onInit = function(){
		console.log("APIAI INITED")


		// attempt to reinitialize if it does not initialize
		if(ai.apiAi.isInitialise()){
			ai.apiAi.open();
		} else {
			console.log("Attempting to reinitialize")
			ai.apiAi.init()
		}
	}

	ai.apiAi.onOpen = function(){
		console.log("APIAI OPENED")
		apiState = true
		ai.apiAi.startListening();

		// start timer to auto stop listening
		ai.timer(ai.listeningDuration)
	}

	ai.apiAi.onClose = function(){
		console.log("APIAI CLOSED")
		apiState = false
		event.emit("led","off")
	}

	ai.apiAi.onStartListening = function(){
		console.log("APIAI STARTED LISTENING")
	}

	ai.apiAi.onStopListening = function(){
		console.log("APIAI STOP LISTENING")
		apiState = false
	}

	ai.apiAi.onResults = function(data){
		//sendLedAnimation("success")
		ai.apiAi.close()
		console.log(data.result)
		console.log(ai.apiAi.isOpen())
		if(data.result){
			var obj = data.result;
			var action = data.result.action;
			event.emit("do",obj,action)
			//event.emit("led","success")
		} else {
			event.emit("led","error")
		}
		
	}

	ai.apiAi.onError = function(code , data){
		console.log("ERROR: " + code + " " + data)
	}

	return ai
}