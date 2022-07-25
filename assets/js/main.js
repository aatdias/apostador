(function ($) {
  "user strict";
  // Preloader Js
  $(window).on('load', function () {
    $('.preloader').fadeOut(1000);
    var img = $('.bg_img');
    img.css('background-image', function () {
      var bg = ('url(' + $(this).data('background') + ')');
      return bg;
    });
    galleryMasonary();
  });
  // Gallery Masonary
    function galleryMasonary() {
    // filter functions
    var $grid = $(".gallery-wrapper");
    var filterFns = {};
    $grid.isotope({
      itemSelector: '.gallery-item-2',
      masonry: {
        columnWidth: 0,
      }
    });
    // bind filter button click
    $('ul.filter').on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[filterValue] || filterValue;
      $grid.isotope({
        filter: filterValue
      });
    });
    // change is-checked class on buttons
    $('ul.filter').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'li', function () {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  }
  $(document).ready(function () {
    //Menu Dropdown Icon Adding
    $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
    // drop down menu width overflow problem fix
    $('ul').parent('li').hover(function () {
      var menu = $(this).find("ul");
      var menupos = $(menu).offset();
      if (menupos.left + menu.width() > $(window).width()) {
        var newpos = -$(menu).width();
        menu.css({
          left: newpos
        });
      }
    });
    $('.menu li a').on('click', function (e) {
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp(300, "swing");
      } else {
        element.addClass('open');
        element.children('ul').slideDown(300, "swing");
        element.siblings('li').children('ul').slideUp(300, "swing");
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp(300, "swing");
      }
    })
    new WOW().init();
    // Scroll To Top 
    var scrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        scrollTop.removeClass("active");
      } else {
        scrollTop.addClass("active");
      }
    });
    //header
    var header = $("header");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 1) {
        header.removeClass("active");
        $('.header-bottom').removeClass('active');
      } else {
        header.addClass("active");
        $('.header-bottom').addClass('active');
      }
    });
    //Click event to scroll to top
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    //Header Bar
    $('.header-bar').on('click', function () {
      var menu_bar = $('.header-bar');
      $(this).toggleClass('active');
      $('.menu').toggleClass('active');
      $('.header-troops').removeClass('active');
      if(menu_bar.hasClass('active')) {
        $('.overlay').addClass('active');
      }else{
        $('.overlay').removeClass('active');
      }
    })
    $('.overlay').on('click', function () {
      $('.header-bar').removeClass('active');
      $('.overlay').removeClass('active');
      $('.menu').removeClass('active');
      $('.header-troops').removeClass('active');
    });
    $('.ellipsis-bar').on('click', function () {
      $('.header-troops').addClass('active');
      $('.overlay').addClass('active');
      $('.menu').removeClass('active');
      $('.header-bar').removeClass('active');
    });
    $('.close-btn').on('click', function () {
      $('.header-troops').removeClass('active');
      $('.overlay').removeClass('active');
    });
    // PoPuP 
    $('.popup').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      disableOn: 300
    });
    $("body").each(function () {
      $(this).find(".img-pop").magnificPopup({
        type: "image",
        gallery: {
          enabled: true
        }
      });
    });
    //Tab Section
    $('.tab ul.tab-menu').addClass('active').find('> li:eq(0)').addClass('active');
    $('.tab ul.tab-menu li').on('click', function (g) {
      var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
      tab.find('li').siblings('li').removeClass('active');
      $(this).closest('li').addClass('active');
      tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').hide();
      tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').show();
      g.preventDefault();
    });
    $('.faq-wrapper .faq-title').on('click', function (e) {
      var element = $(this).parent('.faq-item');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('.faq-content').removeClass('open');
        element.find('.faq-content').slideUp(200, "swing");
      } else {
        element.addClass('open');
        element.children('.faq-content').slideDown(200, "swing");
        element.siblings('.faq-item').children('.faq-content').slideUp(200, "swing");
        element.siblings('.faq-item').removeClass('open');
        element.siblings('.faq-item').find('.faq-title').removeClass('open');
        element.siblings('.faq-item').find('.faq-content').slideUp(200, "swing");
      }
    });
    $('.partner-slider').owlCarousel({
      loop: true,
      margin: 30,
      responsiveClass: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 1,
        },
        500: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4
        }
      }
    })
    $('.tweet-slider').owlCarousel({
      loop: true,
      margin: 30,
      responsiveClass: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      items: 1,
      responsive: {
        768: {
          items: 2,
        },
        992: {
          items: 3
        }
      }
    })
    $('.gallery-slider').owlCarousel({
      loop: false,
      margin: 30,
      responsiveClass: true,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      items: 1,
      responsive: {
        500: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4
        }
      }
    })
    $('.client-slider').owlCarousel({
        loop: false,
        margin: 30,
        responsiveClass: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        items: 1,
    })
    $(".counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    $(".banner-counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    //Thumbnail SLider
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var thumbnailItemClass = '.owl-item';
    var slides = sync1.owlCarousel({
      startPosition: 12,
      items: 1,
      loop: true,
      margin: 30,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      scrollPerPage: true,
      autoplayHoverPause: false,
      nav: false,
      dots: false,
    }).on('changed.owl.carousel', syncPosition);

    function syncPosition(el) {
      $owl_slider = $(this).data('owl.carousel');
      var loop = $owl_slider.options.loop;

      if (loop) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        if (current < 0) {
          current = count;
        }
        if (current > count) {
          current = 0;
        }
      } else {
        var current = el.item.index;
      }

      var owl_thumbnail = sync2.data('owl.carousel');
      var itemClass = "." + owl_thumbnail.options.itemClass;

      var thumbnailCurrentItem = sync2
        .find(itemClass)
        .removeClass("synced")
        .eq(current);
      thumbnailCurrentItem.addClass('synced');

      if (!thumbnailCurrentItem.hasClass('active')) {
        var duration = 500;
        sync2.trigger('to.owl.carousel', [current, duration, true]);
      }
    }
    var thumbs = sync2.owlCarousel({
        startPosition: 12,
        items: 3,
        loop: false,
        margin: 10,
        nav: false,
        dots: false,
        onInitialized: function(e) {
          var thumbnailCurrentItem = $(e.target).find(thumbnailItemClass).eq(this._current);
          thumbnailCurrentItem.addClass('synced');
        },
      })
      .on('click', thumbnailItemClass, function(e) {
        e.preventDefault();
        var duration = 500;
        var itemIndex = $(e.target).parents(thumbnailItemClass).index();
        sync1.trigger('to.owl.carousel', [itemIndex, duration, true]);
      }).on("changed.owl.carousel", function(el) {
        var number = el.item.index;
        $owl_slider = sync1.data('owl.carousel');
        $owl_slider.to(number, 500, true);
    });
    sync1.owlCarousel();
    // Go to the next item
    $('.det-next').on('click', function() {
      sync1.trigger('next.owl.carousel');
      sync2.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.det-prev').on('click', function() {
      sync1.trigger('prev.owl.carousel', [300]);
      sync2.trigger('prev.owl.carousel', [300]);
    })
    $('.progress1.circle').circleProgress({
      value: .75
    }).on('circle-animation-progress', function(event, progress) {
      $(this).find('strong').html(Math.round(75 * progress) + '<i>%</i>');
    });
    $('.progress2.circle').circleProgress({
      value: .90
    }).on('circle-animation-progress', function(event, progress) {
      $(this).find('strong').html(Math.round(90 * progress) + '<i>%</i>');
    });
    $('.progress3.circle').circleProgress({
      value: .85
    }).on('circle-animation-progress', function(event, progress) {
      $(this).find('strong').html(Math.round(85 * progress) + '<i>%</i>');
    });
    $('.progress4.circle').circleProgress({
      value: .60
    }).on('circle-animation-progress', function(event, progress) {
      $(this).find('strong').html(Math.round(60 * progress) + '<i>%</i>');
    });
  });
  
})(jQuery);

