const event = require('js/events/events')

module.exports = function(){
	var intents = {}

	intents.parse = function(cmd){

		if(cmd.includes("camera") && cmd.includes("on")){
			console.log("TURN ON CAMERA")
			event.emit('do','cameraOn')
		}
		else if(cmd.includes("camera") && cmd.includes("off")){
			event.emit('do','cameraOff')
		}
		else if(cmd.includes("activate") && cmd.includes("spotify")){
			event.emit('do','addSkill')
		}
		else if(cmd.includes("play") && cmd.includes("music")){
			event.emit('do','playBeatles')
		}
		else if(cmd.includes("play") && cmd.includes("beatles")){
			event.emit('do','playBeatles')
		}
		else if(cmd.includes("play") && cmd.includes("metallica")){
			event.emit('do','playRock')
		}
		else if(cmd.includes("you") && cmd.includes("well")){
			event.emit('do','didWell')
		}
		else if(cmd.includes("you") && cmd.includes("awesome")){
			event.emit('do','didWell')
		}
		else if(cmd.includes("lights") && cmd.includes("off")){
			event.emit('do','lightsOff')
		}
		else if(cmd.includes("lights") && cmd.includes("on")){
			event.emit('do','lightsOn')
		}
		else if(cmd.includes("please") && cmd.includes("goodbye")){
			console.log("GOODBYE")
			event.emit('do','sayBye')
		}
		else if(cmd.includes("please") && cmd.includes("bye")){
			console.log("GOODBYE")
			event.emit('do','sayBye')
		}
		else if(cmd.includes("hi")){
			event.emit('do','greetPublic')
		}
		else if(cmd.includes("go") && cmd.includes("reddit")){
			event.emit('do','blockReddit')
		}
		else if(cmd.includes("block") && cmd.includes("reddit")){
			event.emit('do','blockReddit')
		}
		else if(cmd.includes("pronounced") && cmd.includes("gif")){
			event.emit('do','gifJif')
		}
		else if(cmd.includes("gif") && cmd.includes("jif")){
			event.emit('do','gifJif')
		}
		else if(cmd.includes("say") && cmd.includes("gif")){
			event.emit('do','gifJif')
		}
		else if(cmd.includes("go") && cmd.includes("sleep")){
			event.emit('do','sleep')
		}
		else if(cmd.includes("wake")){
			event.emit('do','wakeUp')
		} 
		else {
			event.emit('do','unknown')
		}

	}

	return intents
}