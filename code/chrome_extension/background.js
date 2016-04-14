var blocked_sites = ["www.facebook.com","facebook.com","twitter.com","www.twitter.com","youtube.com","www.youtube.com"]

//var socket = io("http://localhost:3000");



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


	console.log("GOT FROM CONTENT: " + req.url);

	if(blocked_sites.indexOf(req.url) > -1){
		console.log("emit socket")
	}
	

})