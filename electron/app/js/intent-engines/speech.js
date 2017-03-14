const path = require('path')
const config = require('config/config')
const googleSpeech = require('@google-cloud/speech')
const record = require('node-record-lpcm16')

var options = {
	config: {
		encoding: 'LINEAR16',
		sampleRate: 16000
	}
}

module.exports = function(){

	var google = {}

	var speech = googleSpeech({
		projectId: config.google.speech.id,
		keyFilename: path.join(__dirname, '../config', config.google.speech.keyfile)
	})

	google.detector = speech.createRecognizeStream(options)
		
	google.detector.on('error', function(err){
		console.log("ERROR: ", err)
	})

	google.detector.on('data', function(data){
		console.log(data.results)
	})

	return google
}