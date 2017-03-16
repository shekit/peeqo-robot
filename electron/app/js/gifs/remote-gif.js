const request = require('request')
const path = require('path')
const fs = require('fs')
const shortid = require('shortid')

const config = require('config/config.js')

const giphy = require('giphy-api')(config.giphy.key);
const event = require('js/events/events')

module.exports = function(){

	var remote = {}

	function checkGifSize(obj){
		var original_gif_size = parseInt(obj.path.original.size);

		if(original_gif_size <= config.giphy.max_gif_size){
			obj.path = obj.path.original.url
		} else {
			obj.path = obj.path.fixed_width_small.url //findSmallerGif(obj,false);
		}

		download(obj)
	}

	function checkVideoSize(obj){

		var original_video_size = parseInt(obj.path.original.mp4_size)

		if(original_video_size <= config.giphy.max_mp4_size){
			obj.path = obj.path.original.mp4
		} else {
			obj.path = obj.path.fixed_width.mp4
		}

		setVideo(obj)
	}

	function setVideo(obj){
		var video = document.getElementById("dummyVideo")
		video.src = obj.path


		var interval = setInterval(function(){
			if(video.readyState > 0){
				clearInterval(interval)
				findVideoDuration(obj)
			}
		},10)

	}

	function findVideoDuration(obj){

		var video = document.getElementById("dummyVideo")
		duration = video.duration*1000
		video.src = ''

		obj.duration = duration

		event.emit("set-timer", obj)
	}

	function findSmallerGif(obj, smallest){
		// find higher quality gif if original is too large
		// and use it to be displayed
		// is smallest parameter == true, find smallest gif to download for duration checking

		var fixed_height_size = parseInt(obj.fixed_height_small.size);
		var fixed_width_size = parseInt(obj.fixed_width_small.size)

		if(smallest){
			if(fixed_width_size <= fixed_height_size){
				return obj.fixed_width_small.url
			} else {
				return obj.fixed_height_small.url
			}
		} else {
			return obj.downsized.url
		}	
	}

	function download(obj){
		var dirpath = path.join(process.env.PWD, "app","images", "downloaded")
		var uuid = shortid.generate();

		if(!fs.existsSync(dirpath)){
			fs.mkdirSync(dirpath)
		}

		var gifPath = path.join(dirpath, uuid+".gif")
		obj.path = gifPath

		request(obj.path).pipe(fs.createWriteStream(gifPath)).on('close', function(){
			event.emit("find-gif-duration",obj)
		})
	}


	remote.find = function(obj){

		if(obj.type == 'remote'){
			giphy.translate(obj.query, function(err, res){

				if(err || !res){
					//show sad local gif
					//try again
					//event.emit("find-local-gif","problem")
					return
				}
				
				//var randomGif = res.data[Math.floor(Math.random()*(res.data.length))]; use if doing giphy.search
				
				var randomGifObj =  res.data.images  // randomGif.images

				console.log("RANDOM",randomGifObj)

				obj.path = randomGifObj

				if(obj.format == 'video'){
					
					var video = checkVideoSize(obj)

				} else if(obj.format == 'gif'){

					var url = checkGifSize(obj)
				}
				
			})
		} else {
			download(obj)
		}
	}

	return remote
}