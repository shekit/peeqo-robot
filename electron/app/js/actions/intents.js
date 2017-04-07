const event = require('js/events/events')

module.exports = function(){
	var intents = {}

	intents.parse = function(cmd){

		if(cmd.includes("camera") && cmd.includes("on")){
			event.emit('do','cameraOn')
		}
		else if(cmd.includes("picture") && cmd.includes("take")){
			event.emit('do','cameraOn')
		}
		else if(cmd.includes("camera") && cmd.includes("off")){
			event.emit('do','cameraOff')
		}
		else if(cmd.includes("activate") && cmd.includes("spotify")){
			event.emit('do','addSkill')
		}
		else if(cmd.includes("play") && cmd.includes("music")){
			event.emit('do','playMusic')
		}
		else if(cmd.includes("lights") && cmd.includes("off")){
			event.emit('do','lightsOff')
		}
		else if(cmd.includes("lights") && cmd.includes("on")){
			event.emit('do','lightsOn')
		}
		else if(cmd.includes("bye") || cmd.includes("goodbye")){
			event.emit('do','sayBye')
		}
		else if(cmd.includes("hi") || cmd.includes("hello")){
			event.emit('do','greetPublic')
		}
		else if(cmd.includes("go") && cmd.includes("reddit")){
			event.emit('do','blockReddit')
		}
		else if(cmd.includes('reddit')){
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
		else if(cmd.includes("weather") || cmd.includes("whether")){
			event.emit('get-weather', 'New York')
		}
		else if(cmd.includes("wake")){
			event.emit('do','wakeUp')
		} 
		else if(cmd.includes("remote")){
			mediaType = 'remote'
		} 
		else if(cmd.includes("local")){
			mediaType = 'local'
		}
		else {
			event.emit('do','random')
		}

	}

	return intents
}