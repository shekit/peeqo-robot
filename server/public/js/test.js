$(document).ready(function(){

  var socket_url = window.socketURL

  var socket = io(socket_url + '/server_test')

  $("body").on("click",".btn", function(event){
    event.preventDefault();

    var id = $(this).attr('id')

    socket.emit(id,"yes")
  })

})