const path = require('path')
const config = require('config/config')
const request = require('request')
const record = require('node-record-lpcm16')

module.exports = function(){
	record.start().pipe(request.post({
		'url':'https://api.wit.ai/speech?client=chromium&lang=en-us&output=json',
		'headers':{
			'Accept'        : 'application/vnd.wit.20161219+json',
	    	'Authorization' : 'Bearer ' + config.wit.token,
	    	'Content-Type'  : 'audio/wav'
		}
	}, parseResult))

	function parseResult(err, resp, body){
		console.log(body)
	}
}

