const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

module.exports = function(){

	var latestImage = null
	var selfie = $("#selfie")
	var video = $("#camera")
	var track = null;
	var chunks = []
	var mediaRecorder = null

	var camera = {}


	camera.startRecording = function(){
		navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

        if(navigator.getUserMedia){
        	navigator.getUserMedia({audio:false, video:true}, function(stream){
        		video.attr({'src':URL.createObjectURL(stream)})
        		mediaRecorder = new MediaRecorder(stream)
        		track = stream.getTracks()[0]

        		video.on('loadedmetadata', function(e){
        			video.get(0).play()
        			event.emit("show-div", "cameraWrapper")

        			if(mediaRecorder.state != 'recording'){
        				console.log("STARTING RECORDING")
        				mediaRecorder.start()
        			}
        			//console.log("Recording started", mediaRecorder.state)

        			setTimeout(function(){
        				if(mediaRecorder.state != 'inactive'){
        					console.log("STOPPED RECORDING")
        					mediaRecorder.stop()
        				}
        			}, 3000)

        			mediaRecorder.ondataavailable = function(e){
        				if(e.data.size>0){
        					chunks.push(e.data)
        				}
						
					}

					mediaRecorder.onstop = function(e){
						//console.log("Recording stopped")

						var blob = new Blob(chunks, {'type':'video/webm; codecs=vp9'})
						chunks = []
						var videoUrl = window.URL.createObjectURL(blob)
						selfie.attr({'src':videoUrl})
						event.emit("show-div", "pictureWrapper")
						if(track){
							console.log("STOPPED TRACK")
							track.stop()
							stream.getTracks()[0].stop()
							track = null
							video.attr({'src':''})
						}
						console.log(mediaRecorder.state)
						

						setTimeout(function(){
							event.emit("show-div","eyeWrapper")
							event.emit("gif-timer-ended", null)
						},6000)

					}

        		})


        	}, function(err){
        		console.log("Error recording stream")
        	})
        } else {
        	console.log("Get user media not supported")
        }
	}



	camera.stopRecording = function(){
		if(mediaRecorder){
			mediaRecorder.stop()
		}
		if(track){
			track.stop()
			event.emit("show-div","eyeWrapper")
			event.emit("gif-timer-ended", null)
		}
	}

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