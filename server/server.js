const express = require( 'express' ),
      app = express(),
      /** Dependencias Nativas */
      path = require( 'path' ),
      /** Proyecto */
      publicPath = path .resolve( __dirname, '../public' ),
      /** Variables de Entorno */
      port = process.env.PORT || 3000;

/** Middlewares */
app .use( express .static( publicPath ) );

/** Lanza el Servidor */
app .listen( port, ( error ) => {
    if ( error ) throw new Error( error ) ;
    console .log( `Servidor lanzado en http://localhost:${ port }` );
}); 