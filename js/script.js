(function($, blur) {

	$( '#content' )
		.imagesLoaded()
		.progress( function( instance, image ) { // Triggered after each image has been loaded.

			// Abort early if the image is not loaded.
			if ( false === image.isLoaded ) {
				return;
			}

			// Let's get started.
			var imgSmall   = image.img,
				canvasElem = imgSmall.nextElementSibling;

			// Blur the image.
			blur.image( imgSmall, canvasElem, 6 );

			// Additionally add class to the canvas element.
			$( canvasElem ).addClass( 'img-blur is-blurred' );

			// Now, let's create a new image for the large image.
			var largeWidth  = $( imgSmall ).data( 'large-width' ),
				largeHeight = $( imgSmall ).data( 'large-height' ),
				imgLarge    = $( new Image( largeWidth, largeHeight ) );

			imgLarge
				.attr({ // Assign attributes to the large image.
					'src'    : $( imgSmall ).data( 'large' ), // Set the image source.
					'class'  : 'img-large',
					'alt'    : ''
				})
				.on( 'load', function() { // Once the image is loaded.

					var thisImg   = $( this ),
							figureElem = $( imgSmall.parentElement );

					// Insert the large image after the <canvas> element.
					thisImg
						.insertAfter( canvasElem )
						.addClass( function() { 

							/**
							 * Assign class names.
							 * If the image is visible in the viewport,
							 * add the 'is-visible' class to apply the fadeIn transition.
							 *
							 * Otherwise, just add 'is-loaded' and hold the transition later.
							 */
							var className = ( $( figureElem ).visible( true ) ) ? 'is-loaded is-visible' : 'is-loaded';

							return className;

						});

						// Let's check the image visibility again with the user scroll.
						$( window ).on( 'scroll', function() {
							if ( thisImg.visible( true ) ) {
								thisImg.addClass( 'is-visible' );
							}
						});
			});
	});

})(jQuery, window.StackBlur);