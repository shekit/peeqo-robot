$(document).ready(function(){

	var socket_url = window.socketURL

	var socket = io(socket_url + '/controlpanel')

	$("body").on("click","#listen", function(event){
		event.preventDefault();

		socket.emit("listen","yes")
	})

	$("body").on("click","#resetAll", function(event){
		event.preventDefault();

		socket.emit("resetAll","yes")
	})

	$("body").on("click","#refresh", function(event){
		event.preventDefault();

		socket.emit("refresh","yes")
	})

	$("body").on("submit","#remote", function(event){
		event.preventDefault()

		var val = $("#gif-query").val()
		val = val.trim()
		console.log(val)
		socket.emit("remote-gif", val)
	})

	$("body").on("submit","#servo", function(event){
		event.preventDefault()

		var val = $("#servo-vals").val()
		val = val.trim()

		val = val.split(',')

		for(i in val){
			val[i] = parseInt(val[i])
		}
		
		if(val.length!=6 || typeof(val)!="object"){
			return
		}
		console.log(val)

		socket.emit("servo-raw", val)
	})


})