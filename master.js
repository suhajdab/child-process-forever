var forever = require('forever-monitor');


for ( var n = 0; n < 1; n++ ) {
	var params = {
		something: 'other',
		num      : n,
		port     : 9090 + n
	};

	//console.log(params);

	var child = new (forever.Monitor)('worker.js', {
		max: 3,
		//watch: true,
		uid: 'worker' + n,
		killTTL : 5000,
		killSignal : 'SIGTERM',
		env: { data: JSON.stringify( params )}
	});

	child.on('exit', function () {
		console.log('worker.js has exited after 3 restarts');
	});

	child.on('watch:restart', function(info) {
		console.error('Restaring script because ' + info.file + ' changed');
	});

	child.on('restart', function() {
		console.error('Forever restarting script for ' + child.times + ' time');
	});

	child.on('exit:code', function(code) {
		console.error('Forever detected script exited with code ' + code);
	});

	child.start();

}

process.on( 'uncaughtException', function ( err ) {
	console.error( 'exception in master.js' );
	console.error( err.stack );
});
