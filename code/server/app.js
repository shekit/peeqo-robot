var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index')

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

app.use('/', routes)

var io = require('socket.io')(http);

var notes = ["helo","what to do", "save this page"]

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
		socket.emit('notes', notes)
	})

})

// socket connections from peeqo

var peeqo_io = io.of('/peeqo')

peeqo_io.on('connection', function(socket){
	console.log("peeqo connected");

	//extension_io.emit('note', newnote)
})


http.listen(3000, function(){
	console.log("listening")
})