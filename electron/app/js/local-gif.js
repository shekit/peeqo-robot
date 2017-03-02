const path = require('path')
const gifLibrary = require('images/local_gifs.js')
const gifAction = require('js/common-gif-functions')()
const event = require('js/events')

module.exports = function() {

	var local = {}
	
	local.find = function(obj){

		var gifCategory = gifAction.shuffle(gifLibrary[obj.gif_category])

		var randomGifNumber = Math.floor(Math.random()*gifCategory.length)

		var randomGif = gifCategory[randomGifNumber]

		var gifPath = path.join(__dirname, '../images', 'local', obj.gif_category, randomGif)

		if(obj.gif_loop_forever){
			event.emit("gif-timer-started", gifPath, obj)
		} else {
			event.emit("find-gif-duration", gifPath, obj)
		}
	}

	return local
}