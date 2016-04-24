var peeqo = {
    service: '12ab',
    ssid: '34cd',
    password: '45ef'
}


function stringToBytes(string){
    var array = new Uint8Array(string.length);
    for(var i=0, l=string.length; i<l;i++){
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}


(function(){

    console.log("Hello")

    var peeqo_id = null;
    var stop_ble_search = null;
    var connected_via_ble = false;

    var wrapper = $("#wrapper")


    var searchPeeqoTimer = function(){
        stop_ble_search = setTimeout(function(){

            ble.stopScan(function(){
                console.log("Stopped scan - no devices found");
            }, function() {
                console.log("couldn't stop");
            });
                                    
            render_not_found_peeqo();

        }, 5000);
 
    }

    var clearSearchPeeqoTimer = function(){
        clearTimeout(stop_ble_search);
    }

    Handlebars.registerPartial({
        'empty_header': '<header class="bar bar-nav">'+
                            '<h1 class="title">Peeqo</h1>'+
                        '</header>'
    })

    var scan_template = Handlebars.compile($("#scan").html())
    var find_peeqo_template = Handlebars.compile($("#find_peeqo").html());
    var found_peeqo_template = Handlebars.compile($("#found_peeqo").html());
    var not_found_peeqo_template = Handlebars.compile($("#not_found_peeqo").html());
    var pairing_error_template = Handlebars.compile($("#pairing_error").html());
    var wifi_template = Handlebars.compile($("#wifi").html())

    function render_scan(){
        wrapper.html(scan_template());
    }

    function render_find_peeqo(){
        wrapper.html(find_peeqo_template());
        connected_via_ble = true;
        ble.startScan([], onFoundPeeqo, onError);
        searchPeeqoTimer();
    }

    function render_found_peeqo(device){
        wrapper.html(found_peeqo_template(device));
    }

    function render_not_found_peeqo(){
        wrapper.html(not_found_peeqo_template());
    }

    function render_pairing_error(){
        wrapper.html(pairing_error_template());
    }

    function render_wifi(){
        wrapper.html(wifi_template())
    }

    ///**** EVENTS ****////

    document.addEventListener('deviceready', function(){

        // ios7 status bar issue fix
        // StatusBar.overlaysWebView(false);
        // StatusBar.backgroundColorByHexString('#ffffff');
        // StatusBar.styleDefault();

        FastClick.attach(document.body);

        // override default HTML alert to look native
        if(navigator.notification) {
            window.alert = function(message) {
                navigator.notification.alert(
                    message,  //the message
                    null,     // callback
                    "Lumen",  // title
                    'OK'      // button name
                );
            };
        }

    }, false)

    $(document).on('click', '#scan_ble', function(e){
        e.preventDefault();
        render_find_peeqo();
    })

    $(document).on('click', '#connect', function(e){
        e.preventDefault();

        if($(e.target).attr('data-device-id')){
            console.log("setting lumen to device id");
            var device_id = e.target.dataset.deviceId;
            peeqo_id = device_id;
        } else {
            console.log("no data attr")
        }

        $(".loading").css('display', 'block')
        console.log(peeqo_id);
        ble.connect(peeqo_id, pairedPeeqoSuccess, pairedPeeqoError)
    })

    $(document).on('click', '#find', function(e){
        e.preventDefault();
        render_find_peeqo();
    })

    $(document).on('click', '#reconnect', function(e){
        e.preventDefault();
        render_find_peeqo();
    })

    $(document).on('click', '#connect_to_wifi', function(e){
        e.preventDefault();

        var ssid = $("#wifi_ssid").val()
        var pass = $("#wifi_pass").val()
        

        if(ssid && pass){
            // write ssid
            ble.write(peeqo_id, peeqo.service, peeqo.ssid, stringToBytes(ssid))

            //write password
            ble.write(peeqo_id, peeqo.service, peeqo.password, stringToBytes(pass))

            $("#wifi_ssid").val("");
            $("#wifi_pass").val("");
        } else {
            alert("Enter wifi details")
        }
        
    })


    function onFoundPeeqo(device){
        if(device.name.match(/peeqo/i) && typeof(device) == 'object'){
            ble.stopScan(function(){
                console.log("Stopped scan, peeqo found")
            }, function(){
                console.log("couldnt stop scan")
            })

            clearSearchPeeqoTimer();

            render_found_peeqo(device);
        } else {
            console.log("a device i dont care about")
        }
    }

    function onError(msg){
        alert("ERROR: "+msg)
    }

    function pairedPeeqoSuccess(){
        render_wifi();
    }

    function pairedPeeqoError(){
        render_pairing_error();
    }

    render_scan();

}());