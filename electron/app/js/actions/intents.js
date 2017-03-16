const event = require('js/events/events')

module.exports = function(){
	var intents = {}

	intents.parse = function(cmd){

		if(cmd.includes("camera") && cmd.includes("on")){
			console.log("TURN ON CAMERA")
			event.emit('do',null,'cameraOn')
		}
		else if(cmd.includes("camera") && cmd.includes("off")){
			event.emit('do',null,'cameraOff')
		}
		else if(cmd.includes("activate") && cmd.includes("spotify")){
			event.emit('do',null,'addSkill')
		}
		else if(cmd.includes("play") && cmd.includes("music")){
			event.emit('do',null,'playBeatles')
		}
		else if(cmd.includes("play") && cmd.includes("beatles")){
			event.emit('do',null,'playBeatles')
		}
		else if(cmd.includes("play") && cmd.includes("metallica")){
			event.emit('do',null,'playRock')
		}
		else if(cmd.includes("you") && cmd.includes("well")){
			event.emit('do',null,'didWell')
		}
		else if(cmd.includes("you") && cmd.includes("awesome")){
			event.emit('do',null,'didWell')
		}
		else if(cmd.includes("lights") && cmd.includes("off")){
			event.emit('do',null,'lightsOff')
		}
		else if(cmd.includes("lights") && cmd.includes("on")){
			event.emit('do',null,'lightsOn')
		}
		else if(cmd.includes("please") && cmd.includes("goodbye")){
			console.log("GOODBYE")
			event.emit('do',null,'sayBye')
		}
		else if(cmd.includes("please") && cmd.includes("bye")){
			console.log("GOODBYE")
			event.emit('do',null,'sayBye')
		}
		else if(cmd.includes("hi")){
			event.emit('do',null,'greetPublic')
		}
		else if(cmd.includes("go") && cmd.includes("reddit")){
			event.emit('do',null,'blockReddit')
		}
		else if(cmd.includes("block") && cmd.includes("reddit")){
			event.emit('do',null,'blockReddit')
		}
		else if(cmd.includes("pronounced") && cmd.includes("gif")){
			event.emit('do',null,'gifJif')
		}
		else if(cmd.includes("gif") && cmd.includes("jif")){
			event.emit('do',null,'gifJif')
		}
		else if(cmd.includes("say") && cmd.includes("gif")){
			event.emit('do',null,'gifJif')
		}
		else if(cmd.includes("go") && cmd.includes("sleep")){
			event.emit('do',null,'sleep')
		}
		else if(cmd.includes("wake")){
			event.emit('do',null,'wakeUp')
		} 
		else {
			event.emit('do',null,'unknown')
		}

	}

	return intents
}