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
	const intent = require('js/actions/intents')()
	

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


	const record = require('node-record-lpcm16')

	const os = require('os')
	const config = require(path.join(process.cwd(),"app","config","config"))

	// SNOWBOY
	const Detector = require('snowboy').Detector;
	const Models = require('snowboy').Models;

	const models = new Models();

	models.add({
		file: path.join(process.cwd(), 'app','config', config.speech.model),
		sensitivity: config.speech.sensitivity,
		hotwords: 'peeqo'
	})

	const snowboyDetector = new Detector({
		resource: path.join(process.cwd(), 'app','config', 'common.res'),
		models: models,
		audioGain: 2.0
	})

	// NODE RECORD

	var recorder = (os.arch()=='arm')?'arecord':'rec'

	const opts = {
		verbose: false,
		threshold: 0,
		recordProgram: recorder
	}




	// GOOGLE CLOUD SPEECH
	const speech = require('@google-cloud/speech')({
	  projectId: config.speech.projectId,
	  keyFilename: path.join(process.cwd(), 'app','config', config.speech.keyFilename)
	})

	const request = {
		config:{
			encoding: "LINEAR16",
			sampleRate: 16000,
			languageCode: config.speech.language
		},
		singleUtterance: true,
	    interimResults: true
	}



	const mic = record.start(opts)

	// SPEECH CLASS
	class GoogleSpeech {
		constructor(request){
			this.request = request
			this.stream = speech.createRecognizeStream(request)
			this.result = ''
		}

		unpipeStream(stream){
			mic.unpipe(stream)
		}

		endStream(stream){
			stream.end()
		}

		startStream(){

			var self = this

			this.stream.on('pipe', function(){
				console.log('PIPING > GOOGLE')
			})

			this.stream.on('error', function(err){
				console.error('ERROR > GOOGLE', err)
			})

			this.stream.on('close', function(){
				console.log('GOOGLE PIPE > CLOSED')
			})

			this.stream.on('data', function(data){

				//var result = data.results[0]

				//console.log(data)

				if(data.endpointerType === 'END_OF_UTTERANCE'){
					console.log("GOOGLE END OF UTTERANCE")
					mic.unpipe(self.stream)
				}

				if(data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED'){
					//console.log(data)
					self.result = data.results
					//console.log(main.result)
					// if(result && !result.isFinal){
					// 	console.log("!p:", result)
					// } else if(result && result.isFinal){
					// 	console.log("!F:", result)
					// }
				}

				if(data.error){
					console.error("GOOGLE DATA ERROR", data.error)
				}

				if(data.endpointerType === 'START_OF_SPEECH'){
					console.log("GOOGLE DETECTED SPEECH")
				}

				if(data.endpointerType === 'END_OF_SPEECH'){
					console.log("GOOGLE END OF SPEECH")
				}

				if(data.endpointerType === 'END_OF_AUDIO'){
					console.log("GOOGLE END OF AUDIO")
				}
			})

			this.stream.on('unpipe', function(){
				console.log('UNPIPING > GOOGLE')
				self.stream.end()
			})

			this.stream.on('finish', function(){
				console.log('FINISHED > GOOGLE')
				event.emit("final-command",self.result)
				mic.pipe(snowboyDetector)
			})

			mic.pipe(this.stream)
		}

	}

	// SNOWBOY EVENTS
	snowboyDetector.on('unpipe', function(src){
		console.log('STOPPED PIPING > SNOWBOY')
	})

	snowboyDetector.on('pipe', function(src){
		console.log('PIPING > SNOWBOY')
	})

	snowboyDetector.on('error', function(err){
		console.error("SNOWBOY ERROR:",err)
	})

	snowboyDetector.on('close', function(){
		console.log("SNOWBOY PIPE CLOSED")
	})

	snowboyDetector.on('hotword', function(index, hotword){
		console.log('HOTWORD', index, hotword)
		event.emit('hotword','yes')
		mic.unpipe(snowboyDetector)
		const gNew = new GoogleSpeech(request)
		gNew.startStream()
	})

	snowboyDetector.on('data', function(data){
		console.log("SNOWBOY DATA", data)
	})

	// START LISTENING

	mic.pipe(snowboyDetector)


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
	})

	function tokenizeAndSend(string){
		var words = tokenizer.tokenize(string)

		if(words.length){
			intent.parse(words)
		}
	}

})