const bleno = require('bleno');
const wifi = require('js/wifi-scan')
const config = require('config/config.js')

module.exports = function(){

	var bleAdvertising = false;
	var ble_name = 'peeqo';

	var serviceUuid = ['12ab'];

	var sandbox = {
		ssid: config.wifi.ssid,
		password: config.wifi.pass
	}

	var newWifi = {
		ssid: "",
		password: ""
	}

	bleno.on('advertisingStart', function(error){
		console.log("advertising")
		bleAdvertising = true;
		if(error){
			console.log("Advertising start error: " + error)
		} else {
			bleno.setServices([
				new bleno.PrimaryService({
					uuid: serviceUuid[0],
					characteristics: [
						// wifi ssid characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '34cd',
							properties: ['write'],

							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data;
								console.log(data[0])
								console.log('Wifi SSID: '+this.value.toString("utf-8"));
								newWifi.ssid = this.value.toString("utf-8")
								callback(this.RESULT_SUCCESS);
							}
						}),
						// password characteristic
						new bleno.Characteristic({
							value: null,
							uuid: '45ef',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								this.value = data
								console.log("Wifi Password: "+this.value.toString("utf-8"))
								newWifi.password = this.value.toString("utf-8")

								wifi.connect(newWifi);

								callback(this.RESULT_SUCCESS);
							}
						}),

						new bleno.Characteristic({
							value: null,
							uuid: '67gh',
							properties: ['write'],
							onWriteRequest: function(data, offset, withoutResponse, callback){
								console.log("Stop advertising");

								if(data.toString("utf-8")=="a"){
									ble.stopBleAdvertising();
								}
								
								callback(this.RESULT_SUCCESS)
							}
						})
					]
				})

			])
		}
	})

	bleno.on('advertisingStop', function(){
		console.log("stop advertising")
		bleAdvertising = false;
	})

	var ble = {}

	ble.startBleAdvertising = function(){
		if(bleAdvertising == false){
			bleno.startAdvertising(ble_name, serviceUuid)
		}
	}

	ble.stopBleAdvertising = function(){
		if(bleAdvertising == true){
			bleno.stopAdvertising();
		}
	}

	return ble
}