// JavaScript Document
var winvader = {"slider_animation":"","slider_slideshowSpeed":"5000","slider_animationSpeed":"600","slider_pauseOnHover":"1","navigate_text":"Navigate to...","rtl":""};



jQuery(function(){
	//Elements page
	jQuery('.dropdown-toggle').dropdown();
	
	//Link menu
	jQuery('.header-link-menu .menu').first().addClass('linkmenu');
	
	//Search Form
	jQuery('.region-bot-header form').addClass('search_box_2');	
	jQuery('.region-bot-2-header form').addClass('search_box search_box_1');
	jQuery('.form-item-search-block-form input[type=text]').addClass('s').removeAttr('id');

	
	//like
	jQuery('.entry-meta .entry-like .rate-button.rate-yesno-btn').addClass('fa fa-heart-o');
	
	//Comment
	jQuery('.set-cmt-url').attr('href',jQuery('.get-cmt-url').attr('href'));
	jQuery('.indented > li').addClass('comment byuser comment-author-Bershaddsky bypostauthor odd alt depth-2');
	jQuery('.links.inline li.comment-reply').addClass('comment-reply-link');
	
	
	//contact form
	jQuery('.contact-form .form-item-subject').remove();
	jQuery('.contact-form .form-item-copy').remove();
	jQuery('.contact-form .form-textarea').attr('placeholder','Message');
	jQuery('.contact-form .form-item-mail .form-tex').attr('placeholder','Email');
	jQuery('.contact-form .form-item-name .form-tex').attr('placeholder','Name');
	
	
	//Read More button: use attribute data-term-id of div.block-content
	jQuery('.row.block').each(function(){
		jQuery('.block-more.cat-link',this).attr('href',jQuery('.block-more.cat-link',this).attr('data-url') + '/taxonomy/term/' + jQuery('.block-content',this).attr('data-term-id'));
	});
	
	//background
	jQuery('.cfa-wrapper').each(function(){
		$val = jQuery(this).attr('data-bg');
		jQuery(this).css("background-image","url("+$val+")");
	});
});




//footer widget
jQuery(document).ready(function($){
	var flick = document.getElementById('flickr-widget');
	var idflick = flick.getAttribute('data-idflick');
	var num = flick.getAttribute('data-number');
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?ids=" + idflick +"&lang=en-us&format=json&jsoncallback=?", function(data){
		$.each(data.items, function(index, item){
			if(index >= num){
				return false;	
			}
			$("<img style='width: 100%; height: auto;' alt='flickr'/>").attr("src", item.media.m.replace('_m','_s')).appendTo("#flickr-widget").wrap("<li><a style='width: 115px; height: 115px;' class='flicker-popup-link cursor-zoom' target='_blank' href='" + item.media.m.replace('_m','_b') + "'></a></li>");

			$('.flicker-popup-link').magnificPopup({
				type: 'image',
				closeOnContentClick: true,
				closeBtnInside: false,
				fixedContentPos: true,
				mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
				image: {
					verticalFit: true
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 600, // duration of the effect, in milliseconds
					easing: 'ease', // CSS transition easing function
					opener: function(element) {
					return element.find('img');
					}
				}
			});
		});
	});
});


/* <![CDATA[ */
var gmb_data = {"399":{"id":"399","map_params":{"title":"Miami","width":"100","height":"600","latitude":"25.777173","longitude":"-80.21995400000003","zoom":"15","default_marker":"images\/default-marker.png"},"map_controls":{"zoom_control":"DEFAULT","pan_control":"true","map_type_control":"horizontal_bar","draggable":"true","double_click_zoom":"true","wheel_zoom":"none","street_view":"true"},"map_theme":{"map_type":"RoadMap","map_theme_json":"[ { \"featureType\": \"landscape\", \"elementType\": \"labels\", \"stylers\": [ { \"visibility\": \"off\" } ] },{ \"featureType\": \"transit\", \"elementType\": \"labels\", \"stylers\": [ { \"visibility\": \"off\" } ] },{ \"featureType\": \"poi\", \"elementType\": \"labels\", \"stylers\": [ { \"visibility\": \"off\" } ] },{ \"featureType\": \"water\", \"elementType\": \"labels\", \"stylers\": [ { \"visibility\": \"off\" } ] },{ \"featureType\": \"road\", \"elementType\": \"labels.icon\", \"stylers\": [ { \"visibility\": \"off\" } ] },{ \"stylers\": [ { \"hue\": \"#00aaff\" }, { \"saturation\": -100 }, { \"gamma\": 2.15 }, { \"lightness\": 12 } ] },{ \"featureType\": \"road\", \"elementType\": \"labels.text.fill\", \"stylers\": [ { \"visibility\": \"on\" }, { \"lightness\": 24 } ] },{ \"featureType\": \"road\", \"elementType\": \"geometry\", \"stylers\": [ { \"lightness\": 57 } ] } ]"},"map_markers":[{"title":"Miami Florida","description":"Our main office","reference":"CnRqAAAATzJioP-zr2CR6vlhwOEmYp8xgL1HtaoAK9uww3_H-rXb2wkaG43ie7wWNHpKxh_VqFgSHO6FVg94GpVU9bsKnLCoI_IuUiWbSalqmpDc4r5_lsiSdxMWwifT0NDg8l0f5Oe8ezemIYlw_YrSKic_eBIQOfn0oIcYt4MtjrSs_j1grBoUHQk9GhhayF3FWbAazQTqpRzqff0","lat":"25.777173","lng":"-80.21995400000003","marker":"{ path : MAP_PIN, fillColor : \"#fa4d01\", fillOpacity : 1, strokeColor : \"\", strokeWeight: 0, scale : 1 \/ 3 }","label":"<i class=\"\" style=\"color:#FFFFFF; font-size: 20px;position: relative; top: -3px;\"><\/i>"}],"places_api":{"show_places":"no","search_radius":"1000","search_places":""},"map_markers_icon":"images\/google-map-marker.png"}};
/* ]]> */