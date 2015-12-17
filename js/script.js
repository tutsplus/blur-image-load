(function($, blur) {

	function loadLargeImage( imgSmall, insertAfterElem ) {

		// Now, let's create a new image for the large image.
		var largeWidth  = $( imgSmall ).data( 'large-width' ),
			largeHeight = $( imgSmall ).data( 'large-height' ),
			imgLarge    = $( new Image( largeWidth, largeHeight ) );

			imgLarge
				.attr({ // Assign attributes to the large image.
					'src'   : $( imgSmall ).data( 'large' ), // Set the image source.
					'class' : 'img-large',
					'alt'   : ''
				})
				.on( 'load', function() { // Once the image is loaded.
					// Insert the large image after the <canvas> element.
					$( this )
						.insertAfter( insertAfterElem )
						.addClass( function() {
							if ( ! $( this ).hasClass( 'fade-in' ) ) {
								return 'fade-in';
							}
						} );
				});

	}

	$( '#content' )
		.imagesLoaded()
		.progress( function( instance, image ) { // Triggered after each small image has been loaded.

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
			$( canvasElem ).addClass( 'img-blur fade-in' );

			if ( $( canvasElem ).visible( true ) ) {
				loadLargeImage( imgSmall, canvasElem );
			}

		}).done( function( instance ) {

			var images = instance.images;

			$.each( images, function( index, image ) {
				$( window ).on( 'scroll', function() {
					
					var imgSmall = image.img;
				
					if ( 0 === $( imgSmall ).siblings( '.img-large' ).length ) {

						var canvasElem = imgSmall.nextElementSibling;

						if ( $( canvasElem ).visible( true ) ) {
							loadLargeImage( imgSmall, canvasElem );
						}	
					}

				});
			});
			
		});

})(jQuery, window.StackBlur);