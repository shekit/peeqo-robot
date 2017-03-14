const request = require('request')
const path = require('path')
const fs = require('fs')
const shortid = require('shortid')

const config = require('config/config.js')

const giphy = require('giphy-api')(config.giphy.key);
const event = require('js/events')

module.exports = function(){

	var remote = {}

	function checkSize(obj){
		var original_gif_size = parseInt(obj.original.size);

		if(original_gif_size <= config.giphy.max_gif_size){
			return obj.original.url
		} else {
			return findSmallerGif(obj,false);
		}
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

	function download(url,name,remote_url,obj){
		var dirpath = path.join(__dirname, "../images", "downloaded")

		if(!fs.existsSync(dirpath)){
			fs.mkdirSync(dirpath)
		}

		var gifPath = path.join(dirpath, name+".gif")
		request(url).pipe(fs.createWriteStream(gifPath)).on('close', function(){
			event.emit("find-gif-duration",gifPath, obj ,remote_url)
		})
	}

	remote.find = function(obj){

		var uniqueName = shortid.generate();

		if(obj.gif_url == null){
			giphy.search(obj.gif_category, function(err, res){

				if(err || !res){
					//show sad local gif
					//try again
					//event.emit("find-local-gif","problem")
					return
				}

				var randomGif = res.data[Math.floor(Math.random()*(res.data.length))];
				
				var randomGifObj = randomGif.images

				console.log(randomGifObj)

				var url = checkSize(randomGifObj)
				

				// download fixed width small or fixed width height depending on size
				var smallUrl = findSmallerGif(randomGifObj,true)

				download(smallUrl,uniqueName,url, obj)
			})
		} else {
			download(obj.gif_url, uniqueName, obj.gif_url, obj)
		}
	}

	return remote
}