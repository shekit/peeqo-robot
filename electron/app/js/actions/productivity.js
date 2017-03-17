const event = require('js/events/events')
const response = require('js/data/responses')
const answer = require('js/actions/response')()

module.exports = function(){

	var productivity = {}

	productivity.list = {}

	productivity.blockSite = function(site){
		var lower = site.toLowerCase()
		productivity.list[lower] = true
	}

	productivity.unblockSite = function(site){
		var lower = site.toLowerCase()
		productivity.list[lower] = false
	}

	productivity.checkBlocked = function(site){
		var lower = site.toLowerCase()
		if(lower in productivity.list && productivity.list[lower] == true){
			event.emit("is-blocked", true)
		}
		event.emit("is-blocked",false)
	}

	productivity.isBlocked = function(){

		var cb = function(){

			setTimeout(function(){
				event.emit("led","off")
				answer.answer({msg: response.reaction.facepalm})
			},1200)

		}

		answer.answer({msg:response.reaction.angry, cb:cb})

	}

	return productivity
}