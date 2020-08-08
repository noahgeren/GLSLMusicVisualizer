
function initialize_compressor() {
	compressor=new LZMA( "js/lzma_worker.js" );
	return compressor;
}

function initialize_helper() {
}

function load_url_code() {
	if ( window.location.hash ) {

		var hash = window.location.hash.substr( 1 );
		var version = hash.substr( 0, 2 );

		if ( version == 'A/' ) {

			// LZMA

			readURL( hash.substr( 2 ) );

		} else {

			// Basic format

			code.value = decodeURIComponent( hash );

		}

	} else {

		readURL( '5d00000100720300000000000000381c88cdaf8125d4569ed1e6e6c09c2fe72b7d489ad9d27ce026c1d90b38e6a986e7c482f98001c7d016ca8db7da32debe67fc602659f4e96ae150d75ea26ae8e8f4056e0b845d0814a2acee3a47ec45af66fb262b03d227e07b5f66a53808b9aee4dcfc33f6588aa9336eeda3ea6193bc8369c8b2f0beac4d599269adc57605909505b02dd9581b621772ed205b58b6a845677ce0b668648ecfcda5aef87c4473c0d445f1bfc7450aa88684bf34624bb0b6fa3fbcd1bd46505f6245aad17d58f56fa44e697381bdab0001f6656c38d1d1f47fbfa76a5d96cf8c19b4563db598ba3babd6bbaa541635bcd8bfb80c2a77c0299e04ffcdbb35bba00b1b6b3b7270c690b1b25a16cadd621e366d8201cf6983030359a9587b2d33670705b4285f51b3dac9431e0eb07718a8d0798c29ae9d215e2d781bb42f9034f95056506e8f335e643f806b7e193ce9693f21182655ed83bc30a13b081943159cb3a93dd8cb142064e6e15964f41e4a462239e100a0c07b6d673c9887f0c62d6a6d0a04be01051fbd8d23aa46b5b9af7cba95bdb6286f08036732ffae206973' );

	}
}

function setURL( shaderString ) {

	compressor.compress( shaderString, 1, function( bytes ) {

		var hex = convertBytesToHex( bytes );
		window.location.replace( '#A/' + hex );

	},
	dummyFunction );

}

function readURL( hash ) {

	var bytes = convertHexToBytes( hash );

	compressor.decompress( bytes, function( text ) {

		compileOnChangeCode = false;  // Prevent compile timer start
		code.setValue(text);
		compile();
		compileOnChangeCode = true;

	},
	dummyFunction );

}

function convertHexToBytes( text ) {

	var tmpHex, array = [];

	for ( var i = 0; i < text.length; i += 2 ) {

		tmpHex = text.substring( i, i + 2 );
		array.push( parseInt( tmpHex, 16 ) );

	}

	return array;

}

function convertBytesToHex( byteArray ) {

	var tmpHex, hex = "";

	for ( var i = 0, il = byteArray.length; i < il; i ++ ) {

		if ( byteArray[ i ] < 0 ) {

			byteArray[ i ] = byteArray[ i ] + 256;

		}

		tmpHex = byteArray[ i ].toString( 16 );

		// add leading zero

		if ( tmpHex.length == 1 ) tmpHex = "0" + tmpHex;

		hex += tmpHex;

	}

	return hex;

}

// dummy functions for saveButton
function set_save_button(visibility) {
}

function set_parent_button(visibility) {
}

function add_server_buttons() {
}

