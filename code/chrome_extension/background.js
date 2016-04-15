var blocked_sites = ["www.facebook.com","facebook.com","twitter.com","www.twitter.com","youtube.com","www.youtube.com"]

var socket_url = "http://localhost:3000";

//var socket_url = "";

var socket = io(socket_url + '/extension');



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
			chrome.tabs.sendMessage(activeTab.id, {"message":"get_url"})
		})
	}
	
})

// get url from content script
chrome.runtime.onMessage.addListener(function(req, sender, res){

	var url = req.url;
	console.log("GOT FROM CONTENT: " + url);

	//if its in the blocked site list emit socket to peeqo

	if(blocked_sites.indexOf(url) > -1){
		console.log("emit socket along with url")
		socket.emit("blocked", {"url":url})
	}
	

})