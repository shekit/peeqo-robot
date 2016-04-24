console.log("hello popup");

chrome.runtime.onMessage.addListener(function(req, sender ,resp){

	if(req.method == 'updateNotes'){
		updateNotes(req.data)
	}

	if(req.method == 'displayNotes'){
		displayNotes(req.data);
	}
})


function updateNotes(note){
	console.log("Received note: " + note);
}

function displayNotes(notes){
	console.log("All notes: ")
	console.log(notes)
}