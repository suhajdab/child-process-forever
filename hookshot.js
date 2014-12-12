var hookshot = require( 'hookshot' );


hookshot()
	.on( 'push', function( info ) {
		console.log( 'ref ' + info.ref + ' was pushed.' )
	});

hookshot( 'ref/testing', 'git pull' ).listen( 9095 );