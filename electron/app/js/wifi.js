const WiFiControl = require("wifi-control")

WiFiControl.init({
  	debug: false,
  	connectionTimeout: 2000
});

module.exports = function(){

	var wifi = {}
	
	wifi.scan = function (){
		WiFiControl.scanForWiFi( function(error, response) {
		  	console.log(p)
		  	if (error) console.log(error);
		  	console.log(response);
		});
	}

	wifi.connect = function(network){
		WiFiControl.connectToAP(network, function(error, response) {
		  if (error) {
		  	console.log(error);
		  }
		  console.log(response);
		});
	}

	return wifi
}

