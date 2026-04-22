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

  function init() {
    try {
      $(".hero__ripple-layer").each(function () {
        var $layer = $(this);
        $layer.ripples({
          /* Use explicit imageUrl so the texture load is reliable */
          imageUrl: "assets/hero-sky.webp",
          /* Higher res = sharper photo in the shader; lower perturbance = image stays readable */
          resolution: 768,
          dropRadius: 18,
          perturbance: 0.022,
          interactive: true,
          crossOrigin: "",
        });
      });

      $(".about-hero__ripple-layer").each(function () {
        var $layer = $(this);
        $layer.ripples({
          imageUrl: "assets/hero-sky.webp",
          resolution: 768,
          dropRadius: 18,
          perturbance: 0.022,
          interactive: true,
          crossOrigin: "",
        });
      });
    } catch (e) {
      return;
    }

    try {
      $(".hero__ripple-layer, .about-hero__ripple-layer").ripples("show");
    } catch (e) {
      /* optional in some builds */
    }

    $(".hero, .about-hero").addClass("hero--ripples-on");
  }

  /* Wait for the background image to be fully available before WebGL samples it */
  $(window).on("load", init);
})(window.jQuery);
