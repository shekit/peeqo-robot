$(document).ready(function(){

	// Add directories to module search path, Prevents requiring local imports like ./js/lib/abc.js - instead becomes js/lib/abc.js
	require('app-module-path').addPath(__dirname);
	const path = require('path')
	global.isSleeping = false
	global.ledOn = false
	const ipcRenderer = require('electron').ipcRenderer

	const natural = require('natural')
	const tokenizer = new natural.WordTokenizer()
	
	const onlineStatus = require('js/check-online-status')()
	
	////**** WIFI SCANNING ****////

	
	
	const socket = require('js/socket')()

	const event = require('js/events')
	const listeners = require('js/listeners')()

	event.emit("show-div","eyeWrapper")
	event.emit("start-blinking")

	$("body").on("click", function(e){
		
		var boop = path.join(__dirname, './images', 'local', 'r_boop', 'boop.gif')
		event.emit("servo","boop")
		event.emit("stop-music")
		event.emit("play-gif",boop)

		setTimeout(function(){
			event.emit("gif-timer-ended",null)
		},2000)
	})

	ipcRenderer.on("hotword", function(evt,arg){
		console.log("HOTWORD",arg)
		ledOn = true

		setTimeout(function(){
			if(ledOn == true){
				event.emit("led", "off")
			}
		},3000)

		if(isSleeping){
			event.emit("led", "fadeRed")
		} else {
			var obj = {
				gif_type:null,  //local/remote/null
				gif_category:null,
				gif_url: null,
				gif_loop_forever: false,
				servo:"alert",
				led:"alert",
				sound:"alert",
				sound_loop_forever: false,
				callback: null
			}

			event.emit("animate", obj)
		}
	})
	ipcRenderer.on("final-results", function(evt,msg){
		console.log("FINAL", msg)
		event.emit('led','off')
		ledOn = false
		tokenizeAndSend(msg.toLowerCase())
		
	})
	ipcRenderer.on("partial-results", function(evt, msg){
		console.log("Partial", msg)
	})

	function tokenizeAndSend(string){
		var words = tokenizer.tokenize(string)

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

})