(function () {
  document.querySelectorAll("[data-process-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    });

    var visualId = root.getAttribute("data-process-sync-visual");
    var visualRoot = visualId ? document.getElementById(visualId) : null;

    function syncMoveVisual(index) {
      if (!visualRoot) return;
      var tab = tabs[index];
      var img = visualRoot.querySelector(".process-move-visual-img");
      var cap = visualRoot.querySelector("figcaption");
      if (!tab || !img) return;
      var src = tab.getAttribute("data-move-src");
      var alt = tab.getAttribute("data-move-alt");
      var caption = tab.getAttribute("data-move-caption");
      if (src) img.src = src;
      if (alt) img.alt = alt;
      if (cap && caption) cap.textContent = caption + " · Figma";
    }

    function activate(index, options) {
      var focus = options && options.focus;
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (panels[i]) panels[i].hidden = !selected;
      });
      syncMoveVisual(index);
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(index, { focus: false });
      });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          next = (index + 1) % tabs.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          next = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          e.preventDefault();
          next = 0;
        } else if (e.key === "End") {
          e.preventDefault();
          next = tabs.length - 1;
        }
        if (next !== null) activate(next, { focus: true });
      });
    });

    var initial = 0;
    for (var ti = 0; ti < tabs.length; ti++) {
      if (tabs[ti].getAttribute("aria-selected") === "true") {
        initial = ti;
        break;
      }
    }
    syncMoveVisual(initial);
  });
})();
