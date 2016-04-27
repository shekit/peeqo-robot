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
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors());

// app.use('/', routes)

app.get("/", function(req, res, next){
	res.render("index.jade")
})

app.get("/listen", function(req,res,next){
	res.render("listen.jade")
})

app.get("/shutdown", function(req,res,next){
	res.render("shutdown.jade")
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
})

// socket connections from chrome extension

var extension_io = io.of('/extension')

extension_io.on('connection', function(socket){
	console.log("extension connected")

	socket.on('blocked', function(msg){
		console.log("URL :" + msg.url)
		peeqo_io.emit("blocked", "yes")
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
})


http.listen(3000, function(){
	console.log("listening")
})