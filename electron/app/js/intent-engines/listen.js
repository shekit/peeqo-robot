const record = require('node-record-lpcm16')

module.exports = function(){

	var mic = {}

	mic.mic = null;

	mic.start = function(detector){
		mic.mic = record.start({
			threshold: 0,
			verbose: false
		})
		detect(detector)
	}

	function detect(detector){
		mic.mic.pipe(detector)
	}

	return mic
}