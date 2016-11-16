$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/controlpanel')

	$("body").on("click","#listen", function(event){
		event.preventDefault();

		socket.emit("listen","yes")
	})

})