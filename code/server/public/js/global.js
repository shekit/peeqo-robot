$(document).ready(function(){

	console.log("hello");

	var socket_url = 'http://107.170.76.97:3000'

	var socket = io(socket_url + '/controlpanel')

	$("body").on("click","#listen", function(e){
		e.preventDefault();
		socket.emit("listen","yes")
	})

	$("body").on("click","#sayHi", function(e){
		e.preventDefault();
		socket.emit("sayHi","yes")
	})

	$("body").on("click","#sayBye", function(e){
		e.preventDefault();
		socket.emit("sayBye","yes")
	})

	$("body").on("click","#startBle", function(e){
		e.preventDefault();
		socket.emit("startBle","yes")
	})

	$("body").on("click","#showExpressions", function(e){
		e.preventDefault();
		socket.emit("showExpressions","yes")
	})

	$("body").on("click","#move", function(e){
		e.preventDefault();
		socket.emit("move","yes")
	})

	$("body").on("click","#playMusic", function(e){
		e.preventDefault();
		socket.emit("playMusic","yes")
	})

	$("body").on("click","#activateMusic", function(e){
		e.preventDefault();
		socket.emit("activateMusic","yes")
	})

	$("body").on("click","#idle", function(e){
		e.preventDefault();
		socket.emit("idle","yes")
	})

	$("body").on("click","#stopIdle", function(e){
		e.preventDefault();
		socket.emit("stopIdle","yes")
	})

})