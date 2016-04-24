console.log("CONTENT SCRIPT IS HERE")

chrome.runtime.onMessage.addListener(function(req, sender, res){
	if(req.method == 'get_url'){

		var url = window.location.hostname;
		console.log(url)

		if(url){
			chrome.runtime.sendMessage({"method":"takeUrl","url":url})
		}
	}
})