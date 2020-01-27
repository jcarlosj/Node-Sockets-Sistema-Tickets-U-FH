/** Dependencias Nativas de Node */
const fs = require( 'fs' );

/** Clase */
class TicketControl {
    constructor() {
        this .last = 0;                         // Ultimo Ticket
        this .today = new Date() .getDate();    // Fecha actual 
        this .validatePendings();               // Valida Tickets Pendientes 
    }

    validatePendings() {
        let data = require( '../data/data.json' );

        /** Valida si algun registro tiene la fecha actual */
        if( data .today === this .today ) {     // Aun hay tickets pendientes
            this .last = data .last;
        } 
        else {                                  // Es un día nuevo, entonces reinicia el conteo
            this .resetCount();
        }

        console .log( 'dataFile', data );

    }

    resetCount() {
        this .last = 0;
        console .log( 'Reinicia conteo, es un nuevo día' );
        this .saveData();
    }

    next() {
        this .last += 1;
        this .saveData();

        return `Ticket ${ this .last }`;
    }

    saveData() {
        let jsonData = {        // Data in JSON
                today: this .today,
                last: this .last
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