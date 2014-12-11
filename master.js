const
	child_process = require('child_process');

var settings = {
	type: 'test worker',
	key: 'value'
};

var workers = [];

for( var i = 0; i < 2; i++ ) {

	settings.num = i;
	var ls = child_process.spawn( 'forever',
		[ 'worker.js', JSON.stringify( settings )]
	);

	console.log( 'worker ' + i + ' spawned' );

	ls.stdout.on( 'data', function ( data ) {
		console.log( 'stdout: ' + data );
	});

	ls.stderr.on( 'data', function ( data ) {
		console.log( 'stderr: ' + data );
	});

	ls.on( 'close', function ( code ) {
		console.log( 'child process exited with code ' + code );
	});

	workers[ i ] = ls;
}

process.on( 'exit', function () {
	console.error( 'master.js to exit.' );
	for ( var i = 0, ls; ls = workers[ i ]; i++ ) {
		ls.exit( 0 );
	}
});