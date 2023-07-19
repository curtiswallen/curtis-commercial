$('nav ul li a').hover(
  function() {
    var image = $(this).find('img').attr('src');
    $('#bg img').attr('src', image);
  }
)

$('#name').on( 'click', function() {
  if ($('header nav').css('display') == 'block') {
    $('header nav').css('display', 'none');
  } else {
    $('header nav').css('display', 'block');
  }
});

$('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});

var swiper = new Swiper(".mySwiper", {
  effect: "fade",
  loop: true,
  speed: 0,
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  hashNavigation: {
    watchState: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

var lightbox = new SimpleLightbox('.gallery ul li a', { 
  overlayOpacity: 1,
  animationSpeed: 0,
  animationSlide: false,
  fadeSpeed: 0,
  closeText: "X",
  navText: ['←','→']
});

lightbox.on('close.simplelightbox', function() {
  var slidenum = $('.sl-counter .sl-current').text();
  window.location.hash = slidenum - 1;
});

$('.swiper-grid').click(function() {
  if ($('#thumb-grid').css('display') == 'none') {
      $('.mySwiper').hide();
      $('#swiper-nav-wrapper').hide();
      $('#thumb-grid').show();
      $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true
      });
  } else {
      $('.mySwiper').show();
      $('#swiper-nav-wrapper').show();
      $('#thumb-grid').hide();
  }
});

$('.grid-item').click(function() {
  if ($('#thumb-grid').hasClass('hidden')) {
  } else {
      $('.mySwiper').show();
      $('#swiper-nav-wrapper').show();
      $('#thumb-grid').hide();
      window.scrollTo(0, 0);
  }
});

var $grid = $('.grid').imagesLoaded( function() {

  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    transitionDuration: 0
  });

});