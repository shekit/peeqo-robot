$(document).ready(function(){

	var connected = true;

	var fs = require('fs');

	var path = require('path');

	var config = require('./config/config.js');

	// shuffle array
	function shuffle(array) {
	  	var m = array.length, t, i;
 
	  		// While there remain elements to shuffle…
	  	while (m) {

	    	// Pick a remaining element…
	    	i = Math.floor(Math.random() * m--);

	    	// And swap it with the current element.
	    	t = array[m];
	    	array[m] = array[i];
	    	array[i] = t;
	  	}

	  	return array;
	}

	function arrayBuffer(){
		var arr = new Uint8Array([30,56,78,22,44,55]);
		var buff = Buffer.from(arr)
		console.log(arr.buffer);
		console.log(buff);
	}
	




	/////**** GIFS *****/////

	// var localGifs = {
	// 	"happy":[],
	// 	"sad":[],
	// 	"angry":[],
	// 	"annoyed":[],
	// 	"high_five":[],
	// 	"excited":[],
	// 	"no_internet":[],
	// 	"learning":[],
	// 	"picture":[],
	// 	"compliments":[],
	// 	"abuses":[],
	// 	"thanks":[],
	// 	"sleepy":[],
	// 	"error":[],
	// 	"confused":[],
	// 	"motivation":[],
	// 	"affirmations":[],
	// 	"petting":[]
	// }

	var localGifs = require('./images/local_gifs.json')

	// console.log(localGifs);

	console.log(path.join(__dirname, 'images', 'local'))

	function findRandomLocalGif(category, setDuration){
		// further randomize gif selection by shuffling array
		// pass in false for set duration for gif to continuously loop e.g no internet

		var gifCategory = shuffle(localGifs[category]);

		var randomGifNumber = Math.floor(Math.random()*gifCategory.length)

		var randomGif = gifCategory[randomGifNumber]

		var gifpath = path.join(__dirname, 'images', 'local',category, randomGif)

		if(setDuration){
			findGifDuration(gifpath, false) // false since they are local files
		} else {
			playLocalGif(gifpath)
		}	
	}

	

	var giphy = require('giphy-api')(config.giphyKey);

	////// GIPHY API //////

	var smallUrl = null;

	var shortid = require('shortid')

	function searchGiphy(query, prefix){

		// put in check for size - only download below certain size 

		giphy.search(query, function(err, res){

			if(err || !res){
				//show sad local gif
				//try again
				return
			}

			var randomGif = res.data[Math.floor(Math.random()*(res.data.length))];
			
			var randomGifObj = randomGif.images

			var url = checkGifSize(randomGifObj)
			console.log(randomGif);

			playGiphyGif(url);

			var uniqueName = shortid.generate();

			// download fixed width small or fixed width height depending on size

			var smallUrl = findSmallestGif(randomGifObj)


			downloadGif(smallUrl,uniqueName)
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

	var max_allowed_gif_size = 800000;

	function checkGifSize(obj){
		var original_gif_size = parseInt(obj.original.size);

		if(original_gif_size <= max_allowed_gif_size){
			return obj.url
		} else {
			return findSmallerLargerGif(obj);
		}
	}

	function findSmallerLargerGif(obj){
		// find higher quality gif if original is too large
		// and use it to be displayed

		var fixed_height_size = parseInt(obj.fixed_height_small.size);
		var fixed_width_size = parseInt(obj.fixed_width_small.size)

		if(fixed_width_size >= fixed_height_size){
			return obj.fixed_width_small.url
		} else {
			return obj.fixed_height_small.url
		}
	}

	function findSmallestGif(obj){

		// find the smaller of the two gifs to download and calculate duration

		var fixed_height_size = parseInt(obj.fixed_height_small.size);
		var fixed_width_size = parseInt(obj.fixed_width_small.size)

		if(fixed_width_size <= fixed_height_size){
			return obj.fixed_width_small.url
		} else {
			return obj.fixed_height_small.url
		}
	}

	

	var request = require('request');

	function downloadGif(url,name){
		var gifPath = path.join(__dirname, "images", "downloaded",name+".gif")
		// var path = __dirname + "/images/downloaded/"+name+".gif"
		request(url).pipe(fs.createWriteStream(gifPath)).on('close', function(){
			console.log('downloaded gif')

			findGifDuration(gifPath, true)
		})

	}

	var spawn = require('child_process').spawn;

	function findGifDuration(path, is_downloaded){

		console.log("gif")
		// folder can be either local or downloaded

		var python = spawn('python', [__dirname + '/gifduration/gifduration.py', path])

		var gifLength = ''

		python.stdout.on('data', function(data){
			gifLength+=data;
		})

		python.stdout.on('close', function(){
			console.log(gifLength)
			// set timer to play gif based on this duration
			setGifTimer(gifLength);

			if(is_downloaded){
				deleteDownloadedGif(path);
			}
			
			if(!is_downloaded){
				playLocalGif(path);
			}
			
		})
	}

	function deleteDownloadedGif(path){
		fs.unlink(path, function(err){
			console.log("deleted file")
		})
	}

	var gifLoopTimer = null;

	function setGifTimer(duration,loop=2){
		// display gif for exactly 2 loops by passing in its duration

		var dur = parseInt(duration)

		// check here to decide how many times to loop based on length of gif
		if(dur<=300){
			loop = 6
		} else if(dur<=800){
			loop = 4
		} else if(dur<=1500){
			loop = 3
		} else if(dur<=3000){
			loop = 2
		} else {
			loop = 1
		}

		if(isNaN(dur)){

			showDiv("eyeWrapper")

		} else {
			gifLoopTimer = setTimeout(function(){
				showDiv("eyeWrapper");
			}, dur*loop)
		}		
		
	}

	var gif = $("#gif");

	function playGiphyGif(path){
		// puts giphy gif in wrapper
		console.log("show giphy gif")
		showGif(path);

		// when gif has loaded display it
		gif.on('load', function(){
			showDiv("gifWrapper");
		})
	}

	function playLocalGif(path){
		console.log("replace gif in img tag")
		showGif(path);
		showDiv("gifWrapper");
	}

	
	function showGif(path){
		gif.attr({'src':path});
	}


	////**** TEMPLATES ****////

	var wrapper = $("#wrapper");

	var majorDivs = ["eyeWrapper", "cameraWrapper", "gifWrapper", "pictureWrapper", "testWrapper"]
	
	// show div and hide all others

	function showDiv(div){
		for(var i in majorDivs){
			if(majorDivs[i] != div){
				$("#"+majorDivs[i]).hide()
			} else {
				$("#"+majorDivs[i]).show()
			}
		}
	}

	////**** HANDLEBAR TEMPLATES ****////

	var eye_template = Handlebars.templates.eyes;
	var gif_template = Handlebars.templates.gif;
	var camera_template = Handlebars.templates.camera;
	var picture_template = Handlebars.templates.picture;

	function render_eye_template(){
		wrapper.html(eye_template())
	}

	function render_gif_template(path){
		wrapper.html(gif_template({"path":path}))
	}

	function render_camera_template(){
		wrapper.html(camera_template())
	}

	function picture_template(){
		wrapper.html(picture_template());
	}

	////**** EYES *****////

	var Snap = require('snapsvg')

	var snap = Snap("#eyes")

	var eyeSize = 87.5;
	var closedEye = 1;
	var closeEyeDuration = 120;
	var openEyeDuration = 200;
	var fastCloseEyeDuration = 90;
	var fastOpenEyeDuration = 120;
	var blinkInterval = 4000;

	var left_eye = snap.ellipse(202.5,330,eyeSize, eyeSize);
	var right_eye = snap.ellipse(604.5,330,eyeSize, eyeSize);

	var eyes = snap.group(left_eye, right_eye)

	eyes.attr({
		fill:"#000000"
	})

	function randRange(data){
		var newTime = data[Math.floor(data.length * Math.random())];
       	return newTime;
	}

	function blink(){
		// randomize blinking
		var timeArray = [4000, 6000, 10000, 1000, 500, 8000, 500]

		left_eye.animate({ry:closedEye}, closeEyeDuration,mina.elastic(), function(){
			left_eye.animate({ry:eyeSize}, openEyeDuration, mina.easein());
		})

		right_eye.animate({ry:closedEye}, closeEyeDuration,mina.elastic(), function(){
			right_eye.animate({ry:eyeSize}, openEyeDuration, mina.easein());
		})

		clearInterval(blinking)

		blinking = setInterval(blink, randRange(timeArray));
	}

	function fastBlink(){
		left_eye.animate({ry:closedEye}, fastCloseEyeDuration,mina.elastic(), function(){
			left_eye.animate({ry:eyeSize}, fastOpenEyeDuration, mina.easein(), function(){
				left_eye.animate({ry:closedEye}, fastCloseEyeDuration,mina.elastic(), function(){
					left_eye.animate({ry:eyeSize}, fastOpenEyeDuration, mina.easein())
				})
			});
		})

		right_eye.animate({ry:closedEye}, fastCloseEyeDuration,mina.elastic(), function(){
			right_eye.animate({ry:eyeSize}, fastOpenEyeDuration, mina.easein(), function(){
				right_eye.animate({ry:closedEye}, fastCloseEyeDuration,mina.elastic(), function(){
					right_eye.animate({ry:eyeSize}, fastOpenEyeDuration, mina.easein())
				})
			});
		})
	}

	var blinking = null;
	var isBlinking = false;

	function startBlinking(){
		isBlinking = true;
		blinking = setInterval(blink, blinkInterval);
	}

	function stopBlinking(){
		isBlinking = false;
		clearInterval(blinking);
	}

	var glassPics = ["glass1.png", "glass2.png", "glass3.png", "glass4.png"];

	var glasses = $("#glasses");

	function changeGlasses(){
		var randomGlass = glassPics[Math.floor(Math.random()*(glassPics.length))]
		var glassPath = path.join(__dirname,"images","glasses",randomGlass)
		//var path = __dirname + '/images/glasses/'+randomGlass
		glasses.attr({'src':glassPath});
	}

	


	////**** i2c ******//////
	
	/*var i2c = require('i2c-bus')
	var i2c1 = null

	i2c1 = i2c.open(1, function(err){
		if(err){
			console.log("i2c error: "+err )
		} else {
			console.log("I2C OPEN")
		}
	})*/


	var ledMiniAddress = 0x04;
	var ledMiniAccessCmd = 0x01;


	// must match arduino codes
	var ledCommands = {
		error:{
			desc: "",
			cmd: 0x02
		},
		success:{
			desc: "",
			cmd: 0x03
		},
		alert:{
			desc: "",
			cmd: 0x04
		},
		fadeRed:{
			desc: "",
			cmd: 0x05
		},
		off: {
			desc: "",
			cmd: 0x06
		},
		idle: {
			desc:"",
			cmd: 0x07
		}
	}

	function sendLedAnimation(anim){
		if(ledCommands[anim]){
			sendi2cByte(ledMiniAddress, ledMiniAccessCmd, ledCommands[anim].cmd)
		}
	}

	var servoMiniAddress = 0x07;

	// these durations and cmds should match those set in arduino
	var servoMiniAccessCmd = {
		easing1:{
			duration:500,
			cmd:0x01
		},
		easing2:{
			duration:1000,
			cmd:0x02
		},
		easing3:{
			duration:1500,
			cmd:0x03
		},
		easing4:{
			duration:2000,
			cmd:0x04
		},
		easing5:{
			duration:3000,
			cmd:0x05
		},
		bounceEasing:{
			duration:1000,
			cmd:0x06
		}

	}

	var movements = {
		reset: {
			desc:"",
			angles:[
					[94,91,89,88,87,92]
				],
			access_cmd:[
					servoMiniAccessCmd.easing1.cmd
				],
			duration: [
					servoMiniAccessCmd.easing1.duration
				]
		},
		alert: {
			desc:"",
			angles:[
					[50,130,50,130,50,130]
				],
			access_cmd:[
					servoMiniAccessCmd.bounceEasing.cmd
				],
			duration: [
					servoMiniAccessCmd.bounceEasing.duration
				]
		},
		sad: {
			desc:"",
			angles:[
					[109,81,81,90,81,109]
				],
			access_cmd:[
					servoMiniAccessCmd.easing5.cmd
				],
			duration: [
					servoMiniAccessCmd.easing5.duration
				]
		},
		happy: {
			desc:"",
			angles:[
					[109,90,71,109,90,71],
					[65,90,115,65,90,115],
					[109,90,71,109,90,71]
				],
			access_cmd:[
					servoMiniAccessCmd.easing2.cmd,
					servoMiniAccessCmd.easing4.cmd,
					servoMiniAccessCmd.easing4.cmd
				],
			duration: [
					servoMiniAccessCmd.easing2.duration,
					servoMiniAccessCmd.easing4.duration,
					servoMiniAccessCmd.easing4.duration
				]
		},
		curious: {
			desc:"",
			angles:[
					[97,77,77,103,103,83],		// double to increase duration that is stops for
					[97,77,77,103,103,83],
				],
			access_cmd:[
					servoMiniAccessCmd.easing1.cmd,
					servoMiniAccessCmd.easing1.cmd
				],
			duration: [
					servoMiniAccessCmd.easing1.duration,
					servoMiniAccessCmd.easing1.duration
				]
		},
		no: {
			desc:"",
			angles:[
					[96,96,96,96,96,96],		// double to increase duration that is stops for
					[84,84,84,84,84,84],
					[96,96,96,96,96,96],
					[84,84,84,84,84,84]
				],
			access_cmd:[
					servoMiniAccessCmd.easing2.cmd,
					servoMiniAccessCmd.easing2.cmd,
					servoMiniAccessCmd.easing2.cmd,
					servoMiniAccessCmd.easing2.cmd
				],
			duration: [
					servoMiniAccessCmd.easing2.duration,
					servoMiniAccessCmd.easing2.duration,
					servoMiniAccessCmd.easing2.duration,
					servoMiniAccessCmd.easing2.duration
				]
		},

	}

	function sendi2cByte(addr, cmd, byte){
		i2c1.writeByte(addr, cmd, byte, function(){})
	}

	function sendi2cBuffer(addr, cmd, array){
		var buffer = Buffer.from(array);

		i2c1.writeI2cBlock(addr, cmd, array.length, buffer, function(){})
	}

	var movementTimeouts = [];

	function clearMovementTimeouts(){
		for(var i=0;i<movementTimeouts.length;i++){
			clearTimeout(movementTimeouts[i])
		}

		movementTimeouts = [];
	}

	function sendMovementSequence(name){

		// remove any prev store timers
		clearMovementTimeouts();


		var commands = movements[name].access_cmd;
		var angles = movements[name].angles;
		var durations = movements[name].duration;

		console.log(angles);

		// if by mistake sizes differ then set cmd seq to be equal to move seq and set easing to default
		if(commands.length != angles.length){
			commands.length = angles.length

			for(var i in commands){
				commands[i] = servoMiniAccessCmd.easing1.cmd;
			}
		}

		//stagger and setTimers for the other moves
		for(var i=0;i<angles.length;i++){


			var timerDuration = 0;

			// find sum of time of all previous angles
			if(i>0){
				for(var j=i-1;j>=0;j--){
					timerDuration+=durations[j]
				}
			}

			if(i==angles.length-1){
				resetServos(timerDuration+durations[i])
			}

			console.log(timerDuration);

			addMovementTimer(i, angles, commands, timerDuration)
		}

		console.log(movementTimeouts);
		
	}

	function addMovementTimer(i, angles, commands, duration){
		var timer = setTimeout(function(){
			console.log(angles[i])
			sendi2cBuffer(servoMiniAddress, commands[i], angles[i])
		}, duration)

		movementTimeouts.push(timer);
	}

	var expressions = ["happy","sad","excited","angry","confused","annoyed"]; // make sure names match movements obj keys

	var expressionTimeouts = [];

	function clearExpressionTimeouts(){
		for(var i=0;i<expressionTimeouts.length;i++){
			clearTimeout(expressionTimeouts[i])
		}

		expressionTimeouts = [];
	}

	function showAllExpressions(){

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

				//console.log(totalAnimationDuration);

				setExpressionTimer(expressions[i], totalAnimationDuration);
			}
			
		}
	}

	function setExpressionTimer(expression, totalDuration){
		var timer = setTimeout(function(){
			//console.log("EXPRESSION: "+expression);
			//console.log("TOTAL DUR: "+totalDuration)

			//findRandomLocalGif(expression, false)
			sendMovementSequence(expression);

		}, totalDuration)
	}

	// find out way to get angle value of this from arduino instead of microus
	function resetServos(duration){
		var timer = setTimeout(function(){
			console.log("RESET SERVO");
			console.log(duration);
			sendMovementSequence("reset");
		}, duration)

		movementTimeouts.push(timer);
	}

	////**** WIFI SCANNING ****////

	WiFiControl = require("wifi-control");

	WiFiControl.init({
	  debug: false,
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

	var newWifi = {
		ssid: "",
		password: ""
	}

	function connectToWifi(network){

		WiFiControl.connectToAP(network, function(error, response) {
		  if (error) {
		  	console.log(error);
		  }
		  console.log(response);
		});
	}

	////***** CHECK ONLINE OFFLINE STATUS ****////

	// replace this with the url of the peeqo server or some server you know is always up
	Offline.options = {
		checks: {xhr: {url: 'http://google.com'}},
		requests: false,
		checkOnLoad: true
	}

	Offline.on('down', function(){
		console.log('lost connection');
		console.log("State: " + Offline.state);
		connected = false;
		findRandomLocalGif("no_internet", false);
		// send out ble signal so new wifi can be configured
		startBleAdvertising();
	})

	Offline.on('up', function(){
		console.log('connection returned')
		console.log("State: " + Offline.state)
		connected = true;
		findRandomLocalGif("excited", true);
		// stop sending ble signal as wifi has been configured
		stopBleAdvertising();
	})

	Offline.on('checking', function(){
		console.log("CHECKING CONN")
	})

	////**** BLUETOOTH ****////

	var bleno = require('bleno');
	var bleAdvertising = false;
	var ble_name = 'peeqo';

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
							properties: ['write'],

							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data;
								console.log(data[0])
								console.log('Wifi SSID: '+this.value.toString("utf-8"));
								newWifi.ssid = this.value.toString("utf-8")
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
								newWifi.password = this.value.toString("utf-8")

								connectToWifi(newWifi);

								callback(this.RESULT_SUCCESS);
							}
						}),

						new bleno.Characteristic({
							value: null,
							uuid: '67gh',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								console.log("Stop advertising");

								if(data.toString("utf-8")=="a"){
									stopBleAdvertising();
								}
								
								callback(this.RESULT_SUCCESS)
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

	function startBleAdvertising(){
		if(bleAdvertising == false){
			bleno.startAdvertising(ble_name, serviceUuid)
		}
	}

	function stopBleAdvertising(){
		if(bleAdvertising == true){
			bleno.stopAdvertising();
		}
		
	}

	
	var userPreferences = {}; //make an object containing all user related prefs

	

	////**** SHUTDOWN PI ****/////

	var execSync = require('child_process').execSync;

	function shutdown(){
		execSync('sudo shutdown -h now')
	}

	
	// ANNYANG CONFIGURATION

	var isAnnyangOn = false; // use this to decide if annyang should be used or not

	function startAnnyang(){
		if(annyang && isAnnyangOn){
			//annyang.debug();

			var commands = {
				"pico": activateListening,
				"peko": activateListening,
				"piko": activateListening
			}

			annyang.addCommands(commands);

			annyang.start();
		} else {
			console.log("annyang is deactivated");
		}
	}

	

	function mimicAnnyang(){
		// calls everything that happens when pico is detected
		// use this as backup which happens on a button press incase voice detection fails
		annyang.trigger('pico');
	}

	function activateListening(){
		console.log("You said peeqo");

		if(isAnnyangOn){
			annyang.abort();
			// pause causes it to continue detecting
			//annyang.pause();
		}
		 
		// init api.ai which will call subsequent functions to trigger
		if(apiAi.isInitialise()){
			apiAi.init();
		} else {
			apiAi.open();
		}
	}

	// API.AI CONFIGURATION

	var apiConfig = {
		server: config.server,
		token: config.token,
		sessionId: config.sessionId
	}

	var apiAi = new ApiAi(config);

	var listeningDuration = 3000;

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

		sendLedAnimation("alert");
		sendMovementSequence("alert");
	}

	apiAi.onStopListening = function(){
		console.log("APIAI STOP LISTENING")

		sendLedAnimation("off");
		sendMovementSequence("reset");
	}

	apiAi.onResults = function(data){
		console.log(data.result);
		console.log(data);

		sendLedAnimation("success")

		var obj = data.result;
		var action = data.result.action;

		switch(action){
			case 'playMusic':
				if(obj.parameters.artist){
					searchSpotify(obj.parameters.artist)
				}
				break;

			case 'greetPublic':
				findRandomLocalGif(obj.parameters.greeting, true)
				break;

			case 'blockSite':
				findRandomLocalGif("got_it")
				obj.parameters.sites;
				break;

			case 'takePicture':
				getCameraFeed();
				break;

			case 'addSkill':
				canPlayMusic = true;
				findRandomLocalGif("learning",true);
				break;

			case 'default':
				break;
		}	

		// if(data.result.parameters){
		// 	//window[data.results](data.parameters)
		// 	window[data.result.action].apply(this, data.result.parameters)
		// } else {
		// 	//window[data.result]
		// 	window[data.result.action]
		// }
		
		//apiAi.stopListening();
		apiAi.close();

		if(isAnnyangOn){
			// restart annyang to start listening for keyword peeqo
			annyang.resume();
		}
	}

	apiAi.onError = function(code , data){
		console.log("ERROR: " + code + " " + data)
	}

	function stopListeningTimer(){
		console.log("start timer")
		setTimeout(function(){
			apiAi.stopListening();
		}, listeningDuration)
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
				// use this to find gif
				console.log(weather.currently);
				searchGiphy(weather.currently);
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
				console.log(date._d.getHours()) // gets hours from moment date object use for logic
				console.log(date);
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
		findRandomLocalGif("hello", true);
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
		findRandomLocalGif("motivation", true);
	}


	function setGifPreference(){
		// prefix gif searches with preference set
	}

	function showExpression(expression){

		findRandomLocalGif("excited");

		// put image on screen
		// set gif preference prefix global variable

	}

	

	var latestImage = null;

	var selfie = $("#selfie");

	function takePicture(){

		// take a gif picture

		gifshot.createGIF({
			'gifWidth':800,
			'gifHeight':480,
			'text':'hello',
			'numFrames': 10,
			'keepCameraOn': false,
			'completeCallback':function(){
				console.log("done");
			}
			//'saveRenderingContexts': true,

		}, function(obj){
			if(!obj.error){
				//gifshot.stopVideoStreaming();
				var image = obj.image;

				selfie.attr({'src':image})

				// use this to save the image to be able to send/email
				latestImage = image


				//stop this stream
				obj.cameraStream.getTracks()[0].stop();
				
				//stop sep webcam stream
				if(track){
					track.stop();
				}
				
				showDiv("pictureWrapper")
				console.log("started cb")
				setTimeout(function(){
					showDiv("eyeWrapper")
				},4000);

			}
		})
		// send picture to chrome extension
	}

	var video = $("video")
	var track = null;

	function getCameraFeed(){
		showDiv("cameraWrapper");

		navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

		var constraints = {audio:false, video:{width:800, height:480}}

		navigator.getUserMedia(constraints, function(stream){
			video.attr({'src':URL.createObjectURL(stream)})
			track = stream.getTracks()[0]

			video.on('loadedmetadata', function(e){
				video.get(0).play();

				//start gifshot once camera is loaded
				takePicture();
			})			

		}, function(err){
			alert("Error accessing camera");
			console.log("error: " + err)
		})
		
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

	var petTimer = null;
	var pettingPeeqo = false;

	function petting(){
		// show getting pet gif
		//clearTimeout(petTimer);
		console.log("petting");
		findRandomLocalGif("petting",false)

		
	}

	function stopPetting(){
		pettingPeeqo = false;
		petTimer = setTimeout(function(){
			showDiv("eyeWrapper");
		}, 500);
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

		if(canPlayMusic){
			spotifyApi.searchTracks(query, {limit:searchLimit}, function(err,data){
				if(!err){

					var randomSong = Math.floor(Math.random()*searchLimit);
					//console.log(data.tracks)
					//console.log(data.tracks.items[randomSong].preview_url);

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
		} else {
			findRandomLocalGif("cant" ,true)
		}
	}

	function playMusic(url){
		song.attr('autoplay','true');
		song.attr({'src':url});

		setTimeout(function(){
			showDiv("eyeWrapper");
		}, 30000)
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

	function showArtistImage(path){
		console.log("show artist image")
		showGif(path);
		showDiv("gifWrapper");
		// show a gif 
		// switch to static image
	}

	function learn(){
		findRandomLocalGif("learning", true);
		canPlayMusic = true;
	}


	/////********* SOCKET EVENTS  *******//////

	var socket_url = "http://107.170.76.97:3000";

	//var socket_url = "";

	var socket = io(socket_url + '/peeqo');

	// socket.on('blocked', function(msg){
	// 	console.log("BLOCKED: " + msg)
	// })

	// executed on socket message sent through server
	socket.on("shutdown", function(msg){
		shutdown();
	})

	socket.on("listen", function(msg){
		activateListening();
	})

	socket.on("picture", function(msg){
		getCameraFeed();
	})

	socket.on("blocked", function(msg){

		if(msg.indexOf("facebook")>-1){

		}
	})


	

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

	$("#activateMusic").on('click', function(){
		learn();
	})

	$("#getArtist").on("click", function(){
		getArtistImage("beatles")
	})

	$("#startWebcam").on("click", function(){
		getCameraFeed();
	})

	$("#takePicture").on("click", function(){
		getCameraFeed();
	})

	$("#getWeather").on("click", function(){
		getWeather('Mumbai');
	})

	$("#getGiphy").on("click", function(){
		searchGiphy("superman");
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
		sendI2C(ledMiniAddress, ledMiniAccessCmd, 0x03);
	})

	$("#servoi2c").on("click", function(){
		sendI2C(servoMiniAddress, servoMiniAccessCmd, 0x04);
	})	

	$("body").hammer().bind('pan', function(e){
		//petting();
		console.log("pan")
		if(pettingPeeqo == false){
			pettingPeeqo = true;
			petting();
		}
	})

	$("body").hammer().bind('panend', function(e){
		console.log("stopped panning")
		stopPetting();
	})

	// $("body").hammer().bind('tap', function(e){
	// 	annoy();
	// })

	$("#bleAdvertise").on('click', function(){
		if(bleAdvertising){
			bleno.stopAdvertising();
		} else {
			bleno.startAdvertising(ble_name, serviceUuid);
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

	$("#shutdown").on("click", function(){
		shutdown();
	})

	$("#blink").on("click", function(){
		blink();
	})

	$("#fastBlink").on("click", function(){
		fastBlink();
	})

	$("#showTest").on("click", function(){
		showDiv("testWrapper");
	})

	$("#moveDemo").on("click", function(){
		showAllExpressions();
	})

	$("#buffer").on("click", function(){
		arrayBuffer();
	})

	showDiv("eyeWrapper");

	startBlinking();

	startAnnyang();

})