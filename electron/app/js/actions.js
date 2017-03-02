const localGif = require('js/local-gif')()
const gifAction = require('js/common-gif-functions')()
const moment = require('moment')
const config = require('config/config.js')

module.exports = function(){

	var actions = {}

	actions.abortAll = function(){

	}

	actions.getWeather = function(){
		var city = (typeof city !== 'undefined') ? city : 'New York';
		//call weather api and set gif based on temperature returned
		$.simpleWeather({
			location: city,
			unit: 'c',
			success: function(weather){
				console.log(weather);
				// use this to find gif
				console.log(weather.currently);
				searchGiphy(weather.currently);
			},

			error: function(error){
				console.log("weather error: "+error)
			}
		})
	}

	actions.getTime = function(){
		var url = "http://api.worldweatheronline.com/premium/v1/tz.ashx?key=" + config.timezone.key
		var query = "&q="+city
		var format = "&format=json"
		$.ajax({
			url: url+query+format,
			method: "GET",
			success: function(obj){
				var date = moment(obj.data.time_zone[0].localtime)  // converts string of time at location to date moment object
				console.log(date._d.getHours()) // gets hours from moment date object use for logic
				console.log(date);
			},
			error: function(err){
				console.log(err)
			}
		})
	}

	actions.setReminder = function(){

	}

	actions.greetPublic = function(){

	}

	actions.greetPrivate = function(){

	}

	actions.addNote = function(){

	}

	actions.motivate = function(){
		gifAction.find("motivation",true)
	}

	actions.blockSite = function(){
		// check if blocking has been activated
		// get angry if blocked site accessed
	}

	actions.pet = function(){
		localGif.find("petting", false)
	}

	actions.stopPet = function(){
		petTimer = setTimeout(function(){
			gifAction.showDiv("eyeWrapper");
		}, 500);
	}

	actions.annoy = function(){
		console.log("annoy")
	}

	var expressions = ["happy","sad","excited","angry","confused"]; // make sure names match movements obj keys

	var expressionTimeouts = [];

	function clearExpressionTimeouts(){
		for(var i=0;i<expressionTimeouts.length;i++){
			clearTimeout(expressionTimeouts[i])
		}

		expressionTimeouts = [];
	}

	function setExpressionTimer(expression, totalDuration){
		var timer = setTimeout(function(){
			//console.log("EXPRESSION: "+expression);
			//console.log("TOTAL DUR: "+totalDuration)

			findRandomLocalGif(expression, false)
			sendMovementSequence(expression);

		}, totalDuration)
	}

	actions.showAllExpressions = function(){
		clearExpressionTimeouts();

		// cycle through expressions array
		for(var i in expressions){

			// sanity check, only do if movements have been defined for it
			if(expressions[i] in movements){

				var totalAnimationDuration = 0;

				// find total duration of sequence to show expression
				if(i>0){
					for(var j=0;j<movements[expressions[i]].duration.length;j++){
						totalAnimationDuration+=movements[expressions[i]].duration[j]
					}
				}

				setExpressionTimer(expressions[i], totalAnimationDuration);
			}
			
		}
	}
	
	/*$("#eyeWrapper").hammer().bind('pan', function(e){
		//petting();
		console.log("pan")
		if(pettingPeeqo == false){
			pettingPeeqo = true;
			petting();
		}
	})

	$("#eyeWrapper").hammer().bind('panend', function(e){
		console.log("stopped panning")
		stopPetting();
	})*/

	return actions

}