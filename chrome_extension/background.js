var blocked_sites = ["www.facebook.com","facebook.com","twitter.com","www.twitter.com","youtube.com","www.youtube.com","reddit.com","www.reddit.com"]

var socket_url = socketUrl; // enter your node server ip here


var socket = io(socket_url + '/extension');



console.log(socket.connected)
// send message to content script when page is activated to check if its a blocked page
chrome.tabs.onActivated.addListener(function(tab){

	console.log("TAB ACTIVATED")
	chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"message":"get_url"})
	})
})

// send message to content script when page is updated
chrome.tabs.onUpdated.addListener(function(id, info, tab){
	console.log("TAB UPDATED")
	//console.log(info.url)

	if(info.status == 'complete'){
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, {"method":"get_url"})
		})
	}
	
})

// get url from content script
chrome.runtime.onMessage.addListener(function(req, sender, res){

	if(req.method == 'takeUrl'){
		var url = req.url;
		console.log("GOT FROM CONTENT: " + url);

		//if its in the blocked site list emit socket to peeqo

		if(blocked_sites.indexOf(url) > -1){
			console.log("emit socket along with url")
			socket.emit("blocked", {"url":url})
		}
	}

	// when popup opens it sends message to background to make request for note data via socket
	if(req.method == 'getNotes'){
		console.log("get notes")
		socket.emit("notes", "get")
	}

	if(req.method == 'getPic'){
		socket.emit("img","yes")
	}
})

socket.on("img", function(msg){
	chrome.runtime.sendMessage({method:'showPic', data: msg}, function(response){})
})


// when all notes received from server send to popup js
socket.on('notes', function(msg){
	chrome.runtime.sendMessage({method:'displayNotes', data: msg}, function(response){})
})

// send single note received from server send to popup.js
socket.on('note', function(msg){
	chrome.runtime.sendMessage({method:'updateNotes', data: msg}, function(response){})
})