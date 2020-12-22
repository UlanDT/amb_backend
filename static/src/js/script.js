$(document).ready(function () {
  const PageMain = $(".js-page-main");
  const PageFooter = $(".js-page-footer");
  const BurgerMenuBtn = $(".js-burger-icon");
  const NavHeaderMenu = $(".js-nav-menu");
  const HideMobmenuBtn = $(".js-hide-mobmenu");
  const HeaderMenu = $(".js-header-menu");
  const HeaderSocialList = $(".js-social-list");
  const HeaderShopingCart = $(".js-shoping-cart");
  const ShopFilters = $(".js-shop-filter");
  const ShopProducts = $(".js-shop-product");
  const GalleryList = $(".js-gallery-list");
  const GalleryPageSlider = $(".js-gallery-page-swiper");
  const SelectboxLangList = $(".js-select-langlist");
  const SelectboxDropLangList = $(".js-drop-langlist");
  const SelectboxValueLangList = $(".js-value-langlist");
  const SlickZoomCard = $(".js-zoom-card-slick");
  const SlickZoomCardThumbs = $(".js-zoom-card-thumbs-slick");
  const SlickShopQviewCard = $('.js-shop-qview-card-slick');
  const PopupQviewBtn = $(".js-popup-qview-btn");
  const PopupQviewCard = $(".js-popup-zoom-qview-card");
  const NiceSelectSelectBox = $(".js-size-nice-select");

  let swiperActiveIndexGalleryPage = 0;

  function checkDOMForSwiper(elm, obj) {
    if (!$(elm).length) {
      return null;
    }

    return new Swiper(elm, obj);
  }

  const SwiperForSales = checkDOMForSwiper('.js-swiper', {
    slidesPerView: "auto",
    centerInsufficientSlides: true,
    spaceBetween: 32,
    slidesOffsetAfter: 16,
    slidesOffsetBefore: 16,
    breakpoints: {
      992: {
        slidesOffsetBefore: 130
      }
    }
  });

  const SwiperForInspiration = checkDOMForSwiper('.js-inspiration-swiper', {
    slidesPerView: "auto",
    observer: true,
    observeParents: true,
    spaceBetween: 14,
    slidesOffsetAfter: 14,
    breakpoints: {
      992: {
        direction: "vertical"
      }
    }
  });

  const SwiperForShopFilters = checkDOMForSwiper('.js-shop-filters-swiper', {
    slidesPerView: "auto",
    spaceBetween: 16,
  });

  const SwiperSaleList = checkDOMForSwiper('.js-salelist-swiper', {
    slidesPerView: "auto",
    spaceBetween: 25,
    autoHeight: true,
    centerInsufficientSlides: true,
    breakpoints: {
      992: {
        spaceBetween: 30,
      }
    }
  });

  const SwiperGalleryThumbs = checkDOMForSwiper('.js-gallery-thumbs-swiper', {
    spaceBetween: 16,
    slidesPerView: 6,
    freeMode: true,
    centerInsufficientSlides: true,
    initialSlide: swiperActiveIndexGalleryPage,
  });

  const SwiperGalleryTop = checkDOMForSwiper('.js-gallery-top-swiper', {
    spaceBetween: 16,
    centerInsufficientSlides: true,
    initialSlide: swiperActiveIndexGalleryPage,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: SwiperGalleryThumbs
    }
  });

  // const ShopQviewCardSwiper = checkDOMForSwiper(".js-shop-qview-card-swiper", {
  //   slidesPerView: 1,
  //   spaceBetween: 50,
  //   watchOverflow: true,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });

  const SwiperZoomCardThumbs = checkDOMForSwiper(".js-zoom-card-thumbs-swiper", {
    // nested: true,
    spaceBetween: 16,
    slidesPerView: 4,
    // watchSlidesVisibility: true,
    // watchSlidesProgress: true,
    // observer: true,
    // observeParents: true,
  });

  // const SwiperZoomCard = checkDOMForSwiper(".js-zoom-card-swiper", {
  //   // nested: true,
  //   spaceBetween: 16,
  //   zoom: true,
  //   observer: true,
  //   observeParents: true,
  //   thumbs: {
  //     swiper: SwiperZoomCardThumbs,
  //   },
  // });

  /*
   $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
  * */

  const SwiperZoomCard = new Swiper('.js-zoom-card-swiper', {
    thumbs: {
      swiper: SwiperZoomCardThumbs
    }
  });

  if ($(window).scrollTop() >= HeaderMenu.height()) {
    HeaderMenu.addClass("page-header--bg-white");

    HeaderSocialList.removeClass("page-header__social-list--dark");
    HeaderShopingCart.removeClass("shoping-cart--dark");
  } else {
    HeaderMenu.removeClass("page-header--bg-white");

    HeaderSocialList.addClass("page-header__social-list--dark");
    HeaderShopingCart.addClass("shoping-cart--dark");
  }

  $(window).scroll(function (evt) {
    if ($(window).scrollTop() >= HeaderMenu.height()) {
      HeaderMenu.addClass("page-header--bg-white");

      HeaderSocialList.removeClass("page-header__social-list--dark");
      HeaderShopingCart.removeClass("shoping-cart--dark");
    } else {
      HeaderMenu.removeClass("page-header--bg-white");

      HeaderSocialList.addClass("page-header__social-list--dark");
      HeaderShopingCart.addClass("shoping-cart--dark");
    }
  });

  [BurgerMenuBtn, HideMobmenuBtn].forEach(function (item) {
    item.on("click", function (evt) {
      let cEvt = evt.currentTarget;
      // let tEvt = evt.target;

      NavHeaderMenu.toggleClass("page-header__nav--show");

      if (cEvt.tagName === "DIV") {
        setTimeout(function () {
          PageMain.toggle();
          PageFooter.toggle();
        }, 300);
      } else if (cEvt.tagName === "LI") {
        PageMain.toggle();
        PageFooter.toggle();
      }
    });
  });

  function removeClassShopFilters(obj) {
    obj.each(function (_, elm) {
      if ($(elm).hasClass("page-shop__filter-text--active")) {
        $(elm).removeClass("page-shop__filter-text--active");
      }
    });
  };

  ShopProducts.each(function (_, card) {
    $(card).hover(function (evt) {
      $(card).find(".page-shop__card").addClass("page-shop__card--hover");
    }, function (evt) {
      $(card).find(".page-shop__card").removeClass("page-shop__card--hover");
    });
  });

  ShopFilters.on("click", function (evt) {
    let elm = $(evt.currentTarget);
    let filterKey = elm.data("filterkey");

    removeClassShopFilters(ShopFilters);
    elm.addClass("page-shop__filter-text--active");

    ShopProducts.each(function (_, prod) {
      let filterId = $(prod).data("filterid");

      if (filterKey === filterId) {
        $(prod).show();
      } else {
        $(prod).hide();
      }

      if (filterKey === 0) {
        $(prod).show();
      }
    });
  });

  if (GalleryList.length) {
    GalleryList.magnificPopup({
      delegate: "figure",
      type: "inline",
      callbacks: {
        open: function () {
          GalleryPageSlider.show();

          if (SwiperGalleryTop && SwiperGalleryThumbs) {
            SwiperGalleryTop.update();
            SwiperGalleryThumbs.update();
          }
        },
        close: function () {
          GalleryPageSlider.hide();
        },
        elementParse: function (item) {
          if (SwiperGalleryTop && SwiperGalleryThumbs) {
            swiperActiveIndexGalleryPage = item.index;

            SwiperGalleryTop.activeIndex = item.index;
            SwiperGalleryThumbs.activeIndex = item.index;

            SwiperGalleryTop.update();
            SwiperGalleryThumbs.update();
          }
        },
      }
    });
  }

  if (PopupQviewBtn.length) {
    PopupQviewBtn.magnificPopup({
      type: 'inline',
      preloader: false,
      callbacks: {
        open: function (e) {
          PopupQviewCard.show();

          SlickShopQviewCard.slick({
            dots: false,
            infinite: false,
            prevArrow: "<div class=\"swiper-button-prev page-shop__qview-arrow-prev\"></div>",
            nextArrow: "<div class=\"swiper-button-next page-shop__qview-arrow-next\"></div>",
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false
          });

          SlickZoomCard.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: false,
            centerMode: true,
            centerPadding: "50px",
            infinite: false,
            asNavFor: '.js-zoom-card-thumbs-slick'
          });

          SlickZoomCardThumbs.slick({
            slidesToShow: 4,
            infinite: false,
            slidesToScroll: 1,
            asNavFor: '.js-zoom-card-slick',
            arrows: false,
            dots: false,
            focusOnSelect: true
          });

          $('.js-card-zoom-img')
              .wrap('<span style="display:inline-block"></span>')
              .css('display', 'block')
              .parent()
              .zoom();
        },
        close: function (e) {
          PopupQviewCard.hide();
          SlickShopQviewCard.slick("unslick");
          SlickZoomCard.slick("unslick");
          SlickZoomCardThumbs.slick("unslick");

          $('.js-card-zoom-img').trigger('zoom.destroy');
        }
      }
    });
  } else if (SlickZoomCard || SlickZoomCardThumbs) {
    SlickZoomCard.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: false,
      centerMode: true,
      centerPadding: "0",
      infinite: false,
      asNavFor: '.js-zoom-card-thumbs-slick',
      draggable: false,
    });

    SlickZoomCardThumbs.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      asNavFor: '.js-zoom-card-slick',
      arrows: false,
      dots: false,
      focusOnSelect: true,
    });

    $('.js-card-zoom-img')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom();
  }

  /* Nice Select plugin */
  NiceSelectSelectBox.niceSelect();

  SelectboxLangList.on("click", function (e) {
    if (e.target.tagName === "A") {
      SelectboxValueLangList.text(e.target.textContent);
    }

    setTimeout(function () {
      SelectboxDropLangList.hide();
      $(".lang-selectbox").removeClass("lang-selectbox--up");
    }, 1500);

    $(".lang-selectbox").toggleClass("lang-selectbox--up");

    SelectboxDropLangList.toggle();
  });


});