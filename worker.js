var http = require( "http" );

var data = JSON.parse( process.argv[ 2 ] ),
	port = 9090 + data.num;
console.log( "Process "+ data.num +" received data ", JSON.stringify( data ) );

http.createServer( function ( req, res ) {
	res.writeHead( 200, { 'Content-Type': 'application/json' });
	res.end( JSON.stringify( data ));
}).listen( port );