const event = require('js/events/events')
const response = require('js/data/responses')
const answer = require('js/actions/response')()
var skillset = {}

module.exports = function() {
	var skills = {}


	skills.learn = function(skill){
		if(!(skill in skillset) || skillset[skill] == false){

			var cb = function(){
				event.emit("led","off")
			}

			answer.answer({msg: response.reaction.learning, cb:cb})
				
			skillset[skill] = true
		}	
	}

	skills.unlearn = function(skill){
		if(skill in skillset || skillset[skill] == true){
			//localGif.find('learning',true)
			skillset[skill] = false
		}
	}

	skills.hasSkill = function(skill){
		if(skill in skillset && skillset[skill] == true){
			return true
		}
		return false
	}

	skills.gifCount = 0

	skills.do = function(action){

		switch(action){

			case 'listen':

				answer.answer({msg:response.greeting.alert})

			case 'blockReddit':

				var cb = function(){
					event.emit("led","off")
					event.emit("block-site","reddit",true)

					setTimeout(function(){
						answer.answer({msg: response.reaction.wink})
					},500)
				}

				answer.answer({msg: response.reaction.excited, cb:cb})

				break

			case 'gifJif':

				answer.answer({msg: response.info.gifjif})

				break

			case 'greetPublic':
				var cb = function(){
					event.emit("led","off")
				}
				answer.answer({msg: response.greeting.hello, cb:cb})
				break

			case 'sayBye':
				var cb = function(){
					event.emit("led","off")
				}
				answer.answer({msg: response.greeting.bye, cb:cb})

				break

			case 'sayYes':

				answer.answer({msg: response.reaction.yes})
				break

			case 'sayNo':
				answer.answer({msg: response.reaction.no})
				break

			case 'beHappy':

				answer.answer({msg: response.reaction.happy})
				break

			case 'beSad':
				answer.answer({msg: response.reaction.sad})
				break

			case 'lightsOff':
				var cb = function(){
					event.emit("led","off")
					event.emit("hue",false)
				}
				answer.answer({msg: response.reaction.yes, cb:cb})

				break

			case 'lightsOn':

				var cb = function(){
					event.emit("led","off")
					event.emit("hue",true)
				}
				answer.answer({msg: response.reaction.yes, cb:cb})

				break


			case 'playBeatles':
				event.emit("play-music","beatles","sway")
				break

			case 'sleep':

				var cb = function(){
					event.emit("close-eyes")
				}
				answer.answer({cb:cb, servo:'sleep'})

				break

			case 'playRock':
				event.emit("play-music","metallica","rock")
				break

			case 'wakeUp':

				var cb = function(){
					event.emit("led","off")
					event.emit("start-fast-blink")

					setTimeout(function(){
						answer.answer({msg: response.greeting.what})
					},500)
				}

				answer.answer({msg: response.other.wakeup, cb:cb})
				break

			case 'cameraOn':

				var cb = function(){
					event.emit("led","off")
					event.emit("take-picture", false)
				}
				answer.answer({msg:response.other.camera, cb:cb})
				
				break

			case 'cameraOff':
				event.emit("camera-off")
				break

			case 'addSkill':
				event.emit("learn","spotify")
				break

			default:

				var cb = function(){
					event.emit("led","off")
				}
				answer.answer({msg:response.reaction.confused, cb:cb})

				break

		}	
	}

	return skills
}