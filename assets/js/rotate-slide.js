var rotate = {};
var prog = {};

// custom plugin
(function (global, $) {
  $.fn.slizz = function (options) {
    // Default options
    var settings = $.extend(
      {
        width: "300",
        speed: "4000",
        height: "400",
        space: "20",
        max: "850",
        bullets: false,
        products: []
      },
      options
    );

    var $length = settings.products.length;
    var $elem = $(this); // cache the elem
    var $id = $elem.attr("id");
    global.rotate[$id] = false; // for the animation
    global.prog[$id] = 0; // unique variable to track the progression

    // function to add each product
    var addProducts = function (wrap) {
      for (i = 0; i < $length; i++) {
        var that = settings.products[i];
        var res = prodTemplate(that, i); // call the template for product
        $(wrap).append(res);
      }
    };

    var addBullets = function ($div) {
      for (i = 0; i < $length; i++) {
        $div.append(
          "<div class='bullets' onclick='goToSlides(" + i + ", this)'></div>"
        );
      }
    };

    // template for each products
    var prodTemplate = function (product, i) {
      var cta = "SHOP NOW";
      if (settings.lang == "fr") {
        cta = "MAGASINEZ";
      }
      var image =
        "https://lechateau.scene7.com/is/image/LeChateau/" +
        product.sku +
        "_" +
        product.color +
        "_1_469x587.jpg?fit=constrain,1&wid=" +
        settings.width +
        "&hei=" +
        settings.height +
        "&fmt=jpg";

      //   var image = "https://via.placeholder.com/310x400/"+product.color+"/FFFFFF.png?text="+ product.seo;

      var txt = "";
      txt += "\n<li data-order='" + i + "'>";
      txt += "\n  <div class='item'>";
      txt +=
        "\n    <a href='" + product.link + "' title='" + product.seo + "'>";
      txt +=
        "\n      <img class='prodImg' src='" +
        image +
        "' alt='" +
        product.seo +
        "'>";
      txt += "\n      <div class='prodHover'>" + cta + "</div>";
      txt += "\n    </a>";
      if (settings.title == true) {
        txt += "\n    <span class='prodName'>Title</span>";
      }
      txt += "\n  </div>";
      txt += "\n</li>\n";
      return txt;
    };

    // modify the css for this carousel
    var cssThis = function () {
      $elem.css({ "max-width": settings.max + "px" });
      var h = settings.height + "px";

      if (settings.title == true) {
        var y = Number(settings.height) + 25 + "px"; // add the title span at the bottom
      } else {
        var y = Number(settings.height) + "px"; // set the height
      }

      var z = Number(settings.width) + Number(settings.space) + "px";
      var w = settings.width + "px";
      $elem.find(".products-wrap ul li").css({ width: z, height: y });
      $elem.find(".products-wrap ul li .item").css({ width: w });
      $elem
        .find(".products-list li .item .prodHover")
        .css({ "line-height": h }); // line-height for the hover div
    };

    // build the entire html
    var buildTemplate = function () {
      $elem.append(
        "<div class='products-wrap'><ul class='products-list'></ul></div>"
      );
      // settings
      if (settings.bullets == true) {
        $elem.append("<div class='prod-breadcrump'></div>");
        var $div = $elem.find(".prod-breadcrump");
        addBullets($div);
        $elem.find(".prod-breadcrump .bullets").eq(prog[$id]).addClass("actif");
      }
      var $wrap = $elem.find(".products-list");
      addProducts($wrap);
    };

    var init = function () {
      if ($length > 0) {
        buildTemplate(); // build the html elements
        carousel($elem, $id, settings); // start the carousel with the selected id
        cssThis();
      }
    };

    init(); // initialize the function
  }; // @ end
})(window, jQuery);

