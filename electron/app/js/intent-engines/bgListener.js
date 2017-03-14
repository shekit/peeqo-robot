
var Hotword = require('./hotword')

const hotword = Hotword.init()

Hotword.start(hotword)

hotword.on('hotword', function(index, keyword){
	console.log("hotword")
})

hotword.on('error', function(err){
	console.log("ERROR:",err)
})

hotword.on('silence', function(){
	console.log("SILENCE")
})

hotword.on('sound', function(){
	console.log("SOUND")
})

hotword.on('partial-result', function(res){
	console.log("PARTIAL:",res)
})

hotword.on('final-result', function(res){
	console.log("RESULT:",res)
})