const express = require( 'express' ),
      app = express(),
      socketIO = require( 'socket.io' ),
      /** Dependencias Nativas */
      http = require( 'http' ),
      path = require( 'path' ),
      /** Proyecto */
      publicPath = path .resolve( __dirname, '../public' ),
      server = http .createServer( app ),       // Configuración de http con Express
      io = socketIO( server ),                  /* Inicializa el servicio de Sockets con el Servidor. Mantiene Conexión Activa con el BackEnd
                                                   NOTA: Como la nombre en el BackEnd debo invocarla en el FrontEnd en este caso 'io'
                                                */
      /** Variables de Entorno */
      port = process.env.PORT || 3000;

/** Middlewares */
app .use( express .static( publicPath ) );

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
    client .on( 'userData', ( message ) => {     // 'userData' Nombre del evento esperado
        console .log( message );
    });
});

/** Lanza el Servidor */
server .listen( port, ( error ) => {
    if ( error ) throw new Error( error ) ;
    console .log( `Servidor lanzado en http://localhost:${ port }` );
}); 