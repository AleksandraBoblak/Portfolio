(function () {
  document.querySelectorAll("[data-case-study-compare]").forEach(function (root) {
    var input = root.querySelector(".case-study-compare__range");
    var beforePane = root.querySelector('[data-compare="before"]');
    var afterPane = root.querySelector('[data-compare="after"]');
    var status = root.querySelector(".case-study-compare__status");
    if (!input || !beforePane || !afterPane) return;

    function sync() {
      var v = input.value;
      var isAfter = v === "1";
      beforePane.hidden = isAfter;
      afterPane.hidden = !isAfter;
      beforePane.setAttribute("aria-hidden", isAfter ? "true" : "false");
      afterPane.setAttribute("aria-hidden", isAfter ? "false" : "true");
      input.setAttribute("aria-valuenow", v);
      input.setAttribute("aria-valuetext", isAfter ? "After" : "Before");
      if (status) {
        status.textContent = isAfter ? "Showing after" : "Showing before";
      }
    }

    input.addEventListener("input", sync);
    input.addEventListener("change", sync);
    sync();
  });
})();
