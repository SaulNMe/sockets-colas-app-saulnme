var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


$('h1').text('Escritorio' + escritorio);

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio: escritorio},function(res){

        if(res === 'No hay tickets') {
            label.text('Ya no hay tickets');

            alert('No hay más tickets');
            return;
        }
        label.text('ticket ' + res.numero)
    });
});
