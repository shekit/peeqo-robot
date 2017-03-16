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

	common.setQueryByType = function(textForLocal, textForRemote){
		return (gifType=='local') ? textForLocal : textForRemote
	}

	common.play = function(gifpath, obj){
		event.emit("play-gif", gifpath)

		if(obj.servo != null){
			event.emit("servo",obj.servo)
		}
		if(obj.led != null){
			event.emit("led",obj.led)
		}
		if(obj.sound != null){
			event.emit("play-sound",obj.sound, obj.sound_loop_forever)
		}
	}

	common.setTimer = function(duration, path, obj){
		// display gif for exactly 2 loops by passing in its duration
		console.log("DURATION: ", duration)
		var dur = parseInt(duration)
		var loop = 0

		event.emit("gif-timer-started",path,obj)

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
		mp4.attr({'src':path})
	}

	common.shuffle = function(array) {
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

	  	return array;
	}

	common.findDuration = function(gifpath, obj, remote_url){
		console.log(gifpath,remote_url)
		var pythonScriptPath = path.join(process.env.PWD, 'gifduration', 'gifduration.py')

		var python = spawn('python', [pythonScriptPath, gifpath])

		var gifLength = ''

		python.stdout.on('data', function(data){
			gifLength+=data;
		})

		python.stdout.on('close', function(){

			if(!gifLength){
				gifLength = 2000
			}
			common.clearTimer()

			if(obj.gif_type == 'remote'){
				deleteDownloadedGif(gifpath)
				event.emit("set-timer", gifLength, remote_url, obj)
			} else {
				event.emit("set-timer", gifLength, gifpath, obj)
			}


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