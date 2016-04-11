$(document).ready(function(){
	console.log("hello")

	var wrapper = $("#wrapper")
	
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