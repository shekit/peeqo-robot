const event = require('js/events/events')

module.exports = function(){
	var intents = {}

	intents.parse = function(cmd){

		if(words.includes("camera") && words.includes("on")){
			console.log("TURN ON CAMERA")
			event.emit('do',null,'cameraOn')
		}
		else if(words.includes("camera") && words.includes("off")){
			event.emit('do',null,'cameraOff')
		}
		else if(words.includes("activate") && words.includes("spotify")){
			event.emit('do',null,'addSkill')
		}
		else if(words.includes("play") && words.includes("music")){
			event.emit('do',null,'playBeatles')
		}
		else if(words.includes("play") && words.includes("beatles")){
			event.emit('do',null,'playBeatles')
		}
		else if(words.includes("play") && words.includes("metallica")){
			event.emit('do',null,'playRock')
		}
		else if(words.includes("you") && words.includes("well")){
			event.emit('do',null,'didWell')
		}
		else if(words.includes("you") && words.includes("awesome")){
			event.emit('do',null,'didWell')
		}
		else if(words.includes("lights") && words.includes("off")){
			event.emit('do',null,'lightsOff')
		}
		else if(words.includes("lights") && words.includes("on")){
			event.emit('do',null,'lightsOn')
		}
		else if(words.includes("please") && words.includes("goodbye")){
			console.log("GOODBYE")
			event.emit('do',null,'sayBye')
		}
		else if(words.includes("please") && words.includes("bye")){
			console.log("GOODBYE")
			event.emit('do',null,'sayBye')
		}
		else if(words.includes("hi")){
			event.emit('do',null,'greetPublic')
		}
		else if(words.includes("go") && words.includes("reddit")){
			event.emit('do',null,'blockReddit')
		}
		else if(words.includes("block") && words.includes("reddit")){
			event.emit('do',null,'blockReddit')
		}
		else if(words.includes("pronounced") && words.includes("gif")){
			event.emit('do',null,'gifJif')
		}
		else if(words.includes("gif") && words.includes("jif")){
			event.emit('do',null,'gifJif')
		}
		else if(words.includes("say") && words.includes("gif")){
			event.emit('do',null,'gifJif')
		}
		else if(words.includes("go") && words.includes("sleep")){
			event.emit('do',null,'sleep')
		}
		else if(words.includes("wake")){
			event.emit('do',null,'wakeUp')
		} 
		else {
			event.emit('do',null,'unknown')
		}
		
	}

	return intents
}