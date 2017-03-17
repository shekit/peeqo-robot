const event = require('js/events/events')
const eyes = require('js/face/eyes')()
const localGif = require('js/gifs/local-gif')()
const remoteGif = require('js/gifs/remote-gif')()
const gifAction = require('js/gifs/common-gif-functions')()
const servo = require('js/senses/servo')()
const led = require('js/senses/led')()
const piControl = require('js/power/shutdown')()
const camera = require('js/senses/camera')()
const hue = require('js/apis/hue')()
const spotify = require('js/apis/spotify')()
const productivity = require('js/actions/productivity')()
const skills = require('js/actions/skills')()
const sound = require('js/senses/sounds')()
const personalize = require('js/face/personalize')()

module.exports = function(){

	//**** EYES ****//
	event.on('start-blinking', function(){
		console.log("EYES - BLINK")
		eyes.startBlinking()
	})

	event.on('stop-blinking', function(){
		console.log("EYES - STOP BLINKING")
		eyes.stopBlinking()
	})

	event.on('close-eyes', function(){
		console.log("EYES - CLOSE")
		eyes.close()
	})

	event.on("start-fast-blink", function(){
		eyes.fastBlink();
	})
	//**** END EYES ****//

	//**** GIFS ****//

	event.on("animate", function(obj){
		console.log("ANIMATE")
		if(obj.type == 'local'){
			console.log("local")
			localGif.find(obj)

		} else if(obj.type == 'remote'){
			console.log("remote")
			remoteGif.find(obj)

		} else {

			if(obj.servo != null){
				event.emit("servo",obj.servo)
			}
			if(obj.led != null){
				event.emit("led",obj.led)
			}
			if(obj.sound != null){
				event.emit("play-sound",obj.sound, obj.loopSound)
			}
			if(obj.callback != null){
				obj.callback()
			}	
			if(obj.path){
				remoteGif.find(obj)
			}
		}
	})

	event.on("set-timer", function(obj){
		console.log("MP4- SET TIMER")
		gifAction.setTimer(obj)
	})

	event.on("find-gif-duration", function(obj){
		console.log("GIF - FIND DURATION")
		gifAction.findDuration(obj)
	})

	event.on("gif-timer-started", function(obj){
		console.log("GIF - TIMER STARTED")
		eyes.transitionToGif(function(){
			gifAction.play(obj)
		})
	})

	event.on("play-gif", function(obj){
		console.log("GIF - PLAY" ,obj)
		if(obj.format=='gif'){
			gifAction.showDiv("gifWrapper")
			gifAction.showGif(obj.path)
		} else if(obj.format=='video') {
			console.log("SHOW VIDEO")
			gifAction.showDiv("videoWrapper")
			gifAction.showVideo(obj.path)
		} else {
			// for music images
			gifAction.showDiv("gifWrapper")
			gifAction.showGif(obj)
		}
		
	})

	event.on("gif-timer-ended", function(obj){
		console.log("GIF - TIMER ENDED")
		gifAction.clearTimer()
		gifAction.showDiv("eyeWrapper")
		if(obj && obj.format == 'video'){
			document.getElementById("video").src = ''
		}
		eyes.transitionFromGif(obj);
	})

	event.on("show-div", function(div){
		gifAction.showDiv(div)
	})

	//**** END GIF ****//

	//**** SERVO ****//
	event.on("servo", function(val){
		console.log("SERVO MOVE:",val)
		servo.animate(val)
	})

	event.on("servo-raw", function(raw_vals){
		servo.animateRaw(raw_vals)
	})
	//**** END SERVO ****//

	//**** LED ****//
	event.on("led", function(val){
		console.log("LED ON: ", val)
		led.animate(val)
	})
	//**** END LED ****//

	//**** CAMERA ****//
	event.on("take-picture", function(bool){
		console.log("CAMERA - CLICK")
		camera.takePicture(bool)
	})

	event.on("camera-off", function(){
		camera.turnOff()
	})
	//**** END CAMERA ****//

	//**** HUE ****//
	event.on("hue", function(state){
		hue.controlLights(state)
	})
	//**** END HUE ****//

	//**** PI POWER ****//
	event.on("shutdown", function(){
		console.log("PI - SHUTDOWN")
		piControl.shutdown()
	})

	event.on("reboot", function(){
		console.log("PI - REBOOT")
		piControl.reboot()
	})

	event.on("refresh", function(){
		console.log("REFRESH")
		event.emit("reset")
		window.location.reload();
	})

	event.on("reset", function(){
		event.emit("servo","reset")
		event.emit("stop-music")
		event.emit("led","off")
		event.emit("camera-off")
		event.emit("show-div","eyeWrapper")
		event.emit("gif-timer-ended",null)
	})
	//**** END PI POWER ****//

	//**** SPOTIFY ****//
	event.on("play-music", function(song){
		spotify.search(song);
	})

	event.on("stop-music", function(){
		spotify.stop()
	})
	//**** END SPOTIFY ****//

	//**** PRODUCTIVITY ****//
	event.on("block-site", function(site,block){
		console.log("BLOCK: ",site,block)
		if(block){
			productivity.blockSite(site)
		} else {
			productivity.unblockSite(site)
		}
	})

	event.on("check-blocked", function(site){
		console.log("CHECK BLOCK: ",site)
		productivity.checkBlocked(site)
	})

	event.on("is-blocked", function(isBlocked){
		console.log("IS BLOCKED: ",isBlocked)
		if(isBlocked){
			productivity.isBlocked()
		}
	})
	//**** END PRODUCTIVITY ****//

	//**** SKILLS ****//

	event.on("learn", function(skill){
		console.log("SKILL LEARN: ",skill)
		skills.learn(skill)
	})

	event.on("unlearn", function(skill){
		console.log("SKILL UNLEARN: ",skill)
		skills.unlearn(skill)
	})

	event.on("do", function(action){
		skills.do(action)
	})

	//**** END SKILLS ****//

	//**** SOUND ****//
	event.on("play-sound", function(name,loop_forever){
		sound.play(name,loop_forever)
	})

	event.on("stop-sound", function(){
		sound.stop()
	})
	//**** END SOUND ****//

	//**** PERSONALIZE ****//
	event.on("change-glasses", function(){
		personalize.changeGlasses()
	})
	//**** END PERSONALIZE ****//

}