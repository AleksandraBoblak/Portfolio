(function () {
  document.querySelectorAll("[data-case-study-compare]").forEach(function (root) {
    var buttons = root.querySelectorAll("[data-compare-view]");
    var beforePane = root.querySelector('[data-compare="before"]');
    var afterPane = root.querySelector('[data-compare="after"]');
    var status = root.querySelector(".case-study-compare__status");
    if (!beforePane || !afterPane) return;

    function setView(view) {
      var isAfter = view !== "before";
      beforePane.hidden = isAfter;
      afterPane.hidden = !isAfter;
      beforePane.setAttribute("aria-hidden", isAfter ? "true" : "false");
      afterPane.setAttribute("aria-hidden", isAfter ? "false" : "true");
      if (status) {
        status.textContent = isAfter ? "Showing after" : "Showing before";
      }
      buttons.forEach(function (btn) {
        var v = btn.getAttribute("data-compare-view");
        var on = v === view;
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.classList.toggle("case-study-compare__btn--active", on);
      });
    }

    if (buttons.length) {
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          setView(btn.getAttribute("data-compare-view"));
        });
      });
      var activeBtn = root.querySelector(".case-study-compare__btn--active");
      var initialView =
        activeBtn && activeBtn.getAttribute("data-compare-view") === "before"
          ? "before"
          : "after";
      setView(initialView);
      return;
    }

    var input = root.querySelector(".case-study-compare__range");
    if (!input) return;

    function syncFromRange() {
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

    input.addEventListener("input", syncFromRange);
    input.addEventListener("change", syncFromRange);
    syncFromRange();
  });
})();
