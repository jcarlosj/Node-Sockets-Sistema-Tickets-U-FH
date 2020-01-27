/** Dependencias Nativas de Node */
const fs = require( 'fs' );

/** Clase - Model */
class Ticket {
    constructor( number, desktop ) {
        this .number = number;
        this .desktop = desktop;
    }
}

/** Clase */
class TicketControl {
    constructor() {
        this .last = 0;                         // Ultimo Ticket
        this .today = new Date() .getDate();    // Fecha actual 
        this .pendingTickets = [];              // Tickets sin atender
        this .validatePendings();               // Valida Tickets Pendientes 
    }

    validatePendings() {
        let data = require( '../data/data.json' );

        /** Valida si algun registro tiene la fecha actual */
        if( data .today === this .today ) {     // Aun hay tickets pendientes
            this .last = data .last;
            this .pendingTickets = data .tickets;   // Obtiene los tickets pendientes guardados y los carga al objeto
        } 
        else {                                  // Es un día nuevo, entonces reinicia el conteo
            this .resetCount();
        }

        console .log( 'dataFile', data );

    }

    resetCount() {
        this .last = 0;
        this .pendingTickets = [];
        console .log( 'Reinicia conteo, es un nuevo día' );
        this .saveData();
    }

    next() {
        this .last += 1;
        this .pendingTickets .push( new Ticket( this .last, null ) );
        this .saveData();

        return `Ticket ${ this .last }`;
    }

    getLast() {
        return `Ticket ${ this .last }`;
    }

    saveData() {
        let jsonData = {        // Data in JSON
                today: this .today,
                last: this .last,
                tickets: this .pendingTickets      // Guarda los tickets pendientes del objeto en el archivo
            },
            data = JSON .stringify( jsonData );    // Data in String

        fs .writeFileSync( './server/data/data.json', data );   // Guarda datos en el archivo 'data.json'
        console .log( 'Guarda los datos' );   
    }

}

/** Exporta Clase */
module .exports = {
    TicketControl
}