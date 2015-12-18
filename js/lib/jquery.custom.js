(function( $ ) {

	'use strict';

	var debounce = function( func, threshold, execAsap ) {

		var timeout;

		return function debounced() {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				}
				timeout = null;
			}

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	};

	$.fn.deb = function( evt, func, threshold ) {
		return func ? this.on( evt || 'resize', debounce( func, threshold ) ) : false;
	};

	$.fn.beinglazy = function( image ) {

		var	figure = this, width, height;

		if ( figure.is( '.is-seen' || '.is-loaded' ) ) {
			return;
		}

		if ( figure.visible( true ) ) {

			figure.addClass( 'is-seen' );

			image  = $( image );
			width  = image.data( 'large-width' );
			height = image.data( 'large-height' );

			$( new Image( width, height ) ).attr({
				'src'   : image.data( 'large' ),
				'class' : 'img-large',
				'alt'   : ''
			})
			.on( 'load', function() {
				figure.addClass( 'is-loaded' );
				image.siblings( 'canvas' )
				.after( $( this ).addClass( 'fade-in' ) );
			});
		}
	};
	
})( jQuery );