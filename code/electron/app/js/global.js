$(document).ready(function(){

	var wrapper = $("#wrapper");

	var config = require('./config/config.js');

	var apiConfig = {
		server: config.server,
		token: config.token,
		sessionId: config.sessionId
	}

	var apiAi = new ApiAi(config);
	
	var temp = Handlebars.templates.eyes;

	if(annyang){
		console.log("Annyang detected");

		var commands = {
			"hello": activateListening
		}

		annyang.addCommands(commands);

		annyang.start();
	}

	function activateListening(){
		console.log("You said hello");
	}

	$("#test").on('click', function(){
		wrapper.html(temp({"name":"abhishek"}))
	})

})