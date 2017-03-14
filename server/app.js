var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// var routes = require('./routes/index')

var app = express();
var http = require('http').Server(app);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors());

// app.use('/', routes)

app.get("/", function(req, res, next){
	res.render("index")
})

app.get("/listen", function(req,res,next){
	res.render("listen")
})

app.get("/shutdown", function(req,res,next){
	res.render("shutdown")
})

app.get("/chd", function(req, res, next){
	res.render("chd")
})

app.get("/test", function(req, res, next){
	res.render("test")
})

var io = require('socket.io')(http);

// socket connections from control panel

var controlpanel_io = io.of('/controlpanel')

controlpanel_io.on('connection', function(socket){
	console.log("control panel connected")

	/*
	socket.on('', function(msg){
		peeqo_io.emit("blocked")
	})
	*/

	// CHD

	socket.on('listen_chd', function(){
		peeqo_io.emit("listen_chd","yes")
	})

	socket.on('hi_chd', function(){
		peeqo_io.emit("hi_chd","yes")
	})

	socket.on('bye_chd', function(){
		peeqo_io.emit("bye_chd","yes")
	})

	socket.on('yes_chd', function(){
		peeqo_io.emit("yes_chd","yes")
	})

	socket.on('no_chd', function(){
		peeqo_io.emit("no_chd","yes")
	})

	socket.on('happy_chd', function(){
		peeqo_io.emit("happy_chd","yes")
	})

	socket.on('sad_chd', function(){
		peeqo_io.emit("sad_chd","yes")
	})

	socket.on('reset_chd', function(){
		peeqo_io.emit("reset_chd","yes")
	})


	// END CHD

	socket.on('tickle', function(move){
		peeqo_io.emit("tickle",move)
	})

	socket.on('tickle-reset', function(msg){
		peeqo_io.emit("tickle-reset","yes")
	})

	socket.on('purpose', function(msg){
		peeqo_io.emit("purpose","yes")
	})

	socket.on('omg', function(msg){
		peeqo_io.emit("omg","yes")
	})

	socket.on('gifjif', function(msg){
		peeqo_io.emit("gifjif","yes")
	})

	socket.on('cameraOn', function(msg){
		peeqo_io.emit("cameraOn","yes")
	})

	socket.on('cameraOff', function(msg){
		peeqo_io.emit("cameraOff","yes")
	})

	socket.on('actMusic', function(msg){
		peeqo_io.emit("actMusic","yes")
	})

	socket.on('playBeatles', function(msg){
		peeqo_io.emit("playBeatles","yes");
	})

	socket.on('playRock', function(msg){
		peeqo_io.emit("playRock","yes");
	})

	socket.on('blockReddit', function(msg){
		peeqo_io.emit("blockReddit","yes");
	})

	socket.on('didWell', function(msg){
		peeqo_io.emit("didWell","yes");
	})

	socket.on('sayNo', function(msg){
		peeqo_io.emit("sayNo","yes");
	})

	socket.on('byebye', function(msg){
		peeqo_io.emit("byebye","yes");
	})

	socket.on('sleepy', function(msg){
		peeqo_io.emit("sleepy","yes");
	})

	socket.on('wakey', function(msg){
		peeqo_io.emit("wakey","yes");
	})

	socket.on('offLights', function(msg){
		peeqo_io.emit("offLights","yes");
	})

	socket.on('onLights', function(msg){
		peeqo_io.emit("onLights","yes");
	})

	socket.on("shutdown", function(msg){
		peeqo_io.emit("shutdown","yes")
	})

	socket.on("reboot", function(msg){
		peeqo_io.emit("reboot","yes")
	})

	socket.on("listen", function(msg){
		peeqo_io.emit("listen","yes")
	})

	socket.on("sayHi", function(msg){
		peeqo_io.emit("sayHi","yes")
	})

	socket.on("sayBye", function(msg){
		peeqo_io.emit("sayBye", "yes")
	})

	socket.on('takePicture', function(msg){
		peeqo_io.emit("takePicture","yes")
	})

	socket.on("playMusic", function(msg){
		peeqo_io.emit("playMusic", "yes")
	})

	socket.on("activateMusic", function(msg){
		peeqo_io.emit("activateMusic","yes")
	})

	socket.on("stopMusic", function(msg){
		peeqo_io.emit("stopMusic","yes")
	})

	socket.on("blockFacebook", function(msg){
		peeqo_io.emit("blockFacebook","yes")
	})

	socket.on("blockTwitter", function(msg){
		peeqo_io.emit("blockTwitter","yes")
	})

	socket.on("lightsOn", function(msg){
		peeqo_io.emit("lightsOn","yes")
	})

	socket.on("lightsOff", function(msg){
		peeqo_io.emit("lightsOff","yes")
	})

	socket.on("blinkLed", function(msg){
		peeqo_io.emit("blinkLed", "yes")
	})

	socket.on("sayYes", function(msg){
		peeqo_io.emit("sayYes", "yes")
	})

	socket.on("resetAll", function(msg){
		peeqo_io.emit("resetAll","yes")
	})

	socket.on("showDance", function(msg){
		peeqo_io.emit("showDance", "yes")
	})

	socket.on("showExpression", function(msg){
		peeqo_io.emit("showExpression","yes")
	})

	socket.on("sleep", function(msg){
		peeqo_io.emit("sleep","yes")
	})

	socket.on("wakeUp", function(msg){
		peeqo_io.emit("wakeUp","yes")
	})

	socket.on("deactivateMusic", function(msg){
		peeqo_io.emit("deactivateMusic", "yes")
	})

	socket.on("unblockFacebook", function(msg){
		peeqo_io.emit("unblockFacebook", "yes")
	})

	socket.on("unblockTwitter", function(msg){
		peeqo_io.emit("unblockTwitter", "yes")
	})


	socket.on("animate", function(msg){
		peeqo_io.emit("animate", msg)
	})


	socket.on("startBle", function(msg){
		peeqo_io.emit("startBle","yes")
	})

	socket.on("showExpressions", function(msg){
		peeqo_io.emit("showExpressions","yes");
	})

	socket.on("move", function(msg){
		peeqo_io.emit("move","yes")
		console.log("got moving")
	})



	socket.on("idle", function(msg){
		peeqo_io.emit("idle","yes")
	})

	socket.on("stopIdle", function(msg){
		peeqo_io.emit("stopIdle","yes")
	})

	socket.on("moveCurious", function(msg){
		peeqo_io.emit("moveCurious","yes")
	})

	socket.on("moveHappy", function(msg){
		peeqo_io.emit("moveHappy","yes")
	})

	socket.on("moveSad", function(msg){
		peeqo_io.emit("moveSad","yes")
	})

	socket.on("moveNo", function(msg){
		peeqo_io.emit("moveNo","yes")
	})

	socket.on("moveAlert", function(msg){
		peeqo_io.emit("moveAlert","yes")
	})

	socket.on("moveReset", function(msg){
		peeqo_io.emit("moveReset","yes")
	})

	socket.on("ledFade", function(msg){
		peeqo_io.emit("ledFade","yes")
	})

	socket.on("ledAlert", function(msg){
		peeqo_io.emit("ledAlert","yes")
	})

	socket.on("ledError", function(msg){
		peeqo_io.emit("ledError","yes")
	})

	socket.on("ledIdle", function(msg){
		peeqo_io.emit("ledIdle","yes")
	})

	socket.on('getIp', function(msg){
		peeqo_io.emit("getIp","yes")
	})

	socket.on('refresh', function(msg){
		peeqo_io.emit("refresh","yes")
	})

	socket.on("remote-gif", function(msg){
		peeqo_io.emit("remote-gif",msg)
	})

	socket.on("servo-raw", function(msg){
		peeqo_io.emit("servo-raw",msg)
	})

	socket.on("direct-gif", function(msg){
		peeqo_io.emit("direct-gif",msg)
	})

})

// socket connections from chrome extension

var extension_io = io.of('/extension')

extension_io.on('connection', function(socket){
	console.log("extension connected")

	socket.on('blocked', function(msg){
		// console.log("URL :" + msg.url)
		peeqo_io.emit("blocked", msg.url)
	})

	socket.on('notes', function(msg){
		console.log("send all notes");

		//send 10 latest notes
		if(notes.length < 10){
			socket.emit('notes', notes)
		} else {
			socket.emit('notes', notes[10])
		}

	})

	socket.on('img', function(msg){
		if(latestImage != null){
			socket.emit("img",latestImage);
		}
	})


})

// socket connections from peeqo
var latestImage = null;

var peeqo_io = io.of('/peeqo')

var notes = []

peeqo_io.on('connection', function(socket){
	console.log("peeqo connected");

	socket.on("addNote", function(note){
		//save note in variable
		notes.unshift(note);
	})

	socket.on('img', function(data){
		console.log("got image");
		//extension_io.emit("img", data);
		latestImage = data;
	})
	//extension_io.emit('note', newnote)

	socket.on('peeqoIp', function(msg){
		controlpanel_io.emit("peeqoIp",msg)
	})
})


http.listen(3000, function(){
	console.log("listening")
})
