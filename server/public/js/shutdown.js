$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/server_power')

	$("body").on("click",".btn", function(event){
		event.preventDefault();

		var id = $(this).attr('id')

		socket.emit(id,"yes")
	})

	socket.on('ip', function(data){
		alert("Peeqo IP: " + data);
	})

})