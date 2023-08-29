window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

function mod(n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        var success_text = [               
          "Existing SOTA separately models each individual object, and predicts both clamps to be in the back; 3DNEL jointly models multiple objects in a scene and avoids such errors.",
          "Existing SOTA confuses the two similar-looking clamps; 3DNEL jointly reasons about combinations of multiple pose hypotheses for each object, and avoids such errors.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
          "3DNEL combines RGB and depth information in a principled way, and can robustly handle cases where RGB alone is not informative enough.",
          "3DNEL combines RGB and depth information in a principled way, and can robustly handle cases where RGB alone is not informative enough.",
          "3DNEL combines RGB and depth information in a principled way, and can robustly handle cases where RGB alone is not informative enough.",
          "3DNEL combines RGB and depth information in a principled way, and can robustly handle cases where RGB alone is not informative enough.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
          "3DNEL robustly aggregates information across the entire image, and can deal with missing 2D detections.",
        ];
    	document.querySelector('#success-text').innerHTML=success_text[0];
        if (carousels[i].element.id=='results-carousel') {
          // Add listener to  event
          carousels[i].on('after:show', state => {
            console.log(state)
            console.log(mod(state.next,12))
    		document.querySelector('#success-text').innerHTML=success_text[mod(state.next,12)];
          });
        }
        var failure_text = [
            "The 4 object stack fails as the compounded errors cause the final object to be placed in an unstable position. This happens as the controller doesn't have the ability to reason about the dynamics of the scene.",
            "As the second object is about to be placed, the important points get occluded. As the arm moves the object gets progressively smaller causing the controller to diverge as it looses tracking due to the scale change.",
            "While the apple can be picked up despite the occlusions, the sticker occludes the points which would be required to successfully place the apple.",
            "As the controllers tries to place the block besides the white gear it collides with the juggling ball, because there is no pathway to reason about clutter. The controllers ends up letting go of the object.",
            "As the orange block gets placed on top of the blue one it doesn't get placed sufficiently precisely and when it gets pushed down it slides to the side instead of clicking in.",
            "Even though the overall motion is executed correctly, the objects did not get placed accurately enough for them to be inserted into the holes.",
        ];
        document.querySelector('#failure-text').innerHTML=failure_text[0];
        if (carousels[i].element.id=='failure-carousel') {
          carousels[i].on('after:show', state => {
    		document.querySelector('#failure-text').innerHTML=failure_text[state.next%6];
          });
        }
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#results-carousel');
    console.log(element);
    if (element && element.bulmaCarousel) {
        console.log("is carousel");
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.Function.on('before-show', function(state) {
    		console.log("results-carousel");
    	});
    }
    var element = document.querySelector('#success1');
    if (element && element.bulmaCarousel) {
    	element.bulmaCarousel.on('show', function(state) {
    		console.log("hi");
    		document.querySelector('#success_text').innerHTML="test1"
    	});
    }
    var element = document.querySelector('#success2');
    console.log(element)
    if (element && element.bulmaCarousel) {
    	element.bulmaCarousel.on('show', function(state) {
    		console.log("hi2");
    		document.querySelector('#success_text').innerHTML="test2"
    	});
    }


    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    //$('#interpolation-slider').on('input', function(event) {
    //  setInterpolationImage(this.value);
    //});
    //setInterpolationImage(0);
    //$('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    //bulmaSlider.attach();

    

})
