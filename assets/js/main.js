$(document).ready(function() {

  if(window.matchMedia("(max-width: 767px)").matches){
      // The viewport is less than 768 pixels wide
      var $grid = $('.grid').imagesLoaded( function() {

        $grid.masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          transitionDuration: 0,
          gutter: '.gutter-sizer'
        });

        $grid.addClass('masonry');

      });
  } else {
      // The viewport is at least 768 pixels wide
      var $grid = $('.grid').imagesLoaded( function() {

        $grid.masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          transitionDuration: 0,
          gutter: '.gutter-sizer'
        });

        $grid.addClass('masonry');

      });

      $('nav ul li a').hover(
        function() {
          var image = $(this).find('img').attr('src');
          var text = $(this).text();
          $('#bg').append('<div id="image-text"><span>'+text+'</span></div>');
        },
        function() {
          $('#image-text').remove();
        }
      )
  }


  const url = window.location.pathname;
  $('[href="'+url+'"]').addClass('active');
  if (url == "/") {
    $('[href="/overview/"]').addClass('active');
  }

});

$('#mode-toggle').click(function () {
  var element = document.body;
  element.classList.toggle("dark-mode");
})

$('#name').click(function () {
  if ($('header nav').hasClass('hidden')) {
    $('header nav').removeClass('hidden');
    $('#thumb-grid').addClass('hidden');
    $('#thumb-line').removeClass('hidden');
    $('#name-arrow').text('↓');
    $('#nav-title').addClass('hidden');
  } else {
    $('header nav').addClass('hidden');
    $('#thumb-grid').removeClass('hidden');
    $('#thumb-line').addClass('hidden');
    $('#name-arrow').text('→');
    $('#nav-title').removeClass('hidden');
  }
});

$('#thumb-line').click(function () {
  if ($('header nav').hasClass('hidden')) {
    $('header nav').removeClass('hidden');
    $('#thumb-grid').addClass('hidden');
    $('#thumb-line').removeClass('hidden');
    $('#name-arrow').text('↓');
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
  } else {
    $('header nav').addClass('hidden');
    $('#thumb-grid').removeClass('hidden');
    $('#thumb-line').addClass('hidden');
    $('#name-arrow').text('→');
    $('html, body').css({
        overflow: 'auto',
        height: 'auto'
    });
  }
});

var lightbox = new SimpleLightbox('.gallery ul li a', { 
  overlayOpacity: 1,
  animationSpeed: 0,
  animationSlide: false,
  fadeSpeed: 0,
  closeText: "X",
  navText: ['<','>']
});

lightbox.on('show.simplelightbox', function() {
  $('#thumb-grid').addClass('hidden');
});

lightbox.on('close.simplelightbox', function() {
  $('#thumb-grid').removeClass('hidden');
});

window.addEventListener&&window.addEventListener('load',(function(){'use strict';var e=document.body;if(e.getElementsByClassName&&e.querySelector&&e.classList&&e.getBoundingClientRect){var t,n='replace',i='preview',r='reveal',s=document.getElementsByClassName('progressive replace'),o=window.requestAnimationFrame||function(e){e()};['pageshow','scroll','resize'].forEach((function(e){window.addEventListener(e,a,{passive:!0})})),window.MutationObserver&&new MutationObserver(a).observe(e,{subtree:!0,childList:!0,attributes:!0}),c()}function a(){t=t||setTimeout((function(){t=null,c()}),300)}function c(){s.length&&o((function(){for(var e,t,n=window.innerHeight,i=0;i<s.length;)0<(t=(e=s[i].getBoundingClientRect()).top)+e.height&&n>t?l(s[i]):i++}))}function l(e,t){e.classList.remove(n);var s=e.getAttribute('data-href')||e.href,a=e.querySelector('img.preview');if(s&&a){var c=new Image,u=e.dataset;u&&(u.srcset&&(c.srcset=u.srcset),u.sizes&&(c.sizes=u.sizes)),c.onload=function(){s===e.href&&(e.style.cursor='default',e.addEventListener('click',(function(e){e.preventDefault()})));var t=c.classList;c.className=a.className,t.remove(i),t.add(r),c.alt=a.alt||'',c.onload=0,c.onerror=0,o((function(){e.insertBefore(c,a.nextSibling).addEventListener('animationend',(function(){e.removeChild(a),t.remove(r)}))}))},(t=1+(t||0))<3&&(c.onerror=function(){setTimeout((function(){l(e,t)}),3e3*t)}),c.src=s}}}),!1);

