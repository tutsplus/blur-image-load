(function( $ ){

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

		if ( figure.is( '.is-visible' || '.is-loaded' ) ) {
			return;
		}

		if ( figure.visible( true ) ) {
		
			figure.addClass( 'is-visible' );

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

(function( $ ) {

	'use strict';

	$( '#content' )
		.imagesLoaded()
			.progress( function( instance, image ) {

				if ( false === image.isLoaded ) {
					return;
				}
				
				var img    = image.img;
				var	canvas = image.img.nextElementSibling;

				window.StackBlur.image( img, canvas, 6 );
				canvas.classList.add( 'img-blur', 'fade-in' );

			})
			.done( function( instance ) {

				const instances = instance.images;

				$.each( instances, function( i, value ) {

					const image  = $( value.img );
					const figure = image.parent( 'figure ');

					figure.beinglazy( image );
					
					$( window ).deb( 'scroll', function() {
						figure.beinglazy( image );
					}, 180 );

				});
			});

})( jQuery );