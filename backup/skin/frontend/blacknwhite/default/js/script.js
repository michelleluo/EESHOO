/* Login ajax */
function ajaxLogin(ajaxUrl, clear){
	if(clear == true){
		clearHolder();
		jQuery(".ajax-box-overlay").removeClass('loaded');
	}
	jQuery("body").append("<div id='login-holder' />");
	if(!jQuery(".ajax-box-overlay").length){
		jQuery("#login-holder").after('<div class="ajax-box-overlay"><i class="load" /></div>');
		jQuery(".ajax-box-overlay").fadeIn('medium');
	}
	function overlayResizer(){
		jQuery(".ajax-box-overlay").css('height', jQuery(window).height());
	}
	overlayResizer();
	jQuery(window).resize(function(){overlayResizer()});
	
	jQuery.ajax({
		url: ajaxUrl,
		cache: false
	}).done(function(html){
		setTimeout(function(){
			jQuery("#login-holder").html(html).animate({
				opacity: 1,
				top: '100px'
			}, 500 );
			jQuery(".ajax-box-overlay").addClass('loaded');
			clearAll();
		}, 500);
	});
	
	var clearAll = function(){
		jQuery("#login-holder .close-button").on('click', function(){
			jQuery(".ajax-box-overlay").fadeOut('medium', function(){
				jQuery(this).remove();
			});
			clearHolder();
		});
	}
	function clearHolder(){
		jQuery("#login-holder").animate({
			opacity: 0,
			top: 0
		  }, 500, function() {
			jQuery(this).remove();
		});
	}
}

function loginLabel(){
	jQuery('#login-holder').each(function(){
		linkBox = jQuery(this).find('.link-box');
		linkBox.css({
			'top': linkBox.outerWidth()/2 - linkBox.outerHeight()/2 + 25,
			'right': -(linkBox.outerWidth()/2 + linkBox.outerHeight()/2)
		});
	});
}

/* isotop */
function isotopInit(){
	jQuery('.products-grid').each(function(){
		if(!jQuery(this).parents('#header').length){
			jQuery(this).isotope({
				itemSelector: '.item',
				resizable: true,
				layoutMode : 'fitRows'
			});
		}
	});
}
function isotopDestroy(){
	jQuery('.products-grid').each(function(){
		if(!jQuery(this).parents('#header').length){
			jQuery(this).isotope('destroy');
		}
	});
}
function isotopLoader(imgCount, callback){
	images = jQuery('.products-grid .product-image img');
	if(!imgCount){
		imgCount = images.size();
	}
	currentIndex = 0;
	images.load(function(){
		currentIndex++;
		if(currentIndex == imgCount){
			try{
				callback();
			}catch(err){}
			gridLabels();
			setTimeout(function(){
				isotopInit();
			}, 100);
		}
	});
}

/* Top Cart */
function topCartListener(e){
	var touch = e.touches[0];
	if(jQuery(touch.target).parents('#topCartContent').length == 0 && jQuery(touch.target).parents('.cart-button').length == 0 && !jQuery(touch.target).hasClass('cart-button')){
		jQuery('.top-cart .block-title').removeClass('active');
		jQuery('#topCartContent').slideUp(500).removeClass('active');
		document.removeEventListener('touchstart', topCartListener, false);
	}
}
function topCart(isOnHover){
	function standardMode(){
		jQuery('.top-cart .block-title').on('click', function(event){
			event.stopPropagation();
			jQuery(this).toggleClass('active');
			jQuery('#topCartContent').slideToggle(500).toggleClass('active');
			document.addEventListener('touchstart', topCartListener, false);
			
			jQuery(document).on('click.cartEvent', function(e) {
				if (jQuery(e.target).parents('#topCartContent').length == 0) {
					jQuery('.top-cart .block-title').removeClass('active');
					jQuery('#topCartContent').slideUp(500).removeClass('active');
					jQuery(document).off('click.cartEvent');
				}
			});
		});
	}
	
	if(isOnHover){
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))){
			standardMode();
		}else{
			jQuery('.top-cart').on('mouseenter mouseleave', function(event){
				event.stopPropagation();
				jQuery(this).find('.block-title').toggleClass('active');
				jQuery('#topCartContent').stop().slideToggle(500).toggleClass('active');
			});
		}
	}else{
		standardMode();
	}
}
/* Top Cart */

