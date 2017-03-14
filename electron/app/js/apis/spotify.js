const Spotify = require('spotify-web-api-js')
const spotifyApi = new Spotify()
const event = require('js/events')

var skills = require('js/skills')()


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
			var obj = {
				gif_type:"local",  //local/remote
				gif_category:"r_dunno",
				gif_url: null,
				gif_loop_forever: false,
				servo:null,
				led:"error",
				sound:null,
				sound_loop_forever: false,
				callback: function(){
					event.emit("led","off")
				}
			}
			event.emit("animate", obj)
		}
	}

	spotify.stop = function(){
		spotify.song.pause()
		spotify.song.currentTime = 0
		clearTimeout(spotify.stopTimer)
		event.emit("reset")
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
		
		var obj = {
			gif_type:null,  //local/remote
			gif_category:null,
			gif_url: null,
			gif_loop_forever: true,
			servo: dance,
			led:null,
			sound:null,
			sound_loop_forever: false,
			callback: null
		}

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