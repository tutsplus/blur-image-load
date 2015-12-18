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

	$.fn.lazy = function( image ) {

		var	self  = this;
			image = $( image );

		if ( self.is( '.is-visible' ) ) {
			return;
		}		

		if ( self.visible( true ) ) {
			
			self.addClass( 'is-visible' );

			var width  = image.data( 'large-width' );
			var	height = image.data( 'large-height' );
			var	imgNew = $( new Image( width, height ) );

			imgNew
				.attr({
					'src'   : image.data( 'large' ),
					'class' : 'img-large',
					'alt'   : ''
				})
				.on( 'load', function() {
					self.addClass( 'is-loaded' );
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

				const images = instance.images;

				$.each( images, function( index, image ) {

					$( image.img )
						.parent( 'figure ')
						.lazy( image.img );
				});

				$( window ).deb( 'scroll', function() {

					$.each( images, function( index, image ) {

						$( image.img )
							.parent( 'figure ')
							.lazy( image.img );
					});

				}, 240 );
			});

})( jQuery );