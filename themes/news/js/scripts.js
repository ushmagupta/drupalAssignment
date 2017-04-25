(function ($) {

	"use strict";
	
	// Pre Loader
	
	$(document).ready(function() {
		
	  // Fakes the loading setting a timeout
		setTimeout(function() {
			$('body').addClass('loaded');
		}, 400);
	 
	});
	  

	/*-------------------------*/	
	
	$(function() {

		/**
		 * submenu indicator & fade animation
		 */
		 //Footer Menu
		$('#footer-area ul.sub-menu').first().attr('id','footermenu');
		$('#footermenu').removeClass('sub-menu');
		$('#footermenu li').addClass('menu-item menu-item-type-custom menu-item-object-custom');
		$('#footermenu li.expanded').addClass('menu-item-has-children');
		$('#footermenu li.expanded > a').addClass('parent');
		 //Main Menu
		$('#mainnav ul.sub-menu').first().attr('id','mainmenu');
		$('#mainmenu').removeClass('sub-menu');
		$('#mainmenu li').addClass('menu-item menu-item-type-custom menu-item-object-custom');
		$('#mainmenu li.expanded').addClass('menu-item-has-children');
		$('#mainmenu li.expanded > a').addClass('parent');
		
		var icon_dir = 'right';
		if (winvader.rtl) {
			icon_dir = 'left';
		}
		$('#mainmenu > li:has(ul) > a').addClass('parent').append('<i class="mainmenu-fa-icon fa fa-angle-down"></i>');
		$('#mainmenu ul li:has(ul) > a').addClass('parent').append('<i class="mainmenu-fa-icon fa fa-angle-' + icon_dir + '"></i>');
		$('.linkmenu > li:has(ul) > a').addClass('parent').append('<i class="linkmenu-fa-icon fa fa-angle-down"></i>');
		$('.linkmenu ul li:has(ul) > a').addClass('parent').append('<i class="linkmenu-fa-icon fa fa-angle-' + icon_dir + '"></i>');
		$('#mainmenu li').hover(function() {
			$(this).children('ul').stop().fadeIn(200);
		}, function() {
			$(this).children('ul').stop().fadeOut('fast');
		});
		$('.linkmenu li').hover(function() {
			$(this).children('ul').stop().fadeIn(200);
		}, function() {
			$(this).children('ul').stop().fadeOut('fast');
		});

		/**
		 * add select menu for mainmenu
		 */
		if ($.fn.mobileMenu) {
			$('#mainmenu').mobileMenu({
				defaultText: winvader.navigate_text,
				className: 'mainmenu'
			});
		}
		

		/**
		 * add masonry layout
		 */
		var mcontainer = $('.masonry-container');
		var masonry_rtl = false;
		if (winvader.rtl) {
			masonry_rtl = true;
		}
		mcontainer.each(function() {
			var mc = $(this);
			mc.imagesLoaded(function() {
				mc.masonry({
					itemSelector: 'article',
					isAnimated: true,
					isOriginLeft: !masonry_rtl
				});
			})
		});
		
		
		/**
		 * add masonry for blocks
		 */
		var mcontainer = $('.masonry-container-block');

		mcontainer.each(function() {
			var mc = $(this);
			mc.imagesLoaded(function() {
				mc.masonry({
					itemSelector: 'li',
					isAnimated: true,
					isOriginLeft: !masonry_rtl
				});
			})
		});		

		/**
		 * add Magnidic Popup call if plugin included
		 */
		 
		 
		 
		//  Popup for images
  
		$('.popup').magnificPopup({ 
			type: 'image',
			fixedContentPos: false,
				gallery: {
			  enabled: true
			},
			closeBtnInside:true,
			alignTop:false,

			fixedBgPos: false,
				removalDelay: 300,
				mainClass: 'mfp-fade'

		});
		 
		  
		 
		if ($.fn.magnificPopup) {
			$('.popup').magnificPopup({
			type: 'image',
			fixedContentPos: false,
				gallery: {
			  enabled: true
			},
			closeBtnInside:true,
			alignTop:false,

			fixedBgPos: false,
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		}

		/**
		 * contact widget validation and submit action
		 */
		$('[name="contact_name"], [name="contact_email"], [name="contact_message"]').keyup(function() {
			if ($(this).val() != '') {
				$(this).removeClass('err');
			}
		});
		$('.widget_winvader_contact form').submit(function(e) {
			e.preventDefault();
			var f = $(this);
			var loading = f.find('.loading');
			var contact_msg = f.prev('.contact-msg');
			var contact_name = f.find('[name="contact_name"]');
			var contact_email = f.find('[name="contact_email"]');
			var contact_message = f.find('[name="contact_message"]');
			loading.show();
			contact_msg.html('');
			$.ajax({
				type: 'POST',
				url: winvader.ajaxurl,
				data: $(this).serialize(),
				datatype: 'json',
				timeout: 30000,
				error: function() {
					loading.hide();
				},
				success: function (response) {
					loading.hide();
					switch (response.status) {
						case 1:
							contact_msg.html(response.msg);
							f.hide();
							break;
						case 2:
							contact_msg.html(response.msg);
							break;
						case 3:
							if (typeof response.error.name != 'undefined') {
								contact_name.addClass('err');
							}
							if (typeof response.error.email != 'undefined') {
								contact_email.addClass('err');
							}
							if (typeof response.error.message != 'undefined') {
								contact_message.addClass('err');
							}
							if (typeof response.error.body != 'undefined') {
								contact_msg.html(response.error.body);
								f.hide();
							}
							break;
					}
				}
			});
			return false;
		});

		/**
		 * add fitvids for video inside content and widgets
		 */
		$('.entry-content, .widget').fitVids();

	});
	
	/**
	 * add owl-carousel
	 */	
	
	if($('.owl-carousel-featured').length){
		$('.owl-carousel-featured').owlCarousel({
	
		loop:true,
		autoplay: true,
		autoplayTimeout: parseInt(winvader.slider_slideshowSpeed),
		smartSpeed: parseInt(winvader.slider_animationSpeed),
		autoplayHoverPause: true, 
		margin:0,
		mouseDrag: true,
		lazyLoad : true,
		dots: true,
		nav:true,
		navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
		],
		items: 1,
		animateOut: winvader.slider_animation
		
	})	 
	};
	

	if($('.owl-carousel-featured-1').length){
		$('.owl-carousel-featured-1').owlCarousel({
	
		loop:true,
		autoplay: true,
		autoplayTimeout: parseInt(winvader.slider_slideshowSpeed),
		smartSpeed: parseInt(winvader.slider_animationSpeed),
		autoplayHoverPause: true, 
		margin:30,
		mouseDrag: true,
		lazyLoad : true,
		dots: true,
		nav:true,
		navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
		],
		items: 3,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},            
			960:{
				items:2
			},
			992:{
				items:2
			},
			1200:{
				items:3
			}
    },
		animateOut: winvader.slider_animation
		
	})	
	}



	/* owl-carousel-block-7 */

	$('.owl-carousel-block-7').owlCarousel({
	
			loop:true,
			margin:0,
			dots: true,
			autoHeight: false,
			nav:false,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			],
			items:1
		});

		
	/* owl-slider-gallery-post */

	
	$(window).load(function() {
		$('.owl-slider-gallery-post').owlCarousel({
		
				loop:true,
				margin:0,
				dots: true,
				autoHeight: false,
				nav:true,
				navText: [
					'<i class="fa fa-angle-left"></i>',
					'<i class="fa fa-angle-right"></i>'
				],
				items:1
			});
	});	
	

		
		

	/* post widget */

	
	$('.owl-shortnews').owlCarousel({
	
		loop:true,
		margin:30,
		dots: false,
		autoHeight: false,
		nav:true,
		// navContainer: '.owl-shortnews-nav',
		navText: [
			'<i class="fa fa-angle-left"></i>',
			'<i class="fa fa-angle-right"></i>'
		],
		items:1
	})
	
	

	$(".widget_neatly-recent-posts").each( function() {
	 $(this).find(".owl-shortnews .owl-nav")
			.appendTo( $(this).find(".owl-shortnews-nav") );
	});
		
	/*
	 $('.owl-shortnews-nav').each(function(){
		  $('.owl-shortnews .owl-nav').detach().appendTo( $('.owl-shortnews-nav') );
	  });
	*/
	
	
	// don't select function
	$('.widget_neatly-recent-posts .widgettitle').attr('unselectable', 'on').select(function() {return false}).css({
	  '-moz-user-select': '-moz-none',
	  '-o-user-select': 'none',
	  '-khtml-user-select': 'none',
	  '-webkit-user-select': 'none',
	  'user-select': 'none'
	});
		
	
	
  // Instagram

	$('.item.instagram-pic.zoom-instagram-widget__item').wrapAll('<div class="instagram-slider"><div class="instagram-pics zoom-instagram-widget__items zoom-instagram-widget__items--no-js owl-carousel owl-theme owl-loaded"></div></div>'); // ---- Instagram Block
	 
    $('.instagram-pics').owlCarousel({
		loop:true,
		margin:0,
		dots: true,
		nav:true,
		// navContainer: '.owl-shortnews-nav',
		navText: [
			'<i class="fa fa-angle-left"></i>',
			'<i class="fa fa-angle-right"></i>'
		],
		items:1
		
    });  
	
    
  
  
	
	
	/* search */
	$( "#header-main-search" ).click(function(e) {
		e.preventDefault();
		$(".search_box_1").toggleClass('active');
	});
	

	
	
	
	/* switch, toogle */
	
	
			
	$(function() {
		$('.toggle').on('click', function() {
		  if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('.toggle-light').addClass('toggle-on');
			$('.toggle-dark').removeClass('toggle-on');
			$('.skin').addClass('light');
			$('.skin').removeClass('dark');
			
			//set cookies
			$.cookie('toogle_light_cookie', 'light');
		  } else {
			$(this).addClass('on');
			$('.toggle-light').removeClass('toggle-on');
			$('.toggle-dark').addClass('toggle-on');
			//set cookies
			$.cookie('toogle_light_cookie', 'dark');
			$('.skin').addClass('dark');
			$('.skin').removeClass('light');
		  }
		});
		});
		
		

			
	//check for cookies
	var toogle_light_cookie = $.cookie('toogle_light_cookie'); //set cookie var
	
	if (toogle_light_cookie == 'light') { //if equals this val
	  		$('.toggle').removeClass('on');
			$('.toggle-light').addClass('toggle-on');
			$('.toggle-dark').removeClass('toggle-on');
			
			$('.skin').addClass('light');
			$('.skin').removeClass('dark');

	}
	
	if (toogle_light_cookie == 'dark') { //if equals this val
	  		$('.toggle').addClass('on');
			$('.toggle-light').removeClass('toggle-on');
			$('.toggle-dark').addClass('toggle-on');
			
			$('.skin').addClass('dark');
			$('.skin').removeClass('light');
	}
	if (toogle_light_cookie == null) { //if equals this val
	// do nothing
	};
	
		
	if ($('.toggle-wrapper').length < 1) {
			$('.skin').addClass('light');
			$('.skin').removeClass('dark');
			
			//set cookies
			$.cookie('toogle_light_cookie', 'light');
	}	
			
	
	/*-------------------------*/

	
	
	jQuery(document).ready(function($) {
	"use strict";
	var newwindow;	
		
	/* Share Social Buttons Modal window */
	 jQuery('.social-share a').live('click', function(){
        newwindow=window.open($(this).attr('href'),'','height=450,width=700');
        if (window.focus) {newwindow.focus()}
        return false;
    });
	});
	
	
	
	
	
	jQuery(document).ready(function($){
	"use strict";
	var optionsframework_upload;
	var optionsframework_selector;

	function optionsframework_add_file(event, selector) {

		var upload = $(".uploaded-file"), frame;
		var $el = $(this);
		optionsframework_selector = selector;

		event.preventDefault();

		// If the media frame already exists, reopen it.
		if ( optionsframework_upload ) {
			optionsframework_upload.open();
		} else {
			// Create the media frame.
			optionsframework_upload = wp.media.frames.optionsframework_upload =  wp.media({
				// Set the title of the modal.
				title: $el.data('choose'),

				// Customize the submit button.
				button: {
					// Set the text of the button.
					text: $el.data('update'),
					// Tell the button not to close the modal, since we're
					// going to refresh the page when the image is selected.
					close: false
				}
			});

			// When an image is selected, run a callback.
			optionsframework_upload.on( 'select', function() {
				// Grab the selected attachment.
				var attachment = optionsframework_upload.state().get('selection').first();
				optionsframework_upload.close();
				optionsframework_selector.find('.upload').val(attachment.attributes.url);
				if ( attachment.attributes.type == 'image' ) {
					optionsframework_selector.find('.screenshot').empty().hide().append('<img src="' + attachment.attributes.url + '"><a class="remove-image">Remove</a>').slideDown('fast');
				}
				optionsframework_selector.find('.upload-button').unbind().addClass('remove-file').removeClass('upload-button').val(optionsframework_l10n.remove);
				optionsframework_selector.find('.of-background-properties').slideDown();
				optionsframework_selector.find('.remove-image, .remove-file').on('click', function() {
					optionsframework_remove_file( $(this).parents('.section') );
				});
			});

		}

		// Finally, open the modal.
		optionsframework_upload.open();
	}

	function optionsframework_remove_file(selector) {
		selector.find('.remove-image').hide();
		selector.find('.upload').val('');
		selector.find('.of-background-properties').hide();
		selector.find('.screenshot').slideUp();
		selector.find('.remove-file').unbind().addClass('upload-button').removeClass('remove-file').val(optionsframework_l10n.upload);
		// We don't display the upload button if .upload-notice is present
		// This means the user doesn't have the WordPress 3.5 Media Library Support
		if ( $('.section-upload .upload-notice').length > 0 ) {
			$('.upload-button').remove();
		}
		selector.find('.upload-button').on('click', function(event) {
			optionsframework_add_file(event, $(this).parents('.section'));
		});
	}

	$('.remove-image, .remove-file').on('click', function() {
		optionsframework_remove_file( $(this).parents('.section') );
    });

    $('.upload-button').click( function( event ) {
    	optionsframework_add_file(event, $(this).parents('.section'));
    });

});
	



    /* Breaking News Ticker*/

    $(window).load(function() { 
        
    /* basic - default settings */
		$('.str1').liMarquee({
			direction: 'left',	
			// loop:-1,			
			// scrolldelay: 600,	
			scrollamount: 60,	
			circular: true,
            hoverstop: true,	
			drag: true			
		});

    })
	
	
	// Liked Posts Counter
	$(function () {
         $('.widget_winvader_liked_posts .liked-posts').each(function () { 
             $('.block-content', this).prepend("<span class='count'>" + ($(this).index() + 1) + "</span>");
         });
     })

	
	
	// Recent Comment First Word
	//$(".widget_polygon_widget .widgettitle span").firstWord();
	$('.widget_polygon_widget .widgettitle span').each(function() {
	   var html = $(this).html();
	   var word = html .substr(0, html.indexOf(" "));
	   var rest = html .substr(html.indexOf(" "));
	   $(this).html(rest).prepend($("<b/>").html(word).addClass("firstWord"));
	});
			
	
	// footer menu
	
	$(document).ready(function(){
		$('.sub-menu').hide();

		
		$('#footer-menu-container li').hover(function(){
			// $('.sub-menu', this).stop(true, true).delay(300).slideDown(400);
			$(this).addClass('activate');
			$(this).children('ul').stop(true, true).delay(300).slideDown(400);
		}, function() {
			$(this).removeClass('activate');
			$(this).children('ul').stop(true, true).delay(300).slideUp(400);				
		});

		
	});
	
// slide hover menu effect

$(function() {
	
	
    var $el, leftPos, newWidth,
        $mainNav = $("#footermenu");
    
    $mainNav.append("<span id='magic-line'></span>");
    var $magicLine = $("#magic-line");
    
	$(document).ready(function(){
	if ($("#footermenu")[0]){
    $magicLine
        .width($("#footermenu>li:first-child").width())
        .css("left", $("#footermenu>li:first-child>a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
	}
    });   
    
	$("#footermenu li a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });
});
 
	
})(jQuery);
