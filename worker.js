var http = require( "http" );

var data = JSON.parse( process.env.data || '{}' );
data.addedInWorker = 456;

console.log( 'data obj in worker', data );

var server = http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'application/json' });
	res.end( JSON.stringify( data ));
});

server.listen( data.port || 9090 );

process.on( 'uncaughtException', function ( err ) {
	try {
		server.close();
	} catch ( err ) {
		console.error('server close error', err );
	}

	console.error( 'exception in worker.js' );
	console.error( err.stack );
});
