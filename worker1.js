var http = require( "http" );

var data = /*JSON.parse( process.argv[ 2 ] ) || */{num:0,some:'thing'},
	port = 9090 + data.num || 0;


console.log( "Process.argv ", process.argv );

http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'application/json' });
	res.end( JSON.stringify( data ));
}).listen( port );