/* Top Link Wishlist Quantity */
function getWishlistCount(){
	if(jQuery('body').hasClass('ajax-index-options')){
		toopLink = window.parent.document.getElementsByTagName('body')[0];
		toopLink = jQuery(toopLink).find('header#header .top-link-wishlist');
	}else{
		toopLink = jQuery('header#header .top-link-wishlist');
	}
	
	url = toopLink.attr('href').replace("wishlist/","meigeeactions/wishlist/count");
	jQuery.ajax({
		url : url,
		success : function(data) {
			toopLink.find('.wishlist-items').html(data);
		}
	});
}

/* Wishlist Block Slider */
function wishlist_slider(){
  jQuery('#wishlist-slider .es-carousel').iosSlider({
	responsiveSlideWidth: true,
	snapToChildren: true,
	desktopClickDrag: true,
	infiniteSlider: false,
	navNextSelector: '#wishlist-slider .next',
	navPrevSelector: '#wishlist-slider .prev'
  });
}
 
function wishlist_set_height(){
	var wishlist_height = 0;
	jQuery('#wishlist-slider .es-carousel li').each(function(){
	 if(jQuery(this).height() > wishlist_height){
	  wishlist_height = jQuery(this).height();
	 }
	})
	jQuery('#wishlist-slider .es-carousel').css('min-height', wishlist_height+2);
}
if(jQuery('#wishlist-slider').length){
  whs_first_set = true;
  wishlist_slider();
}
/* Wishlist Block Slider */

 /* page title */
function titleDivider(){
	setTimeout(function(){
		jQuery('.widget-title, #footer .footer-block-title, .block-layered-nav .filter-label, .block-layered-nav dl#narrow-by-list2 dt, aside.sidebar .block-title, header.rating-title, .box-reviews .rating-subtitle, .block-related .block-title, .product-options-title, .cart-blocks-title, #login-holder .page-title, .opc-block-title, .quick-view-title').each(function(){
			title_container_width = jQuery(this).width();
			title_width = jQuery(this).find('h1, h2, h3, strong').innerWidth();
			divider_width = ((title_container_width - title_width-2)/2);
			full_divider_width = (title_container_width - title_width-2);
			if ((jQuery(this).hasClass('widget-title')) || (jQuery(this).hasClass('filter-label')) || (jQuery(this).parent().attr('id') == 'narrow-by-list2') || (jQuery(this).hasClass('block-title')) || (jQuery(this).hasClass('rating-title')) || (jQuery(this).hasClass('rating-subtitle')) || (jQuery(this).hasClass('cart-blocks-title')) || (jQuery(this).hasClass('page-title')) || (jQuery(this).hasClass('opc-block-title')) || (jQuery(this).hasClass('quick-view-title'))) {
				if (divider_width > 15) {
					if(!jQuery(this).find('.right-divider').length){
						jQuery(this).append('<div class="right-divider" />');
					}
					jQuery(this).find('.right-divider').css('width', divider_width);
				} else {
					jQuery(this).find('.right-divider').remove();
				}
				if (divider_width > 15) {
					if(!jQuery(this).find('.left-divider').length) {
						jQuery(this).prepend('<div class="left-divider" />');
					}
					jQuery(this).find('.left-divider').css('width', divider_width);
				} else {
					jQuery(this).find('.left-divider').remove();
				}
			} else {
				if(!jQuery(this).find('.right-divider').length) {
					jQuery(this).append('<div class="right-divider" />');
				}
				jQuery(this).find('.right-divider').css('width', full_divider_width);
			}
		});
	}, 250);
}

/* Labels height */
function gridLabels(){
	isTopmenuGrid = false;
	isEventStarted = false;
	if(jQuery('header#header .products-grid').length){
		isTopmenuGrid = true;
	}
	
	function init(){
		jQuery('.label-type-1 .label-new, .label-type-3 .label-new, .label-type-1 .label-sale, .label-type-3 .label-sale').each(function(){
			if(isTopmenuGrid == true && isEventStarted == false){
				if(jQuery(this).parents('header#header').length){
					starter();
				}
			}
			
			labelNewWidth = jQuery(this).outerWidth();
			if(jQuery(this).parents('.label-type-1').length){
				if(jQuery(this).hasClass('percentage')){
					lineHeight = labelNewWidth - labelNewWidth*0.2;
				}else{
					lineHeight = labelNewWidth;
				}
			}else if(jQuery(this).parents('.label-type-3').length){
				if(jQuery(this).hasClass('percentage')){
					lineHeight = labelNewWidth - labelNewWidth*0.2;
				}else{
					lineHeight = labelNewWidth - labelNewWidth*0.1;
				}
			}else{
				lineHeight = labelNewWidth;
			}
			jQuery(this).css({
				'height' : labelNewWidth,
				'line-height' : lineHeight + 'px'
			});
		});
	}
	init();
	
	function starter(){
		isEventStarted = true;
		jQuery('#nav-wide li.level0.parent').on('mouseenter', function(){
			setTimeout(function(){
				init();
			}, 100);
		});
	}
}
/***  ***/

