(function( $ ) {

	'use strict';

	$( '#content' )
		.imagesLoaded()
		.progress( function( instance, image ) {

			if ( false === image.isLoaded ) {
				return;
			}

			var img    = image.img;
			var	canvas = img.nextElementSibling;

			window.StackBlur.image( img, canvas, 6 );
			canvas.classList.add( 'img-blur', 'fade-in' );
		})
		.done( function( instance ) {

			$.each( instance.images, function( i, value ) {

				const image  = $( value.img );
				const figure = image.parent( 'figure ');

				figure.beinglazy( image );

				$( window ).deb( 'scroll', function() {
					figure.beinglazy( image );
				}, 180 );

			});
		});

})( jQuery );