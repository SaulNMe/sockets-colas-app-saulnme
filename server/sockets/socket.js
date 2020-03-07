const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


let ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual',{
        actual: ticketControl.getEstadoUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio); 


        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            play: atenderTicket != 'No hay tickets',
            ultimos4: ticketControl.getUltimos4()
        })

    });

});