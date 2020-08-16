
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

		readURL( '5d00000100e00300000000000000381c88cdaf8125d4569ed1e6e6c09c2fe72b7d489ad9d27ce026c1d90b38e6a986e7c482f98001c7d016ca8db7da32debe67fc602659f4e96ae150d75ea26ae8e8f4056e0b845d0814a2acee3a47ec45af66fb262b03d227e07b5f66a53808b9aee4d95818d97807537e617ce9f7c2b406ca63cc0fc644ff05ca878f851033f9ed4f05b05a345d1946e1cbbc3c46f8b611df139ebafa9d42989b3e289b64881cb886a11abb713e063aeee514db8ad3b5188d8b3c67a550da7622f4e95b2cc563f3a0a5240f84ad3c4e81709aa69d586323b419dc0021989c2d798759a319400ff84260e5d954bc6812dbe3b17d7740ad28f8035641e9b96097491d85a4e0b1298a37edc64d8025b6d6c9bd716c98240d0d9b15dba79e29527f8ee8e999abd49a4a48cc39987092261ba4738cde50c22fe47e9cba0a74cb059ca582b19e74e49843deba4cea12e1b86aff70b03e91c38f8119902dcde65f2769a3f728fbc464d468765fd8a9dec89e689ceee1946bd21c3d795596a530dfdce73d08956d79836e4a8a4ca694cb3d9c29a421297d93efc89ac1a66a9148c576b6af49640e55b518b99c1f130a0b926764d02ead37e7d03dbff21b658ef94b93e52cd4ba5a7513a4eeaffd72db7eb9ada538d285fff561bd2c' );

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

