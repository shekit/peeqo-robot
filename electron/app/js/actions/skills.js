const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()
var skillset = {}

module.exports = function() {
	var skills = {}


	skills.learn = function(skill){
		if(!(skill in skillset) || skillset[skill] == false){
				
			var obj = {
					gif_type: gifType,  //local/remote
					gif_category: common.setQueryByType("r_learning","learning"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:null,
					led:"greenBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
					}
				}

			event.emit("animate", obj)

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

	skills.do = function(obj,action){

		switch(action){

			case 'blockReddit':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_abouttime","it's about time"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"abouttime",
					led:"fadeRed",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						event.emit("block-site","reddit",true)

						var anim = {
							gif_type:"local",  //local/remote
							gif_category:common.setQueryByType("r_watching","i'm watching you"),
							format: common.setFormat(),
							gif_url: null,
							gif_loop_forever: false,
							servo:"lookup",
							led:null,
							sound:null,
							sound_loop_forever: false,
							callback: null
						}

						setTimeout(function(){
							event.emit("animate", anim)
						},500)
					}
				}
				event.emit("animate", obj)
				break

			case 'didWell':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_clapping","applause"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"lookup",
					led:"blueBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						var anim = {
							gif_type:"local",  //local/remote
							gif_category:common.setQueryByType("r_youtoo", "you too"),
							format: common.setFormat(),
							gif_url: null,
							gif_loop_forever: false,
							servo:"lookup",
							led:null,
							sound:null,
							sound_loop_forever: false,
							callback: null
						}

						setTimeout(function(){
							event.emit("animate", anim)
						},1000)
					}
				}
				event.emit("animate", obj)
				break

			case 'gifJif':

				var folder = 'r_gifjif'

				if(skills.gifCount>=1){
					folder = 'r_nerd'
				}

				skills.gifCount+=1

				var obj = {
					gif_type:"local",  //local/remote
					gif_category: common.setQueryByType(folder,"gif or jif"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"lookup",
					led:null,
					sound:null,
					sound_loop_forever: false,
					callback: null
				}

				event.emit("animate", obj)
				break


			case 'greetPrivate':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_hello","hi"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"curious",
					led:null,
					sound:null,
					sound_loop_forever: false,
					callback: null
				}

				event.emit("animate", obj)
				break

			case 'greetPublic':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_hello","hello"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"curious",
					led:"greenBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
					}
				}

				event.emit("animate", obj)
				break

			case 'sayBye':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_bye","bye bye"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"curious",
					led:"blueBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
					}
				}

				event.emit("animate", obj)
				break

			case 'lightsOff':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_gotit","roger that"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"nod",
					led:"success",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						event.emit("hue",false)
					}
				}

				event.emit("animate", obj)

				break

			case 'lightsOn':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_gotit","you got it"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"nod",
					led:"success",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						event.emit("hue",true)
					}
				}

				event.emit("animate", obj)
				break



			case 'playBeatles':
				event.emit("play-music","beatles","sway")
				break

			case 'sleep':
				var obj = {
					gif_type:null,  //local/remote
					gif_category:null,
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"sleep",
					led:null,
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("close-eyes")
					}
				}

				event.emit("animate",obj)
				break

			case 'playRock':
				event.emit("play-music","metallica","rock")
				break

			case 'wakeUp':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_wakeup","waking up"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"wakeup",
					led:"blueBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						event.emit("start-fast-blink")

						var anim = {
							gif_type:"local",  //local/remote
							gif_category:common.setQueryByType("r_what","what is your problem"),
							format: common.setFormat(),
							gif_url: null,
							gif_loop_forever: false,
							servo:"lookup",
							led:null,
							sound:null,
							sound_loop_forever: false,
							callback: null
						}

						setTimeout(function(){
							event.emit("animate", anim)
						},500)
					}
				}
				event.emit("animate", obj)
				break

			case 'cameraOn':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_smile","big smile"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:null,
					led:"greenBlink",
					sound:null,
					sound_loop_forever: false,
					callback: function(){
						event.emit("led","off")
						event.emit("take-picture", false)
					}
				}

				event.emit("animate", obj)
				
				break

			case 'cameraOff':
				event.emit("camera-off")
				break

			case 'addSkill':
				event.emit("learn","spotify")
				break

			case 'unknown':
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_canthear","i don't know"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:"no",
					led: "error",
					sound:null,
					sound_loop_forever: false,
					callback:function(){
						event.emit("led","off")
					}
				}

				event.emit("animate", obj)
				break

			default:
				var obj = {
					gif_type:"local",  //local/remote
					gif_category:common.setQueryByType("r_canthear","i can't hear you"),
					format: common.setFormat(),
					gif_url: null,
					gif_loop_forever: false,
					servo:null,
					led:"error",
					sound:null,
					sound_loop_forever: false,
					callback:null
				}

				event.emit("animate", obj)
				break

		}	
	}

	return skills
}