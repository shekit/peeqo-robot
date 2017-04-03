$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/server_wifi')


	$("body").on("submit","#wifi", function(event){
		event.preventDefault()

		var ssid = $("#wifi-ssid").val().trim()
		var pass = $("#wifi-pass").val().trim()

		if(!ssid || !pass){
			return
		}

		socket.emit("wifi", {ssid:ssid, pass:pass})
	})



})