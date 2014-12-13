var http = require( "http" );

var data = JSON.parse( process.env.data || '{}' );
data.addedInWorker = 456;

console.log( 'data obj in worker', data );

var server = http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'application/json' });
	res.end( JSON.stringify( data ));
});

server.listen( data.port || 9090 );

process.on('SIGTERM', function ( s ) {
	console.error('worker exit with SIGTERM', s );
	server.close();
	process.exit();
});

process.on('exit:code', function(code) {
	console.error('worker exited with code ' + code);
});

process.on( 'uncaughtException', function ( err ) {

	console.error( 'exception in worker.js' );
	console.error( err.stack );
});
