const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){

	var latestImage = null
	var selfie = $("#selfie")
	var video = $("#camera")
	var track = null;

	var camera = {}

	camera.takePicture = function(take_picture){
		
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

		var constraints = {audio:false, video:{width:800, height:480}}

		navigator.getUserMedia({audio:false, video:true}, function(stream){
			video.attr({'src':URL.createObjectURL(stream)})
			track = stream.getTracks()[0]

			video.on('loadedmetadata', function(e){
				
				video.get(0).play();
				event.emit("show-div","cameraWrapper")
				//start gifshot once camera is loaded
				if(take_picture){
					camera.captureGif();
				}
				
			})			

		}, function(err){
			// show error image
			console.log("error: " + err)
		})
	}


	camera.turnOff = function() {
		if(track){
			track.stop()
			event.emit("show-div","eyeWrapper")
			event.emit("gif-timer-ended", null)
		}
	}

	camera.captureGif = function(socket){

		gifshot.createGIF({
			'gifWidth':800,
			'gifHeight':480,
			//'text':'',
			'numFrames': 5,
			'keepCameraOn': false,
			//'completeCallback':function(){
			//	console.log("done");
			//}
			//'saveRenderingContexts': true,

		}, function(obj){
			if(!obj.error){
				//gifshot.stopVideoStreaming();
				var image = obj.image;

				selfie.attr({'src':image})

				// use this to save the image to be able to send/email
				latestImage = image


				//stop this stream
				obj.cameraStream.getTracks()[0].stop()
				
				//stop sep webcam stream
				if(track){
					track.stop()
				}
				
				event.emit("show-div", "pictureWrapper")

				var state = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("compliment","you look great"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"lookup",
					led:"success",
					sound:null,
					sound_loop_forever: false
				}

				

				setTimeout(function(){
					event.emit("animate", state)
				},5000)

				camera.sendPicture(latestImage,socket)	
				
			}
		})
	}

	camera.sendPicture = function(img,socket){
		if(img){
			socket.emit("img", img)
			console.log("sent image")
		} else if(latestImage){
			socket.emit("img", latestImage)
		}
	}

	return camera

}