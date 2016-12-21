$(document).ready(function(){

	console.log("hello");

	var socket_url = window.socketURL

	var socket = io(socket_url + '/controlpanel')

	socket.on("peeqoIp", function(msg){
		alert("Peeqo IP: " + msg);
	} )




	/// FINAL LIST ///

	$("body").on("click","#tickle", function(e){
		e.preventDefault();
		var move = [83,94,94,90,94,83]
		socket.emit("tickle",move)
	})

	$("body").on("click","#tickle-reset", function(e){
		e.preventDefault();
		socket.emit("tickle-reset","yes")
	})

	$("body").on("click","#purpose", function(e){
		e.preventDefault();
		socket.emit("purpose","yes")
	})

	$("body").on("click","#omg", function(e){
		e.preventDefault();
		socket.emit("omg","yes")
	})

	$("body").on("click","#gifJif", function(e){
		e.preventDefault();
		socket.emit("gifjif","yes")
	})

	$("body").on("click","#cameraOn", function(e){
		e.preventDefault();
		socket.emit("cameraOn","yes")
	})

	$("body").on("click","#cameraOff", function(e){
		e.preventDefault();
		socket.emit("cameraOff","yes")
	})

	$("body").on("click","#onLights", function(e){
		e.preventDefault();
		socket.emit("onLights","yes")
	})

	$("body").on("click","#offLights", function(e){
		e.preventDefault();
		socket.emit("offLights","yes")
	})

	$("body").on("click","#actMusic", function(e){
		e.preventDefault();
		socket.emit("actMusic","yes")
	})

	$("body").on("click","#playBeatles", function(e){
		e.preventDefault();
		socket.emit("playBeatles","yes")
	})

	$("body").on("click","#playRock", function(e){
		e.preventDefault();
		socket.emit("playRock","yes")
	})

	$("body").on("click","#blockReddit", function(e){
		e.preventDefault();
		socket.emit("blockReddit","yes")
	})

	$("body").on("click","#sayNo", function(e){
		e.preventDefault();
		socket.emit("sayNo","yes")
	})


	$("body").on("click","#byebye", function(e){
		e.preventDefault();
		socket.emit("byebye","yes")
	})

	$("body").on("click","#sleepy", function(e){
		e.preventDefault();
		socket.emit("sleepy","yes")
	})

	$("body").on("click","#wakey", function(e){
		e.preventDefault();
		socket.emit("wakey","yes")
	})






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

	$("body").on("click","#showDance", function(e){
		e.preventDefault();
		socket.emit("showDance","yes")
	})

	$("body").on("click","#showExpression", function(e){
		e.preventDefault();
		socket.emit("showExpression","yes")
	})

	$("body").on("click","#takePicture", function(e){
		e.preventDefault();
		socket.emit("takePicture","yes")
	})

	$("body").on("click","#playMusic", function(e){
		e.preventDefault();
		socket.emit("playMusic","yes")
	})

	$("body").on("click","#activateMusic", function(e){
		e.preventDefault();
		socket.emit("activateMusic","yes")
	})

	$("body").on("click","#deactivateMusic", function(e){
		e.preventDefault();
		socket.emit("deactivateMusic","yes")
	})

	$("body").on("click","#stopMusic", function(e){
		e.preventDefault();
		socket.emit("stopMusic","yes")
	})

	$("body").on("click","#blockFacebook", function(e){
		e.preventDefault();
		socket.emit("blockFacebook","yes")
	})

	$("body").on("click","#blockTwitter", function(e){
		e.preventDefault();
		socket.emit("blockTwitter","yes")
	})

	$("body").on("click","#unblockFacebook", function(e){
		e.preventDefault();
		socket.emit("unblockFacebook","yes")
	})

	$("body").on("click","#unblockTwitter", function(e){
		e.preventDefault();
		socket.emit("unblockTwitter","yes")
	})

	$("body").on("click","#lightsOn", function(e){
		e.preventDefault();
		socket.emit("lightsOn","yes")
	})

	$("body").on("click","#lightsOff", function(e){
		e.preventDefault();
		socket.emit("lightsOff","yes")
	})

	$("body").on("click", "#sayYes", function(e){
		e.preventDefault();
		socket.emit("sayYes","yes");
	})

	$("body").on("click", "#blinkLed", function(e){
		e.preventDefault();
		socket.emit("blinkLed","yes");
	})


	$("body").on("click", "#sleep", function(e){
		e.preventDefault();
		socket.emit("sleep","yes");
	})

	$("body").on("click", "#resetAll", function(e){
		e.preventDefault();
		socket.emit("resetAll","yes");
	})

	$("body").on("click", "#wakeUp", function(e){
		e.preventDefault();
		socket.emit("wakeUp","yes");
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