/* Product Hover Images */
function productHoverImages() {
	if(jQuery('span.hover-image').length){
		jQuery('span.hover-image').parent().addClass('hover-exists');
	}
}

/* Wide Menu Top */
function WideMenuTop() {
	if (jQuery(document.body).width() > 767) {
		setTimeout(function(){
			jQuery('.nav-wide li .menu-wrapper').each(function() {
				WideMenuItemHeight = jQuery(this).parent().height();
				WideMenuItemPos = jQuery(this).parent().position().top;
				jQuery(this).css('top', (WideMenuItemHeight + WideMenuItemPos));
			});
		}, 100)
	} else {
		jQuery('.nav-wide li .menu-wrapper').css('top', 'auto');
	}
}

/* Product Fancy */
function productFancy(){
	jQuery(function(){
		jQuery('.more-views a.cloud-zoom-gallery').on('click.productFancy', function(){
			thisHref = jQuery(this).attr('href');
			jQuery('.product-view .product-img-box a.fancybox-product').removeClass('active').each(function(){
				if(jQuery(this).attr('href') == thisHref){
					jQuery(this).addClass('active');
				}
			});
		});
		jQuery('.fancybox-product').fancybox();
	});
}

/* sticky header object */
sticky = {
	show: function(headerHeight){
		if(!jQuery('#header').hasClass('floating')){
			jQuery('body').css('padding-top', headerHeight);
			jQuery('#header').addClass('floating');
			jQuery('#header').slideDown('fast');
			WideMenuTop();
		}
	},
	hide: function(){
		if(jQuery('#header').hasClass('floating')){
			jQuery('body').attr('style', '');
			jQuery('#header').removeClass('floating');
			jQuery('#header').attr('style', '');
			WideMenuTop();
		}
	}
}

/* Retina logo resizer */
function logoResize(){
	if (pixelRatio > 1) {
		jQuery('header#header h2.logo, header#header h2.small_logo, footer#footer .footer-logo').each(function(){
			var thisLogo = jQuery(this);
			setTimeout(function(){
				thisLogo.attr('style', '');
				thisLogo.find('img').attr('style', '');
				if(thisLogo.hasClass('logo')){
					thisLogo.css({
						'position': 'absolute',
						'opacity': '0'
					});
				}
				defaultStart = true;
				if(thisLogo.hasClass('footer-logo')){
					thisLogo.css('position', 'absolute');
					if(thisLogo.parent().width() < thisLogo.width()){
						thisLogo.find('img').css('width', thisLogo.parent().width() - (thisLogo.parent().width()*0.15));
						defaultStart = false;
					}
				}
				if(defaultStart){
					thisLogo.find('img').css('width', (thisLogo.find('img').width()/2));
				}
				if(!thisLogo.hasClass('small_logo')){
					thisLogo.css({
						'position': 'static',
						'opacity': '1'
					});
				}
			}, 100);
		});
	}
}

/* ajax more views */
function ajaxMoreViews(){
	if((!!window.devicePixelRatio ? window.devicePixelRatio : 1) > 1){ //check is retina
		var isRetina = true;
	}else{
		var isRetina = false;
	}
	
	var ajaxProgress = false;
	
	jQuery('.ajax-media').off().on('click', function(event){ //add event handler to links
		event.preventDefault();
		target = jQuery(this);
		parentElement = target.parent().parent('.product-img-box');
		ajaxUrl = target.attr('href');
		if(window.location.protocol == "https:"){
			ajaxUrl = ajaxUrl.replace(/http:/ig, 'https:');
		}
		
		//ajax block
		if(!target.hasClass('ajax-active') && !target.hasClass('ajax-complete') && ajaxProgress == false){
			ajaxProgress = true;
			thisTarget = target;
			thisParentElement = parentElement;
			target.addClass('ajax-active');
			thisParentElement.addClass('loading');
			
			jQuery.ajax({
				url: ajaxUrl,
				cache: false
			}).done(function(html){
				thisParentElement.removeClass('loading').prepend(html);
				setTimeout(function(){
					thisParentElement.find('.ajax-media-holder .more-views').addClass('show');
				}, 100);
				thisTarget.removeClass('ajax-active').addClass('ajax-complete ajax-open');
				galleryChanger(thisParentElement);
				ajaxProgress = false;
			});
		}
		
		/* show or hide block */
		if(target.hasClass('ajax-open')){
			parentElement.find('.ajax-media-holder .more-views').removeClass('show').end().end().end().removeClass('ajax-open');
		}else if(target.hasClass('ajax-complete')){
			parentElement.find('.ajax-media-holder .more-views').addClass('show').end().end().end().addClass('ajax-open');
		}
		
		/* block gallery images changer */
		function galleryChanger(thisParentElement){
			thisParentElement.find('.ajax-media-holder .more-views a').on('click', function(){
				targetToChange = thisParentElement.find('.product-image > img');
				if(isRetina){
					sourceAttr = jQuery(this).attr('data-srcx2');
				}else{
					sourceAttr = jQuery(this).attr('data-src');
				}
				targetToChange.attr('src', sourceAttr);
				thisParentElement.addClass('hover-overlay');
				thisParentElement.off().on('mouseleave', function(){
					jQuery(this).removeClass('hover-overlay');
				});
			});
		}
		
	});
}

