$(document).ready(function(){

	require('app-module-path').addPath(__dirname);
	const path = require('path')
	const ipcRenderer = require('electron').ipcRenderer
	const natural = require('natural')
	const tokenizer = new natural.WordTokenizer()

	// turn console logs off by uncommenting this line

	//console.log = function(){}

	// GLOBALS
	global.isSleeping = false
	global.ledOn = false
	global.mediaType = 'remote' // whether to search 'local' or 'remote'
	global.mediaFormat = 'video'  // use the mp4 or gif version from gif - 'video', 'gif'
	
	// WIFI CONFIG & ONLINE TEST
	const onlineStatus = require('js/wireless/is-online')()

	if(process.platform != 'darwin'){
		const ble = require('js/wireless/ble')()
	}
	
	// SOCKETS
	const power_sockets = require('js/sockets/power')() // shutdown, reboot, refresh
	const demo_sockets = require('js/sockets/demo')()
	const extension_sockets = require('js/sockets/extension')()
	const test_sockets = require('js/sockets/test')()
	const webcontrol_sockets = require('js/sockets/webcontrol')()

	// EVENTS & LISTENERS
	const event = require('js/events/events')
	const listener = require('js/events/listeners')()
	
	

	// RESPONSES
	const response = require('js/data/responses')
	const answer = require('js/actions/response')()

	// START EYES
	event.emit("show-div","eyeWrapper")
	event.emit("start-blinking")


	// RESET EVERYTHING ON BOOP
	$("body").on("click", function(e){
		
		e.preventDefault()

		var boop = path.join(process.cwd(),'app', 'images', 'local', 'boop', '1.gif')

		event.emit("play-gif",boop)

		setTimeout(function(){
			event.emit("reset")
		},2000)

	})


	// ON HOTWORD DETECTION
	/*ipcRenderer.on("hotword", function(evt,arg){
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
			event.emit("do", "listen")
		}
	})

	// ON FINAL RESULT
	ipcRenderer.on("final-results", function(evt,msg){
		console.log("FINAL", msg)
		event.emit('led','off')
		ledOn = false
		tokenizeAndSend(msg.toLowerCase())
		
	})

	// ON PARTIAL RESULT
	ipcRenderer.on("partial-results", function(evt, msg){
		console.log("Partial", msg)
	})*/

	

})