$(document).ready(function(){

	require('app-module-path').addPath(__dirname);
	const path = require('path')
	const ipcRenderer = require('electron').ipcRenderer
	const natural = require('natural')
	const tokenizer = new natural.WordTokenizer()

	// GLOBALS
	global.isSleeping = false
	global.ledOn = false
	
	// WIFI CONFIG & ONLINE TEST
	const onlineStatus = require('js/wireless/is-online')()
	const ble = require('js/wireless/ble')()

	// SOCKETS
	const power_sockets = require('js/sockets/power')() // shutdown, reboot, refresh
	const demo_sockets = require('js/sockets/demo')()
	const extension_sockets = require('js/sockets/demo')()
	const test_sockets = require('js/sockets/test')()
	const webcontrol_sockets = require('js/sockets/webcontrol')()

	// EVENTS & LISTENERS
	const event = require('js/events/events')
	const listener = require('js/events/listeners')()
	const intent = require('js/actions/intents')()


	// START EYES
	event.emit("show-div","eyeWrapper")
	event.emit("start-blinking")


	// RESET EVERYTHING ON BOOP
	$("body").on("click", function(event){
		
		event.preventDefault()

		var boop = path.join(__dirname, './images', 'local', 'r_boop', 'boop.gif')

		event.emit("play-gif",boop)

		setTimeout(function(){
			event.emit("reset")
		},2000)
	})


	// ON HOTWORD DETECTION
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
	})

	function tokenizeAndSend(string){
		var words = tokenizer.tokenize(string)

		intent.parse(words)
	}

})