(function($){
    "use strict";
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/
    function navbar_fixed(){
        if ( $('.navbar').length ){ 
            var dtHeader = $('.navbar');
            function topsCrOll(hClasS){
                var scroll = $(window).scrollTop();   
                if (scroll){
                    $(dtHeader).addClass("navbar_fixed");
                } else {
                    $(dtHeader).removeClass("navbar_fixed");
                }
            }
            topsCrOll(dtHeader);

            $(window).on('scroll', function(){
                topsCrOll(dtHeader);
            });
        };
    };
    navbar_fixed();
    
        //js for scroll to section content
    $('#saasLandCollapes ul a[href^="#"], .banner_area .banner_content .banner_btn a').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 30
            }, 1000);
        }
    });
    
    
    var imgLoad = $(".faq_masonry");
    imgLoad.imagesLoaded( function() {
        imgLoad.isotope({
            layoutMode: 'masonry',
        });
    });
    
    $(document).ready(function(){
        function wowInit(){
            new WOW().init();
        }
        wowInit();
    });
    
       
	//js for slider_content
    function slider_content(){
        if(('.awesome_element_slider').length){
            
            $('.awesome_element_slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1000,
    //            cssEase: 'linear',
                speed: 4000,
                arrows: false,
                dots: false,
                delay: 0,
                responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                    }
                }
                ]
            });
        }
    }
    slider_content();    
       
	//js for header_style_img_slider
    function header_style_img_slider(){
        $('.header_style_img_slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 500,

            speed: 1000,
            arrows: false,
            dots: false,
            pauseOnHover: false,
            vertical: true,
            verticalSwiping: true,
            infinity: true,
//                centerMode: true,
//                centerPadding: 0,
            responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                }
            }
            ]
        });
    }
    header_style_img_slider();
    
    
    /*============ typed js ==========*/
    document.addEventListener('DOMContentLoaded', function(){
        Typed.new("#typed", {
            stringsElement: document.getElementById('typed-strings'),
            typeSpeed: 80,
            startDelay: 1000,
            backDelay: 1000,
            loop: true,
            contentType: 'html', // or text
        });
    });

    /*=============================================== 
	       Parallax Init
	  ================================================*/
      if ($('.banner_area').length > 0) {
        $('.banner_area').parallax({
            scalarX: 10.0,
            scalarY: 0.0,
        });
    }
    
    
})(jQuery)