(function( $ ) {

	'use strict';

	var acme = {
		debounce : function( func, wait, immediate ) {
			
			var timeout;

			return function() {
				var context = this, args = arguments;
				var later   = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;

				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},
		img : function( img, canvas ) {

			var width    = img.data( 'large-width' );
			var	height   = img.data( 'large-height' );
			var	imgLarge = $( new Image( width, height ) );

			imgLarge
			.attr({
				'src'   : img.data( 'large' ),
				'class' : 'img-large',
				'alt'   : ''
			})
			.on( 'load', function() {
				img.parent().addClass( 'is-loaded' );
				canvas.after( $( this ).addClass( 'fade-in' ) );
			});
		}
	};

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

		}).done( function( instance ) {

			$.each( instance.images, function( index, image ) {

				var	img    = $( image.img );
				var	canvas = $( image.img.nextElementSibling );
				var figure = $( image.img.parentElement );

				if ( figure.visible( true ) ) {
					figure.addClass( 'is-visible' );
					acme.img( img, canvas );
				} else {
					$( window ).on( 'scroll', acme.debounce( function() {
						if ( figure.visible( true ) && ! figure.is( '.is-visible' ) ) {
							figure.addClass( 'is-visible' );
							acme.img( img, canvas );
						}
					}, 300 ));
				}

			});
		});

})( jQuery );