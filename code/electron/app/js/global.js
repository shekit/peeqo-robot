$(document).ready(function(){

	var connected = true;

	var allTimers = new Array();

	var config = require('./config/config.js');

	////***** CHECK ONLINE OFFLINE STATUS ****////

	// replace this with the url of the peeqo server or some server you know is always up
	Offline.options = {
		checks: {xhr: {url: 'http://svrround.com/live/user'}},
		requests: false,
		checkOnLoad: true
	}

	Offline.on('down', function(){
		console.log('lost connection');
		console.log("State: " + Offline.state);
		connected = false;
	})

	Offline.on('up', function(){
		console.log('connection returned')
		console.log("State: " + Offline.state)
		connected = true;
	})

	Offline.on('checking', function(){
		console.log("CHECKING CONN")
	})

	////**** i2c ******//////
	/*
	var i2c = require('i2c-bus')
	var i2c1 = null

	var ledMiniAddress = 0x04
	var ledMiniAccessCmd = 0xa1

	var servoMiniAddress = 0x07
	var servoMiniAccessCmd = 0x80

	i2c1 = i2c.open(1, function(err){
		if(err){
			throw err;
		}
	})

	function sendI2C(addr, code, byte){
		i2c1.writeByte(addr, code, byte, function(){
			console.log("sent i2c message")
		})
	}

	function readI2C(addr, code){
		i2c1.readByte(addr, code, function(err, id){
			if(err){
				console.log(err)
			}
			console.log(id);
		})
	}
	*/

	////**** WIFI SCANNING ****////

	WiFiControl = require("wifi-control");

	WiFiControl.init({
	  debug: true,
	  connectionTimeout: 2000
	});

	function scanWifi(){
		WiFiControl.scanForWiFi( function(error, response) {
		  if (error) console.log(error);
		  console.log(response);
		});
	}

	var sandbox = {
		ssid: config.ssid,
		password: config.sandboxPass
	}

	function connectToWifi(network){
		WiFiControl.connectToAP(network, function(error, response) {
		  if (error) console.log(error);
		  console.log(response);
		});
	}

	////**** BLUETOOTH ****////

	var bleno = require('bleno');
	var bleAdvertising = false;
	var name = 'peeqo';

	var serviceUuid = ['12ab'];

	bleno.on('advertisingStart', function(error){
		console.log("advertising")
		bleAdvertising = true;
		if(error){
			console.log("Advertising start error: " + error)
		} else {
			bleno.setServices([
				new bleno.PrimaryService({
					uuid: serviceUuid[0],
					characteristics: [
						// wifi ssid characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '34cd',
							properties: ['read', 'write'],

							onReadRequest: function(offset, callback){
								console.log("Read request received");
								this._value = new Buffer(JSON.stringify({
									'hello':'2'
								}));
								callback(this.RESULT_SUCCESS, this._value)
							},

							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data;
								console.log(data[0])
								console.log('Wifi SSID: '+this.value.toString("utf-8"));
								callback(this.RESULT_SUCCESS);
							}
						}),
						// password characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '45ef',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data
								console.log("Wifi Password: "+this.value.toString("utf-8"))
								callback(this.RESULT_SUCCESS);
							}
						})
					]
				})

			])
		}
	})

	bleno.on('advertisingStop', function(){
		console.log("stop advertising")
		bleAdvertising = false;
	})


	var wrapper = $("#wrapper");

	var giphy = require('giphy-api')(config.giphyKey);

	var fs = require('fs');
	
	

	var userPreferences = {}; //make an object containing all user related prefs

	// track blocked sites
	var blocked_sites = {
		"facebook":{
			"blocked": false,
			"offenceCount": 0
		},
		"twitter":{
			"blocked": false,
			"offenceCount": 0
		},
		"youtube":{
			"blocked": false,
			"offenceCount": 0
		}
	}

	// FIND GIF DURATION //

	var spawn = require('child_process').spawn;

	function findGifDuration(gif){
		console.log("gif")
		
		var python = spawn('python', [__dirname + '/gifduration/gifduration.py', __dirname + '/images/downloaded_gifs/beyonce.gif'])

		var gifLength = ''

		python.stdout.on('data', function(data){
			gifLength+=data;
		})

		python.stdout.on('close', function(){
			console.log(gifLength)
			// set timer to play gif based on this duration
		})
	}
	
	// ANNYANG CONFIGURATION

	if(annyang){
		console.log("Annyang detected");

		annyang.debug();

		var commands = {
			"pico": activateListening,
			"peko": activateListening,
			"piko": activateListening
		}

		annyang.addCommands(commands);

		annyang.start();	
	}

	function mimicAnnyang(){
		// calls everything that happens when pico is detected
		// use this as backup which happens on a button press incase voice detection fails
		annyang.trigger('pico');
	}

	function activateListening(){
		console.log("You said peeqo");
		annyang.abort(); // pause causes it to continue detecting
		//annyang.pause();
		//apiAi.open();

		// init api.ai which will call subsequent functions to start detecting
		apiAi.init();
	}

	// API.AI CONFIGURATION
	

	var apiConfig = {
		server: config.server,
		token: config.token,
		sessionId: config.sessionId
	}

	var apiAi = new ApiAi(config);

	// API.AI EVENTS

	apiAi.onInit = function(){
		console.log("APIAI INITED")
		if(annyang.isListening()){
			console.log("ANNYANG LIES")
		}

		// attempt to reinitialize if it does not initialize
		if(apiAi.isInitialise()){
			apiAi.open();
		} else {
			console.log("Attempting to reinitialize")
			apiAi.init()
		}
		
	}

	apiAi.onOpen = function(){
		console.log("APIAI OPENED")
		apiAi.startListening();

		// start timer to auto stop listening
		stopListeningTimer();
	}

	apiAi.onClose = function(){
		console.log("APIAI CLOSED")
	}

	apiAi.onStartListening = function(){
		console.log("APIAI STARTED LISTENING")
	}

	apiAi.onStopListening = function(){
		console.log("APIAI STOP LISTENING")
	}

	apiAi.onResults = function(data){
		console.log(data.result);
		//apiAi.stopListening();
		apiAi.close();

		// restart annyang to start listening for keyword peeqo
		annyang.resume();
	}

	apiAi.onError = function(code , data){
		console.log("ERROR: " + code + " " + data)
	}

	function stopListeningTimer(){
		console.log("start timer")
		setTimeout(function(){
			apiAi.stopListening();
		}, 3000)
	}

	// ACTION FUNCTIONS - BASED ON API AI RESPONSES

	
	function stopEverything(){
		// stop everything that is happening and revert to default screen
		// maybe say fine before doing that
	}

	function getWeather(city='New York'){
		//call weather api and set gif based on temperature returned
		$.simpleWeather({
			location: city,
			unit: 'c',
			success: function(weather){
				console.log(weather);
			},

			error: function(error){
				console.log("weather error: "+error)
			}
		})
	}

	var moment = require('moment');

	function getTime(city){
		// get time and figure out way to display as gif, maybe just show night or day or sleeping
		
		var url = "http://api.worldweatheronline.com/premium/v1/tz.ashx?key=" + config.timezone
		var query = "&q="+city
		var format = "&format=json"
		$.ajax({
			url: url+query+format,
			method: "GET",
			success: function(obj){
				var date = moment(obj.data.time_zone[0].localtime)  // converts string of time at location to date moment object
				console.log(date._d.getHours()) // gets hours from moment date object
			},
			error: function(err){
				console.log(err)
			}
		})
	}

	function giveSupport(){
		// gif when I say I accomplished something
	}

	var reminder = null;

	function setReminder(reminder, time){
		// set reminder
		var duration = parseInt(time);

		reminder = setTimeout(function(){
			//display alert gif when time elapses with reminder value
		}, duration)

	}

	function greetPublic(greeting){
		// find gif from local filesystem or giphy depending on greeting and display

		// send i2c message for lights and movement
	}

	function greetPrivate(){
		// find gif

		// send i2c message
	}

	function addNote(){
		// show got it gif

		// emit to server and view in chrome extension
	}

	function saveNote(note){
		//save note on server
		socket.emit("addNote",note)
	}


	function motivate(){
		// show you can do it or motivation gif
	}

	function controlLights(){
		// control wemo lights
	}

	function setGifPreference(){
		// prefix gif searches with preference set
	}

	function showExpression(expression){

		var dir_path = './images/gif/'+expression;
		var files = fs.readdirSync(dir_path);
		var numberOfGifs = files.length;
		var randomGif = Math.floor(Math.random()*numberOfGifs);

		var file_path = numberOfGifs[randomGif];

		// put image on screen
		// set gif preference prefix global variable

	}

	var latestImage = null;

	function takePicture(){

		// take a gif picture

		gifshot.createGIF({
			'gifWidth':800,
			'gifHeight':480,
			'text':'hello',
			'numFrames': 10,
			'keepCameraOn': false,
			'completeCallback':function(){
				console.log('done');
			}
			//'saveRenderingContexts': true,

		}, function(obj){
			if(!obj.error){
				//gifshot.stopVideoStreaming();
				var image = obj.image;
				var animatedImage = document.createElement('img');
				animatedImage.src = image;


				// use this to save the image to be able to send/email
				latestImage = image

				console.log(image);
				console.log(obj.cameraStream);

				//stop this stream
				obj.cameraStream.getTracks()[0].stop();
				
				//stop sep webcam stream
				if(track){
					track.stop();
				}
				
				document.body.appendChild(animatedImage)

				
			}
		})

		// send picture to chrome extension
	}

	function sendPicture(img){
		if(img){
			console.log("sending image")
			socket.emit("img", img)
		}
	}
	
	function blockSite(){
		// check if blocking has been activated
		// get angry if blocked site accessed
	}

	function addSkill(){
		// activate a disabled skill set
	}

	function petting(){
		// show getting pet gif
		console.log("petting");
	}

	function annoy(){
		console.log("annoy")
	}



	/////******* ALL EXTERNAL API FUNCTIONS ********////


	///// SPOTIFY API CALLS /////

	var Spotify = require('spotify-web-api-js')
	var spotifyApi = new Spotify();

	var song = $("#song")

	// use this to activate the skill
	var canPlayMusic = false;

	function searchSpotify(query, searchLimit=10){

		spotifyApi.searchTracks(query, {limit:searchLimit}, function(err,data){
			if(!err){

				var randomSong = Math.floor(Math.random()*searchLimit);
				console.log(data.tracks)
				console.log(data.tracks.items[randomSong].preview_url);

				var song = data.tracks.items[randomSong]
				var url = song.preview_url
				var artistName = song.artists[0].name;
				var albumCover = song.album.images[0].url;
				var albumName = song.album.name

				console.log(artistName, albumName, albumCover)

				playMusic(url);

				getArtistImage(artistName)
			} else {
				console.log("ERROR: " + err)
			}
		})
	}

	function playMusic(url){
		song.attr('autoplay','true');
		song.attr('src',url);
	}

	function getArtistImage(artist, searchLimit=10){
		
		spotifyApi.searchArtists(artist, {limit: searchLimit}, function(err, data){
			if(!err){
				console.log(data.artists.items[0].images[0].url);
				var img_url = data.artists.items[0].images[0].url;
				showArtistImage(img_url)
			} else {
				console.log("ERROR: " + err);
			}
		})
	}

	function showArtistImage(artist){
		console.log("show artist image")
		// show a gif 
		// switch to static image
	}


	////// GIPHY API //////

	var smallUrl = null;

	function searchGiphy(query, prefix){


		giphy.search(query, function(err, res){

			if(err || !res){
				//show sad local gif
				//try again
			}

			var randomGif = res.data[Math.floor(Math.random()*(res.data.length))];
			console.log(randomGif);
			var url = randomGif.images.original.url;
			smallUrl = randomGif.images.fixed_width_small.url
			console.log(smallUrl);
		})

		// giphy.random(query, function(err, res){

		// 	var url = res.data.images['original'].url;
		// 	return url;

		// })

		// giphy.translate(query, function(err, res){
		// 	var url = res.data.images['original'].url;
		// 	return url;
		// })
	}

	var request = require('request');

	function downloadGif(url, name){
		request(url).pipe(fs.createWriteStream(__dirname + "/images/downloaded_gifs/"+name+".gif")).on('close', function(){
			console.log('downloaded gif')
		})
	}

	var gifLoopTimer = null;

	function setGifTimer(duration,loop=2){
		// display gif for exactly 2 loops by passing in its duration

		gifLoopTimer = setTimeout(function(){
			showEyeGif();
		}, duration*loop)

		//allTimers.push(gifLoopTimer);
	}

	function showEyeGif(){
		console.log("EYES EYES EYES")
	}

	var video = $("video")
	var track = null;

	function getCameraFeed(){
		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

		var constraints = {audio:false, video:{width:800, height:480}}

		navigator.getUserMedia(constraints, function(stream){
			video.attr({'src':URL.createObjectURL(stream)})
			window.pictureStream = stream;
			track = stream.getTracks()[0]

			video.on('loadedmetadata', function(e){
				video.get(0).play();
			})			

		}, function(err){
			alert("Error accessing camera");
			console.log("error: " + err)
		})
		
	}



	/////********* SOCKET EVENTS  *******//////

	var socket_url = "http://localhost:3000";

	//var socket_url = "";

	//var socket = io(socket_url + '/peeqo');

	// socket.on('blocked', function(msg){
	// 	console.log("BLOCKED: " + msg)
	// })



	//////********* TEMPLATES  *******//////

	var eyes = Handlebars.templates.eyes;

	function render_eye_template(){
		wrapper.html(eyes({"name":"abhishek"}))
	}

	// TEST EVENT LISTENERS

	$("#test").on('click', function(){
		//wrapper.html(temp({"name":"abhishek"}))
		//annyang.start();
		//mimicAnnyang();
		activateListening();
	})

	$("#searchSpotify").on('click', function(){
		searchSpotify('beatles',10);
	})

	$("#getArtist").on("click", function(){
		getArtistImage("beatles")
	})

	$("#startWebcam").on("click", function(){
		getCameraFeed();
	})

	$("#takePicture").on("click", function(){
		takePicture();
	})

	$("#getWeather").on("click", function(){
		getWeather('New York');
	})

	$("#scanWifi2").on('click', function(){
		scanWifi();
	})

	$("#joinITP").on('click', function(){
		connectToWifi(sandbox);
	})

	$("#getTime").on('click', function(){
		getTime('Mumbai');
	})

	$("#ledi2c").on("click", function(){
		sendI2C(ledMiniAddress, ledMiniAccessCmd, 3);
	})

	$("#servoi2c").on("click", function(){
		sendI2C(servoMiniAddress, servoMiniAccessCmd, 3);
	})

	$("body").hammer().bind('pan', function(e){
		petting();
	})

	// $("body").hammer().bind('tap', function(e){
	// 	annoy();
	// })

	$("#bleAdvertise").on('click', function(){
		if(bleAdvertising){
			bleno.stopAdvertising();
		} else {
			bleno.startAdvertising(name, serviceUuid);
		}
	})

	$("#gifDuration").on('click', function(){
		findGifDuration("lo");
	})

	$("#sendPicture").on('click', function(){
		sendPicture(latestImage);
	})

	$("#findGif").on("click", function(){
		searchGiphy("beyonce");
	})

	$("#downloadGif").on("click", function(){
		downloadGif("http://media1.giphy.com/media/l3V0HfHMGsVUt2tDq/100w.gif","beyonce");
	})

})