/* Header Customer Block */
function headerCustomer(reset){
	if(jQuery('.quick-access.simple-list').length){
		custName = jQuery('#header .customer-name');
		links = custName.parent().next('.links');
		links.hide();
		if(reset){
			custName.off('click.moblinks');
			links.css('display', 'inline-block');
		}else{
			custName.off('click.moblinks').on('click.moblinks', function(){
				links.slideToggle();
			});
		}
	}
}


jQuery(window).load(function() {
	
	/* Fix for IE */
    	if(navigator.userAgent.indexOf('IE')!=-1 && jQuery.support.noCloneEvent){
			jQuery.support.noCloneEvent = true;
		}
	/* End fix for IE */

	/* More Views Slider */
	if(jQuery('#more-views-slider').length){
		jQuery('#more-views-slider').iosSlider({
		   responsiveSlideWidth: true,
		   snapToChildren: true,
		   desktopClickDrag: true,
		   infiniteSlider: false,
		   navSlideSelector: '.sliderNavi .naviItem',
		   navNextSelector: '.more-views .next',
		   navPrevSelector: '.more-views .prev'
		 });
	}
	 function more_view_set_height(){
		if(jQuery('#more-views-slider').length){
			var more_view_height = 0;
			jQuery('#more-views-slider li a').each(function(){
			 if(jQuery(this).height() > more_view_height){
			  more_view_height = jQuery(this).height();
			 }
			})
			jQuery('#more-views-slider').css('min-height', more_view_height+2);
		}
	 }
	 /* More Views Slider */
	 
	 /* More Views Slider 2 */
	if(jQuery('#more-views-slider-2').length){
		jQuery('#more-views-slider-2').iosSlider({
		   responsiveSlideWidth: true,
		   snapToChildren: true,
		   desktopClickDrag: true,
		   infiniteSlider: false,
		   navNextSelector: '#more-views-slider-2 .next',
		   navPrevSelector: '#more-views-slider-2 .prev'
		 });
	}
	function more_view2_set_height(){
		if(jQuery('#more-views-slider-2.slider-on').length){
			more_view_height2 = 0;
			jQuery('#more-views-slider-2 li a').each(function(){
				if(jQuery(this).height() > more_view_height2){
					more_view_height2 = jQuery(this).height();
				}
			})
			jQuery('#more-views-slider-2.slider-on').css('min-height', more_view_height2+2);
		}
	 }
	function indexManager(className){
		startIndex = className.indexOf('-')+1;
		index = className.slice(startIndex);
		index = parseFloat(index);
		jQuery('#more-views-slider-2').iosSlider('goToSlide', index);
	}
	if(jQuery('#more-views-slider-2.slider-on')){
		jQuery('.more-views-container ul li').each(function(index){
			jQuery(this).addClass('item-'+(index+1));
		});
		jQuery('.more-views-container ul li a').on('click', function(){
			indexManager(jQuery(this).parent().attr('class'));
		});
	}
	/* More Views Slider 2 */

	 /* Related Block Slider */
	  if(jQuery('#block-related-slider').length) {
	  jQuery('#block-related-slider').iosSlider({
		   responsiveSlideWidth: true,
		   snapToChildren: true,
		   desktopClickDrag: true,
		   infiniteSlider: false,
		   navSlideSelector: '.sliderNavi .naviItem',
		   navNextSelector: '.block-related .next',
		   navPrevSelector: '.block-related .prev'
		 });
	 } 
	 
	 function related_set_height(){
		var related_height = 0;
		jQuery('#block-related-slider li.item').each(function(){
		 if(jQuery(this).height() > related_height){
		  related_height = jQuery(this).height();
		 }
		})
		jQuery('#block-related-slider').css('min-height', related_height+2);
	}
	 /* Related Block Slider */
	 
   /* Layered Navigation Accorion */
  if (jQuery('#layered_navigation_accordion').length) {
    jQuery('.filter-label').each(function(){
        jQuery(this).toggle(function(){
            jQuery(this).addClass('closed').next().slideToggle(200);
        },function(){
            jQuery(this).removeClass('closed').next().slideToggle(200);
        })
    });
  }
  /* Layered Navigation Accorion */


  /* Product Collateral Accordion */
  if (jQuery('#collateral-accordion').length) {
	  jQuery('#collateral-accordion > div.box-collateral').not(':first').hide();  
	  jQuery('#collateral-accordion > h2').click(function() {
		jQuery(this).parent().find('h2').removeClass('active');
		jQuery(this).addClass('active');
		
	    var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	 
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300, function(){
				if(!nextDiv.is(":visible")){
					jQuery(this).prev().removeClass('active');
				}
		   });
	    }
	  });
  }
  /* Product Collateral Accordion */

  /* My Cart Accordion */
  if (jQuery('#cart-accordion').length) {
	  jQuery('#cart-accordion > div.accordion-content').hide();	  
	  
	  jQuery('#cart-accordion > h3.accordion-title').wrapInner('<span/>').click(function(){
	  
		var accordion_title_check_flag = false;
		if(jQuery(this).hasClass('active')){accordion_title_check_flag = true;}
		jQuery('#cart-accordion > h3.accordion-title').removeClass('active');
		if(accordion_title_check_flag == false){
			jQuery(this).toggleClass('active');
	    }
		
		var nextDiv = jQuery(this).next();
	    var visibleSiblings = nextDiv.siblings('div:visible');
	 
	    if (visibleSiblings.length ) {
	      visibleSiblings.slideUp(300, function() {
	        nextDiv.slideToggle(500);
	      });
	    } else {
	       nextDiv.slideToggle(300);
	    }
		
	  });
	  
	  
  }
  /* My Cart Accordion */
  
  /* Coin Slider */

	/* Fancybox */
	if (jQuery.fn.fancybox) {
		jQuery('.fancybox').fancybox();
	}
	/* Fancybox */
	
	/* Zoom */
	if (jQuery('#zoom').length) {
		jQuery('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
  	}
	/* Zoom */

	/* Responsive */
	var responsiveflag = false;
	var topSelectFlag = false;
	var menu_type = jQuery('#nav').attr('class');
	
	function mobile_menu(mode){
		switch(mode)
		 {
		 case 'animate':
		   if(!jQuery('.nav-container').hasClass('mobile')){
				jQuery(".nav-container").addClass('mobile');
				jQuery('.nav-container > ul').slideUp('fast');
				jQuery('.menu-button').removeClass('active');
				jQuery('.menu-button').on('click', function(){
					jQuery(this).toggleClass('active');
					jQuery('.nav-container > ul').slideToggle('medium');
				});
			   jQuery('.nav-container > ul a').each(function(){
					if(jQuery(this).next('ul').length || jQuery(this).next('div.menu-wrapper').length){
						jQuery(this).before('<span class="menu-item-button"><i class="fa fa-plus"></i><i class="fa fa-minus"></i></span>')
						jQuery(this).next('ul').slideUp('fast');
						jQuery(this).prev('.menu-item-button').on('click', function(){
							jQuery(this).toggleClass('active');
							jQuery(this).nextAll('ul, div.menu-wrapper').slideToggle('medium');
						});
					}
			   });
		   }
		   break;
		 default:
				jQuery(".nav-container").removeClass('mobile');
				jQuery('.menu-button').off();
				jQuery('.nav-container > ul').slideDown('fast');
				jQuery('.nav-container .menu-item-button').each(function(){
					jQuery(this).nextAll('ul').slideDown('fast');
					jQuery(this).remove();
				});
				jQuery('.nav-container .menu-wrapper').slideUp('fast');
		 }
	}
	
	var WishlistLink = jQuery('.top-link-wishlist');
	jQuery('.top-cart').after(WishlistLink.clone());
	jQuery('.wishlist-items').appendTo('header#header .topline .top-link-wishlist');
	
	/* Mobile Top Links */
	function mobileTopLinks() {
		var topLinks = jQuery('header#header .quick-access');
		if(jQuery(document.body).width() < 767) {
			jQuery('.top-cart').before(topLinks);
		} else {
			jQuery(topLinks).prependTo('.header-top-right');
		}
	}
	
	/* Mobile Cart Remove Link */
	function MCRemoveLink() {
		if(jQuery(document.body).width() < 767) {
			jQuery('.cart-table .product-name').each(function(){
				var titleHeight = jQuery(this).position().top;
				var removeLink = jQuery(this).parent().parent().parent().find('.remove .btn-remove2');
				jQuery(removeLink).css('top', titleHeight - 35);
			});
		}
	}
	
	function toDo(){
		if (jQuery(document.body).width() < 767 && responsiveflag == false){
			/* Top Menu Select */
			if(topSelectFlag == false){
				jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				topSelectFlag = true;
			}
			jQuery('.nav-container .sbOptions li a').on('click', function(){
				if(!jQuery('.nav-container .sbSelector span').length){
					jQuery('.nav-container .sbSelector').wrapInner('<span />').prepend('<span />');
				}
			});
			/* //Top Menu Select */
			responsiveflag = true;
		}
		else if (jQuery(document.body).width() > 767){
			responsiveflag = false;
		}
	}
	function replacingClass () {
		if (jQuery(document.body).width() < 480) { //Mobile
			mobile_menu('animate');
			headerCustomer();
		}
		if (jQuery(document.body).width() > 479 && jQuery(document.body).width() < 768) { //iPhone
			mobile_menu('animate');
			headerCustomer();
		}  
		if (jQuery(document.body).width() > 767 && jQuery(document.body).width() < 977){ //Tablet
			mobile_menu('animate');
			headerCustomer(true);
		}
		if (jQuery(document.body).width() > 977 && jQuery(document.body).width() < 1279){ //Tablet
			mobile_menu('reset');
			headerCustomer(true);
		}
		if (jQuery(document.body).width() > 1279){ //Extra Large
			mobile_menu('reset');
			headerCustomer(true);
		}
	}
	replacingClass();
	toDo();
	more_view_set_height();
	more_view2_set_height();
	wishlist_set_height();
	related_set_height();
	titleDivider();
	WideMenuTop();
	mobileTopLinks();
	MCRemoveLink();
	jQuery(window).resize(function(){toDo(); replacingClass(); more_view_set_height(); more_view2_set_height(); wishlist_set_height(); related_set_height(); titleDivider(); WideMenuTop(); mobileTopLinks(); MCRemoveLink();});
	/* Responsive */
	
	/* Top Menu */
	function menuHeight2 () {
		var menu_min_height = 0;
		jQuery('#nav li.tech').css('height', 'auto');
		jQuery('#nav li.tech').each(function(){
			if(jQuery(this).height() > menu_min_height){
				menu_min_height = jQuery(this).height();
			}
		});		
		jQuery('#nav li.tech').each(function(){
			jQuery(this).css('height', menu_min_height + 'px');
		});
	}
	
	/* Top Selects */
	function option_class_add(items, is_selector){
		jQuery(items).each(function(){
			if(is_selector){
				jQuery(this).removeAttr('class'); 
				jQuery(this).addClass('sbSelector');
			}			
			stripped_string = jQuery(this).html().replace(/(<([^>]+)>)/ig,"");
			RegEx=/\s/g;
			stripped_string=stripped_string.replace(RegEx,"");
			jQuery(this).addClass(stripped_string.toLowerCase());
			if(is_selector){
				tags_add();
			}
		});
	}
	option_class_add('.sbOptions li a, .sbSelector', false);
	jQuery('.sbOptions li a, .sbSelector').on('click', function(){
		option_class_add('.sbSelector', true);
	});	
	function tags_add(){
		jQuery('.sbSelector').each(function(){
			if(!jQuery(this).find('span.text').length){
				jQuery(this).wrapInner('<span class="text" />').append('<span />').find('span:last').wrapInner('<span />');
			}
		});
	}
	tags_add();
	/* //Top Selects */
	
	
	/* Mobile Devices */
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))){
		/* Mobile Devices Class */
		jQuery('body').addClass('mobile-device');
		
		/* Menu */
		jQuery(".nav-container:not('.mobile') #nav li").on({
			click: function (){
				if ( !jQuery(this).hasClass('touched') && jQuery(this).children('ul').length ){
					jQuery(this).addClass('touched');
					clearTouch(jQuery(this));
					return false;
				}
			}
		});
		
		/* Clear Touch Function */
		function clearTouch(handlerObject){
			jQuery('body').on('click', function(){
				handlerObject.removeClass('touched closed');
				if(handlerObject.parent().attr('id') == 'categories-accordion'){
					handlerObject.children('ul').slideToggle(200);
				}
				jQuery('body').off();
			});
			handlerObject.click(function(event){
				event.stopPropagation();
			});
			handlerObject.parent().click(function(){
				handlerObject.removeClass('touched');
			});
			handlerObject.siblings().click(function(){
				handlerObject.removeClass('touched');
			});
		}
		
		var mobileDevice = true;
	}else{
		var mobileDevice = false;
	}

	if (jQuery('body').hasClass('retina-ready')) {
		//images with custom attributes
		if (pixelRatio > 1) {
			function brandsWidget(){
				brands = jQuery('ul.brands li a img');
				brands.each(function(){
					jQuery(this).css('width', jQuery(this).width()/2);
				});
			}
			logoResize();
			brandsWidget();
			jQuery(window).resize(function(){
				logoResize();
			});
		
			/* Top menu Bg */
			jQuery('#nav-wide.nav-wide .menu-wrapper').each(function(){
				stretchMode = false;
				if(jQuery(this).attr('style').indexOf('background-size') !=-1){
					stretchMode = true;
				}
				jQuery(this).attr('style', jQuery(this).attr('dataX2'));
				if(stretchMode == false){
					imgUrl = jQuery(this).css('background-image').replace(/url\(|\)|\"/ig, '');
					if(imgUrl.indexOf('none')==-1){
						img = new Image;
						img.src = imgUrl;
						thisElement = jQuery(this);
						img.onload = function(){
							thisElement.css('background-size', img.width/2+'px');
						}
					}
				}
			});
		}
	}
	
	
	/* Categories Accorion */
	if (jQuery('#categories-accordion').length){
		jQuery('#categories-accordion li.parent ul').before('<div class="btn-cat"><i class="fa fa-plus-square-o"></i><i class="fa fa-minus-square-o"></i></div>');
		jQuery('#categories-accordion li.level-top:not(.parent) > a').before('<i class="fa fa-square-o"></i>');
		if(mobileDevice == true){
			jQuery('#categories-accordion li.parent').each(function(){
				jQuery(this).on({
					click: function (){
						if(!jQuery(this).hasClass('touched')){
							jQuery(this).addClass('touched closed').children('ul').slideToggle(200);
							clearTouch(jQuery(this));
							return false;
						}
					}
				});
			});
		}else{
			jQuery('#categories-accordion li.parent .btn-cat').each(function(){
				jQuery(this).toggle(function(){
					jQuery(this).addClass('closed').next().slideToggle(200);
					jQuery(this).prev().addClass('closed');
				},function(){
					jQuery(this).removeClass('closed').next().slideToggle(200);
					jQuery(this).prev().removeClass('closed');
				})
			});
		}
	}
	/* Categories Accorion */
	
	/* Menu Wide */
	if(jQuery('#nav-wide').length){
		jQuery('#nav-wide li.level-top').mouseenter(function(){
			jQuery(this).addClass('over');
		});
		jQuery('#nav-wide li.level-top').mouseleave(function(){
			jQuery(this).removeClass('over');
		});
		jQuery('.nav-wide#nav-wide .menu-wrapper').each(function(){
			jQuery(this).children('div.alpha.omega:first').addClass('first');
		});
		
		columnsWidth = function(columnsCount, currentGroupe){
			if(currentGroupe.size() > 1){
				currentGroupe.each(function(){
					jQuery(this).css('width', (100/currentGroupe.size())+'%');
				});
			}else{
				currentGroupe.css('width', (100/columnsCount)+'%');
			}
		}
		jQuery('.nav-wide#nav-wide .menu-wrapper').each(function(){
			columnsCount = jQuery(this).attr('columns');
			items = jQuery(this).find('ul.level0 > li');
			groupsCount = items.size()/columnsCount;
			ratio = 1;
			for(i=0; i<groupsCount; i++){
				currentGroupe = items.slice((i*columnsCount), (columnsCount*ratio));
				/* set columns width */
				columnsWidth(columnsCount, currentGroupe);
				/* ==== */
				ratio++;
			}
		});
		
		/* Default Sub Menu in Wide Mode */
		elements = jQuery('#nav-wide .menu-wrapper.default-menu ul.level0 li');
		if(elements.length){
			elements.on('mouseenter mouseleave', function(){
				if(!jQuery('.nav-container').hasClass('mobile')){
					jQuery(this).children('ul').toggle();
				}
			});
			jQuery(window).resize(function(){
				if(!jQuery('.nav-container').hasClass('mobile')){
					elements.find('ul').hide();
				}
			});
			elements.each(function(){
				if(jQuery(this).children('ul').length){
					jQuery(this).addClass('parent');
				}
			});
			
			
			/* Default dropdown menu */
			items = [];
			jQuery('#nav-wide li.level0').each(function(){
				if(jQuery(this).children('.default-menu').length){
					items.push(jQuery(this));
				}
			});
			jQuery(items).each(function(){
				jQuery(this).on('mouseenter mouseleave', function(){
					if(jQuery(this).hasClass('over')){
						jQuery(this).children('.default-menu').css({
							'top': jQuery(this).position().top + jQuery(this).height(),
							'left': jQuery(this).position().left
						});
						
					}else{
						jQuery(this).children('.default-menu').css('left', '-10000px');
					}
				});
			});
		}
	}
	
});
var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
jQuery(document).ready(function(){
	
	var isApple = false;
	/* apple position fixed fix */
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))){
		isApple = true;
		
		function stickyPosition(clear){
			items = jQuery('header#header, .backstretch');
			if(clear == false){
				topIndent = jQuery(window).scrollTop();
				items.css({
					'position': 'absolute',
					'top': topIndent
				});
			}else{
				items.css({
					'position': 'fixed',
					'top': '0'
				});
			}
		}
		
		jQuery('.sticky-search header#header .form-search input').on('focusin focusout', function(){
			jQuery(this).toggleClass('focus');
			if(jQuery('header#header').hasClass('floating')){
				if(jQuery(this).hasClass('focus')){
					setTimeout(function(){
						stickyPosition(false);
					}, 500);
				}else{
					stickyPosition(true);
				}
			}
		});
	}
	
	if (jQuery('body').hasClass('retina-ready')) {
		if (pixelRatio > 1) {
			jQuery('img[data-srcX2]').each(function(){
				jQuery(this).attr('src',jQuery(this).attr('data-srcX2'));
			});
		}
	}
	
	/* Selects */
	jQuery(".form-currency select, .form-language select, .store-switcher select").selectbox();
	
	
