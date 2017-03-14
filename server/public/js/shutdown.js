$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/server_power')

	$("body").on("click","#shutdown", function(event){
		event.preventDefault();

		socket.emit("shutdown","yes")
	})

	$("body").on("click","#reboot", function(event){
		event.preventDefault();

		socket.emit("reboot","yes")
	})

	$("body").on("click","#refresh", function(event){
		event.preventDefault();

		socket.emit("refresh","yes")
	})

})