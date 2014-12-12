var hookshot = require( 'hookshot' );


hookshot()
	.on( 'push', function( info ) {
		console.log( 'ref ' + info.ref + ' was pushed.' )
	});

hookshot( 'refs/heads/master', 'git pull' ).listen( 9095 );