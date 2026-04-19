/**
 * Hero water ripples (jQuery Ripples — same approach as
 * https://codepen.io/John_mpf/pen/MzXNwr )
 * Requires the page to be served over http(s); opening the HTML file
 * directly (file://) often blocks WebGL image textures in browsers.
 */
(function ($) {
  "use strict";

  if (!$ || !$.fn.ripples) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var $layer = $(".hero__ripple-layer");
  if (!$layer.length) return;

  try {
    $layer.ripples({
      resolution: 512,
      dropRadius: 22,
      perturbance: 0.045,
      interactive: true,
    });
  } catch (e) {
    return;
  }

  try {
    $layer.ripples("show");
  } catch (e) {
    /* optional in some builds */
  }

  $(".hero").addClass("hero--ripples-on");
})(window.jQuery);
