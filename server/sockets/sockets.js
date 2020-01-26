const { io } = require( '../server' );

/** Escucho en el evento de conexión del Cliente. */
io .on( 'connection', ( client ) => {
    console .log( 'Usuario conectado al Servidor' );    // Registro en la consola la conexión del Socket al Servidor

     /** Emite un mensaje al Cliente  */
    client .emit( 'userData', {         // 'userData' Nombre del evento que identifica el mensaje a Emitir
            user: 'admin',              // Datos Enviados a través del Socket (Generalmente en formato JSON)
            message: 'Bienvenido a la Aplicación'
        } 
    );

    /** Escucha evento de desconección del Cliente */
    client .on( 'disconnect', () => {
        console .log( 'Usuario desconectado!' );
    });

    /** Escucha al Cliente & Recoge los datos Emitidos
     *  - Esta comunicación es 1&1 (Pruebe con varias pestañas en su navegador)
     *  - El Cliente se comunica con el Servidor, pero su mensaje no es visto por otros */
    client .on( 'userData', ( message, callback ) => {     // 'userData' Nombre del evento esperado
        console .log( message );
        
        if( message .user ) {
            callback({      // Ejecuta el Callback del Evento que emite el mensaje en el FrontEnd
                success: true,
                message: 'Datos recibidos'
            });     
        }
        else {
            callback({      // Ejecuta el Callback del Evento que emite el mensaje en el FrontEnd
                success: false,
                error: {
                    message: 'El nombre del usuario es obligatorio'
                } 
            });
        }
        
    });
});