/* Messages button */
	if(jQuery('ul.messages').length){
		jQuery('ul.messages > li').each(function(){
			switch (jQuery(this).attr('class')){
				case 'success-msg':
				messageIcon = '<i class="fa fa-check" />';
				break;
				case 'error-msg':
				messageIcon = '<i class="fa fa-times" />';
				break;
				case 'note-msg':
				messageIcon = '<i class="fa fa-exclamation" />';
				break;
				case 'notice-msg':
				messageIcon = '<i class="fa fa-exclamation" />';
				break;
				default:
				messageIcon = '';
			}
			jQuery(this).prepend('<div class="messages-close-btn" />', messageIcon);
			jQuery('ul.messages .messages-close-btn').on('click', function(){
				jQuery('ul.messages').remove();
			});
		});
	}
	if(jQuery('.content_bottom').length){
		jQuery('.content_bottom button#find-us').click(function() {
			jQuery('.content_bottom').toggleClass('active');
			if(jQuery('.content_bottom').hasClass('hide')){
				jQuery('.content_bottom').removeClass('hide');
			}else{
				setTimeout(function(){
					jQuery('.content_bottom').addClass('hide');
				}, 500);
			}
		});
	}
	
	
	/* sticky header */
	if(jQuery('body').hasClass('floating-header')){
		var headerHeight = jQuery('#header').height();
		jQuery(window).on('scroll.sticky', function(){
			if(!isApple){
				heightParam = headerHeight;
			}else{
				heightParam = headerHeight*2;
			}
			if(jQuery(this).scrollTop() >= heightParam){
				if(!((!jQuery('body').hasClass('sticky-mobile') && jQuery(document.body).width() < 481) || (!jQuery('body').hasClass('sticky-tablet') && (jQuery(document.body).width() > 767 && jQuery(document.body).width() < 1279)))){
					sticky.show(headerHeight);
				}
				logoResize();
			}
			if(jQuery(this).scrollTop() < headerHeight ){
				sticky.hide();
				logoResize();
			}
		});
	}
	
	productHoverImages();
	
	if(jQuery('header#header .form-language .sbHolder').length) {
		jQuery('header#header .form-language').addClass('select');
	}
	
	gridLabels();
	
	jQuery('.contacts-footer-content input, .contacts-footer-content textarea, #header .form-search input').each(function(){
		jQuery(this).focusin(function(){
			jQuery(this).parent().addClass('focus');
		});
	});
	jQuery('.contacts-footer-content input, .contacts-footer-content textarea, #header .form-search input').each(function(){
		jQuery(this).focusout(function(){
			jQuery(this).parent().removeClass('focus');
		});
	});
	
	/* Header Customer Block */
	if(jQuery('#header .customer-name').length && !jQuery('#header .quick-access.simple-list').length){
		var CustName = jQuery('#header .customer-name');
		CustName.next().hide();
		CustName.click(function(){
			CustName.next().slideToggle();
		});
	}
	
});