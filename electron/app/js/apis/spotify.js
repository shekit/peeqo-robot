const Spotify = require('spotify-web-api-js')
const spotifyApi = new Spotify()
const event = require('js/events/events')
const common = require('js/gifs/common-gif-functions')()

const response = require('js/data/responses')
const answer = require('js/actions/response')()

var skills = require('js/actions/skills')()


module.exports = function(){

	var spotify = {}

	spotify.song = document.getElementById("song")
	spotify.stopTimer = null

	spotify.search = function(query,genre,searchLimit){
		var searchLimit = (typeof searchLimit !== 'undefined') ? searchLimit : 10;

		if(skills.hasSkill("spotify")){
			spotifyApi.searchTracks(query, {limit:searchLimit}, function(err,data){
				if(!err){

					var randomSong = Math.floor(Math.random()*searchLimit);

					var song = data.tracks.items[randomSong]
					var url = song.preview_url
					var artistName = song.artists[0].name;
					var albumCover = song.album.images[0].url;
					var albumName = song.album.name

					getArtistImage(artistName ,url ,genre)
				} else {
					console.log("ERROR: " + err)
				}
			})
		} else {

			var cb = function(){
				event.emit("led","off")
			}
			answer.answer({msg:response.reaction.confused, cb:cb})

		}
	}

	spotify.stop = function(){
		spotify.song.pause()
		spotify.song.currentTime = 0
		clearTimeout(spotify.stopTimer)
	}

	function getArtistImage(artist, song_url, genre, searchLimit){

		var searchLimit = (typeof searchLimit !== 'undefined') ? searchLimit : 10;

		spotifyApi.searchArtists(artist, {limit: searchLimit}, function(err, data){
			if(!err){
				var img_url = data.artists.items[0].images[0].url;
				showArtistImage(img_url,genre)
			} else {
				console.log("ERROR: " + err);
			}
			playMusic(song_url)
		})
	}

	function showArtistImage(path,genre){
		var dance = 'musicSway'

		if(genre == 'rock'){
			dance = 'headBang'
		}
		
		answer.answer({servo:dance})

		// event.emit("animate",obj)
		event.emit('gif-timer-started',path,obj)
		
	}

	function playMusic(url){
		spotify.song.currentTime = 0
		spotify.song.src = url
		spotify.song.play()

		spotify.stopTimer = setTimeout(function(){	
			console.log("called timer")
			spotify.stop()
		}, 30000)
	}

	return spotify
}