// animate the carousel
function carousel(wrap, $id, settings) {
  var $productscarousel = wrap.find(".products-list");
  var products = $productscarousel.children().length;
  var nb = products - 1;
  var productswidth =
    products * (Number(settings.width) + Number(settings.space)); // calculate the width of the carousel
  $productscarousel.css("width", productswidth);
  rotate[$id] = true;
  var productspeed = 1;
  var seeproduct = setInterval(rotateprods, productspeed);

  var m = "-" + (Number(settings.width) + Number(settings.space)) + "px"; // margin-left in pixels (width + space between items)

  // animation to rotate the products
  function rotateprods() {
    if (rotate[$id] != false) {
      var $first = wrap.find(".products-list li:first");
      var speed = Number(settings.speed);
      $first.animate({ "margin-left": m }, speed, "linear", function () {
        // margin-left must be the same as width
        $first.remove().css({ "margin-left": "0px" });
        wrap.find(".products-list li:last").after($first);

        // move the bullets
        if (settings.bullets == true) {
          wrap.find(".prod-breadcrump .bullets").removeClass("actif");
          if (prog[$id] == nb) {
            prog[$id] = 0;
          } else {
            prog[$id] += 1;
          }
          wrap
            .find(".prod-breadcrump .bullets")
            .eq(prog[$id])
            .addClass("actif");
        }
      });
    }
  }

  // stop the carousel on mouse over
  wrap.find(".products-wrap").on({
    mouseenter: function () {
      rotate[$id] = false; // turn off rotation when hovering
      wrap.find(".products-list li").clearQueue().stop().dequeue();
    },

    mouseleave: function () {
      var $first = wrap.find(".products-list li:first");
      var ml = $first.css("margin-left");
      ml = parseInt(ml, 10); // convert to number
      var speed = Number(settings.speed);
      var max = Number(settings.width) + Number(settings.space);
      var whatleft = 1 - (ml * -1) / max;
      var time = whatleft * speed;
      $first.animate({ "margin-left": m }, time, "linear", function () {
        // Animation complete
        $first.remove().css({ "margin-left": "0px" });
        wrap.find(".products-list li:last").after($first);

        // move the bullets
        if (settings.bullets == true) {
          wrap.find(".prod-breadcrump .bullets").removeClass("actif");
          if (prog[$id] == nb) {
            prog[$id] = 0;
          } else {
            prog[$id] += 1;
          }
          wrap
            .find(".prod-breadcrump .bullets")
            .eq(prog[$id])
            .addClass("actif");
        }

        rotate[$id] = true; // restart the carousel
      });
    }
  });
} // @end

function goToSlides(i, elem) {
  var wrap = $(elem).parents(".carousel-products"); // find the parent div
  var $productscarousel = wrap.find(".products-list");
  var products = $productscarousel.children().length; // number of products
  var $id = wrap.attr("id");
  var current = prog[$id]; // get the current

  // if you click elsewhere than the current progression
  if (i != current) {
    // stop the carousel
    rotate[$id] = false; // turn off rotation when hovering
    wrap
      .find(".products-list li")
      .clearQueue()
      .stop()
      .css({ "margin-left": "0px" });
    var $first = wrap.find(".products-list li:first");
    $first.remove().css({ "margin-left": "0px" });
    wrap.find(".products-list li:last").after($first);
    wrap.find(".prod-breadcrump .bullets").removeClass("actif"); // remove the actif bullets

    var interval = function (func, wait, times) {
      var interv = (function (w, t) {
        return function () {
          if (typeof t === "undefined" || t-- > 0) {
            setTimeout(interv, w);
            try {
              func.call(null);
            } catch (e) {
              t = 0;
              throw e.toString();
            }
          }
        };
      })(wait, times);

      setTimeout(interv, wait);
    };

    // check how many slides we have to scroll until the target
    if (i > current) {
      var avance = i - current - 1; // since we already move the first slide
    } else {
      var avance = products - current + i;
    }

    interval(
      function () {
        // Code block goes here
        moveSlides(wrap);
      },
      50,
      avance
    );

    prog[$id] = i; // set the actif bullet
    wrap.find(".prod-breadcrump .bullets").eq(prog[$id]).addClass("actif"); // set up the right bullet

    // restart the carousel
    rotate[$id] = true; // restart the carousel
  }
}

// function to moove a number of slides
function moveSlides(wrap) {
  wrap
    .find(".products-list li")
    .clearQueue()
    .stop()
    .css({ "margin-left": "0px" });
  var $first = wrap.find(".products-list li:first");
  $first.remove().css({ "margin-left": "0px" });
  wrap.find(".products-list li:last").after($first);
}
