const path = require('path')

module.exports = function(){

	var sound = {}

	sound.audio = document.getElementById("sound")

	sound.play = function(name,should_loop){
		sound.audio.currentTime = 0
		sound.audio.loop = should_loop
		sound.audio.src = path.join(__dirname, "../", "sounds", name + ".wav")
		sound.audio.play()
	}

	sound.stop = function(){
		sound.audio.currentTime = 0
		sound.audio.pause()
		sound.audio.src = ''
	}

	return sound
}