
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

		readURL( '5d00000100a00400000000000000381c88cdaf8125d4569ed1e6e6c09c2fe72b7d489ad9d27ce026c1d90b38e6a986e7c482f98001c7d016ca8db7da32debe67fc602659f4e96ae150d75ea26ae8e8f4056e0b845d0814a2acee3a47ec45af66fb262b03d227e07b5f66a53808b9aee4d95818d97807537e617ce9f7c2b406ca63cc0fc644ff05ca878f851033f9ed4f05b05a345d1946e1cbbc3c46f8b611df139ebafa9d42989b3e289b64881cb886a11abb713e063aeee514db8ad3b5188d8b3c67a550da7622f4e95b2cc563f3a0a5240f84ad3c4e81709aa69d586323b419dc0021989c2d798759a319400ff84260e5d954bc6812dbe3b17d7740ad28f8035641e9b96097491d85a4e0b1298a37edc64d8025b6d6c9bd716c98240d0d9b15dba79e29527f8ee8e999abd49a4a48d5b25dde59582490912e6982fd2d6529697f4b12fd0ff42b77823dd4a4ab3be4bf247873e33883e98a95bae8538903c8d0f15838e6165f54c091b7c414146cf1d5ea9b1ea97e972130dadff61d0bc5b2dae8832e186579cf7d68866f2c8e55f1c8eabd5313a72c20f01d73f7f954c491c43ce305b5b6de63b0783330d0dffad2f2e5309f2d86bd599f9e6b8ff11cd0ae81989cfa4ee6e8b81b5e291d203118afe41edb6449fffbe49263938a15d68e670389d201ee2f97ddea1c3afb7e9213c4c0031f1556540abcb876a58a6e4bbea8b54c21ef9b2417405c3a661c7b470dbde61d5c499a3b8b0a9e69144232fbfef5a64d8b' );

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

