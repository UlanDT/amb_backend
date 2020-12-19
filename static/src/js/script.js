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
  const PopupQviewBtn = $(".js-popup-qview-btn");
  const PopupQviewCard = $(".js-popup-qview-card");

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

  const ShopQviewCardSwiper = checkDOMForSwiper(".js-shop-qview-card-swiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const SwiperZoomCard = checkDOMForSwiper(".js-zoom-card-swiper", {
    nested: true,
    zoom: {
      maxRatio: 3
    },
    observer: true,
    observeParents: true,
    spaceBetween: 16,
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
          ShopQviewCardSwiper.update();
        },
        close: function (e) {
          PopupQviewCard.hide();
        }
      }
    });
  }


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