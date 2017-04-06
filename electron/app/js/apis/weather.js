const config = require('config/config.js')
const answer = require('js/actions/response')()

module.exports = function(){

	var weather = {}

	weather.getWeather = function(city){
		var query = city

		if(!city){
			query = 'New York' 
		}

		$.ajax({
			type: 'GET',
			url: "http://api.openweathermap.org/data/2.5/weather?q="+query+"&units=imperial&APPID="+config.openweather.key,
			success: function(data){
				console.log(data)
				//console.log(data.weather[0].description)
				answer.answer({type:'remote', query:data.weather[0].description, textOverlay: data.weather[0].description})
			}

		})

	}

	return weather
}