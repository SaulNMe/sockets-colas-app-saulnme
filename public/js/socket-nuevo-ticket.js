var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function (){
    console.log("conectado al servidor");
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function (estado) {
    label.text(estado.actual);
})


$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});