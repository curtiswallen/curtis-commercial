var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  fitWidth: true,
  transitionDuration: 0
});

$('.name').hover(
  function() {
    $('.name').css("color", "black");
  }, function() {
    $('.name').css("color", "red");
  }
);

$('.name').click(function() {
  if ($('#biocontainer').is(':visible')) {
    $('#biocontainer').css('display', 'none')
  } else {
    $('#biocontainer').css('display', 'block')
  }
})

$('#bioclose').click(function() {
  $('#biocontainer').css('display', 'none');
})

var lightbox = new SimpleLightbox('.grid-item a', { 
  overlayOpacity: 1,
  animationSpeed: 0,
  animationSlide: false,
  fadeSpeed: 0,
  closeText: "X",
  navText: ['←','→']
});

var slider = document.getElementById("gridSlide");
var output = document.getElementById("gridCount");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
  var columncount = 100/this.value;
  $('.grid-item, .grid-sizer').css("width", columncount + "%");
  $grid.masonry();
}

window.onresize = function(event) {
  $grid.masonry();
};

$("img.lazyload").on("load",function(){
    $grid.masonry();
  });