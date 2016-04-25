console.log("hello popup");

chrome.runtime.onMessage.addListener(function(req, sender ,resp){

	if(req.method == 'updateNotes'){
		updateNotes(req.data)
	}

	if(req.method == 'displayNotes'){
		displayNotes(req.data);
	}

	if(req.method == 'showPic'){
		showPic(req.data)
	}
})

function showPic(img){
	var animatedImage = document.createElement('img')
	animatedImage.src = img;
	document.body.appendChild(animatedImage);
}

function updateNotes(note){
	console.log("Received note: " + note);
}

function displayNotes(notes){
	console.log("All notes: ")
	console.log(notes)
}

document.addEventListener('DOMContentLoaded', function(){
	chrome.runtime.sendMessage({"method":"getNotes"})
	chrome.runtime.sendMessage({"method":"getPic"})
})