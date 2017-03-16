//common gif functions shared by both
//local and downloaded remote gifs
const fs = require('fs')
const spawn = require('child_process').spawn
const path = require('path')
const event = require('js/events/events')

module.exports = function(){

	var common = {}

	common.gifLoopTimer = null;

	var gif= $("#gif")
	var video = $("#video")
	var majorDivs = ["eyeWrapper", "cameraWrapper", "gifWrapper", "pictureWrapper", "sleepWrapper", "videoWrapper"]

	function deleteDownloadedGif(path){
		fs.unlink(path, function(err){
			if(err){
				console.log(err)
			}
		})
	}

	common.setQuery = function(query){

		if(query == null){
			return null
		}

		var data = null

		if(gifType=='local'){

			data = {
				folder: query.local.folder,
				files: common.shuffleAndPickRandom(query.local.files)
			}

		} else if(gifType == 'remote') {

			data = common.shuffleAndPickRandom(query.remote)

		}

		return data
	}

	common.setFormat = function(){
		return (gifType == 'local') ? 'gif' : mediaFormat
	}

	common.play = function(obj){
		event.emit("play-gif", obj)

		if(obj.servo != null){
			event.emit("servo",obj.servo)
		}
		if(obj.led != null){
			event.emit("led",obj.led)
		}
		if(obj.sound != null){
			event.emit("play-sound",obj.sound, obj.loopSound)
		}
	}

	common.setTimer = function(obj){
		// display gif for exactly 2 loops by passing in its duration
		var dur = parseInt(obj.duration)
		var loop = 0

		console.log("SET TIMER");
		event.emit("gif-timer-started",obj)

		// check here to decide how many times to loop based on length of gif
		if(dur<=300){
			loop = 6
		} else if(dur<=800){
			loop = 4
		} else if(dur<=1500){
			loop = 3
		} else if(dur<=3000){
			loop = 2
		} else {
			loop = 1
		}

		if(isNaN(dur)){
			event.emit("gif-timer-ended",obj)
		} else {
			common.gifLoopTimer = setTimeout(function(){
				console.log("END TIMER")
				event.emit("gif-timer-ended",obj)
			}, dur*loop)
		}		
	}

	common.clearTimer = function(){
		console.log("CLEAR GIF TIMER")
		clearTimeout(common.gifLoopTimer)
	}

	common.showGif = function(path){
		gif.attr({'src':path});
	}

	common.showVideo = function(path){
		video.attr({'src':path})
	}

	common.shuffleAndPickRandom = function(array) {
		if(!array){
			return null
		}
	  	var m = array.length, t, i;
 
	  		// While there remain elements to shuffle…
	  	while (m) {

	    	// Pick a remaining element…
	    	i = Math.floor(Math.random() * m--);

	    	// And swap it with the current element.
	    	t = array[m];
	    	array[m] = array[i];
	    	array[i] = t;
	  	}

	  	var randomNumber = Math.floor(Math.random()*array.length)

	  	return array[randomNumber];
	}

	common.findDuration = function(obj){

		var pythonScriptPath = path.join(process.env.PWD,'app', 'gifduration', 'gifduration.py')
		
		var imgpath = null

		if(obj.type == 'remote'){
			imgpath = obj.path.local
		} else {
			imgpath = obj.path
		}

		var python = spawn('python', [pythonScriptPath, imgpath])

		var gifLength = ''

		python.stdout.on('data', function(data){
			gifLength+=data;
		})

		python.stdout.on('close', function(){
			if(!gifLength){
				gifLength = 2000
			}

			obj.duration = gifLength

			common.clearTimer()

			if(obj.type == 'remote'){
				deleteDownloadedGif(obj.path.local)
				obj.path = obj.path.remote
			} 

			event.emit("set-timer", obj)

		})
	}

	common.showDiv = function(div){
		for(var i in majorDivs){
			if(majorDivs[i] != div){
				$("#"+majorDivs[i]).hide()
			} else {
				$("#"+majorDivs[i]).show()
			}
		}
	}

	return common 
}