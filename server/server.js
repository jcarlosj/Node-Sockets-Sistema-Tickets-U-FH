const express = require( 'express' ),
      app = express(),
      /** Variables de Entorno */
      port = process.env.PORT || 3000;

/** Lanza el Servidor */
app .listen( port, ( error ) => {
    if ( error ) throw new Error( error ) ;
    console .log( `Servidor lanzado en http://localhost:${ port }` );
}); 