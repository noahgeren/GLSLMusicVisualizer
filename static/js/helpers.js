
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

		readURL( '5d00000100c50300000000000000381c88cdaf8125d4569ed1e6e6c09c2fe72b7d489ad9d27ce026c1d90b38e6a986e7c482f98001c7d016ca8db7da32debe67fc602659f4e96ae150d75ea26ae8e8f4056e0b845d0814a2acee3a47ec45af66fb262b03d227e07b5f66a53808b9aee4d95818d97807537e617ce9f7c2b406ca63cc0fc644ff064352e4e06f3a90ae830f2665756df31e89fda5afb13361e53e4122789d796f5884a6ef0a848508f7a747d342fc99afb9d3f1e61309c7bd1f4f2b1d7b1fe02a59099b6c549b2f7fca2a5ac93df5a5eeb08ceaaad351d30c359df4f7fb90bb1a9f2eeb2c45edfb4f6bb5c013c30fc64e6bef7cbb0c808ca34c9b7edaadbdf44b7cdbe25bd991ecb7dca354fb41c4512569d209b8732f77d1821b5275c3202cc4a225b3d0aef4bde5907535159b36fcc48f8913e8f0635c6c98b630b12c4d6289b9f3fcbd522b7f93b92359b3040c4ee9af3a46dad0eea4edcac0daa2b1dd566f53860922f8fbcdca4d01752829cf7512d7d8cbee3d8ec565576b775c1b92bd6eab967607980d0188b9b0acd97506f883e742864baf218fa07bb352427a1f8fe6d291d1c48e46808e928721d70002a094caae65e7964d6db36c181a91ea6376262a69bdadb652e27283ec8e90fc975439' );

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

