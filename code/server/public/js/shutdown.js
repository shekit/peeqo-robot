$(document).ready(function(){

	var socket_url = 'http://107.170.76.97:3000'

	var socket = io(socket_url + '/controlpanel')

	$("body").on("click","#shutdown", function(event){
		event.preventDefault();

		socket.emit("shutdown","yes")
	})

	$("body").on("click","#reboot", function(event){
		event.preventDefault();

		socket.emit("reboot","yes")
	})

})