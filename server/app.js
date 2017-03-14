var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.get("/", function(req, res, next){
	res.render("index.pug")
})

app.get("/gif", function(req,res,next){
	res.render("gif.pug")
})

app.get("/shutdown", function(req,res,next){
	res.render("shutdown.pug")
})

app.get("/demo", function(req, res, next){
	res.render("demo.pug")
})

app.get("/animate", function(req, res, next){
	res.render("animate.pug")
})

app.get("/test", function(req, res, next){
	res.render("test.pug")
})

var io = require('socket.io')(http);


// POWER SOCKETS

var server_power = io.of('/server_power')
var peeqo_power = io.of('/peeqo_power')

peeqo_power.on('connection', function(socket){
	console.log('peeqo power connected')

	socket.on('ip', function(data){
		server_power.emit("ip",data)
	})
})

server_power.on('connection', function(socket){
	console.log('server power connected')

	socket.on('shutdown', function(data){
		peeqo_power.emit('shutdown')
	})

	socket.on('reboot', function(data){
		peeqo_power.emit('reboot')
	})

	socket.on('refresh', function(data){
		peeqo_power.emit('refresh')
	})

	socket.on('reset', function(data){
		peeqo_power.emit('reset')
	})

	socket.on('ip', function(data){
		peeqo_power.emit('ip')
	})
})

// END OF POWER SOCKETS


// DEMO SOCKETS

var server_demo = io.of('/server_demo')
var peeqo_demo = io.of('/peeqo_demo')

peeqo_demo.on('connection', function(socket){
	console.log('peeqo demo connected')
})

server_demo.on('connection', function(socket){

	socket.on('sleep', function(msg){
		peeqo_demo.emit("sleep","yes");
	})

	socket.on('wake', function(msg){
		peeqo_demo.emit("wake","yes");
	})

	socket.on('listen', function(){
		peeqo_demo.emit("listen","yes")
	})

	socket.on('hi', function(){
		peeqo_demo.emit("hi","yes")
	})

	socket.on('bye', function(){
		peeqo_demo.emit("bye","yes")
	})

	socket.on('yes', function(){
		peeqo_demo.emit("yes","yes")
	})

	socket.on('no', function(){
		peeqo_demo.emit("no","yes")
	})

	socket.on('happy', function(){
		peeqo_demo.emit("happy","yes")
	})

	socket.on('sad', function(){
		peeqo_demo.emit("sad","yes")
	})

	socket.on('reset', function(){
		peeqo_demo.emit("reset","yes")
	})
})

// END DEMO SOCKETS

// CHROME EXTENSION SOCKETS

var server_extension = io.of('/extension')
var peeqo_extension = io.of('/peeqo-extension')

peeqo_extension.on('connection', function(socket){
	console.log('peeqo extension connected')
})

server_extension.on('connection', function(socket){
	console.log("extension connected")

	socket.on('blocked', function(msg){
		// console.log("URL :" + msg.url)
		peeqo_extension.emit("blocked", msg.url)
	})

})

// END CHROME EXTENSION SOCKETS

// TEST SOCKETS

var server_test = io.of('/server_test')
var peeqo_test = io.of('/peeqo_test')

peeqo_test.on('connection', function(socket){
	console.log('peeqo tests connected')
})

server_test.on('connection', function(socket){
	console.log('server tests connected')

	// music
	socket.on("activateMusic", function(msg){
		peeqo_io.emit("activateMusic","yes")
	})

	socket.on("playMusic", function(msg){
		peeqo_test.emit("playMusic", "yes")
	})

	socket.on("deactivateMusic", function(msg){
		peeqo_io.emit("deactivateMusic", "yes")
	})

	socket.on("stopMusic", function(msg){
		peeqo_io.emit("stopMusic","yes")
	})

	// camera
	socket.on('cameraOn', function(msg){
		peeqo_test.emit("cameraOn","yes")
	})

	socket.on('cameraOff', function(msg){
		peeqo_test.emit("cameraOff","yes")
	})

	socket.on('takePicture', function(msg){
		peeqo_test.emit("takePicture","yes")
	})

	// lights
	socket.on('lightsOff', function(msg){
		peeqo_test.emit("lightsOff","yes");
	})

	socket.on('lightsOn', function(msg){
		peeqo_test.emit("lightsOn","yes");
	})

	// block sites
	socket.on('blockReddit', function(msg){
		peeqo_test.emit("blockReddit","yes");
	})

	socket.on("blockFacebook", function(msg){
		peeqo_test.emit("blockFacebook","yes")
	})

	socket.on("blockTwitter", function(msg){
		peeqo_test.emit("blockTwitter","yes")
	})

	socket.on('unblockReddit', function(msg){
		peeqo_test.emit("unblockReddit","yes");
	})

	socket.on("unblockFacebook", function(msg){
		peeqo_test.emit("unblockFacebook", "yes")
	})

	socket.on("unblockTwitter", function(msg){
		peeqo_test.emit("unblockTwitter", "yes")
	})

	// leds
	socket.on("blinkLed", function(msg){
		peeqo_io.emit("blinkLed", "yes")
	})

})

// END TEST SOCKETS

// WEB CONTROLS

var server_webcontrol = io.of('/server_webcontrol')
var peeqo_webcontrol = io.of('/peeqo_webcontrol')

peeqo_webcontrol.on('connection', function(socket){
	console.log('peeqo web controls connected')
})

server_webcontrol.on('connection', function(socket){
	console.log('server web controls connected')

	socket.on("remote-gif", function(msg){
		peeqo_webcontrol.emit("remote-gif",msg)
	})

	socket.on("servo-raw", function(msg){
		peeqo_webcontrol.emit("servo-raw",msg)
	})

	socket.on("direct-gif", function(msg){
		peeqo_webcontrol.emit("direct-gif",msg)
	})

	socket.on("reset", function(msg){
		peeqo_webcontrol.emit("reset")
	})

	socket.on("animate", function(msg){
		peeqo_webcontrol.emit("animate", msg)
	})
})


// END WEB CONTROLS


http.listen(3000, function(){
	console.log("listening")
})