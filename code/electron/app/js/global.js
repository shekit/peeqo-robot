$(document).ready(function(){
	console.log("hello")
	

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

})