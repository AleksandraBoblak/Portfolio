(function () {
  document.querySelectorAll("[data-reno-strategy-panel]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    var panel = root.querySelector('[role="tabpanel"]');
    var frame = root.querySelector(".reno-strategy-visual__frame");
    var img = root.querySelector(".reno-strategy-visual__img:not(.reno-strategy-visual__img--secondary)");
    var img2 = root.querySelector(".reno-strategy-visual__img--secondary");
    var arrow = root.querySelector(".reno-strategy-visual__arrow");
    var placeholder = root.querySelector(".reno-strategy-visual__placeholder");
    var captionEl = root.querySelector(".reno-strategy-visual__caption");

    function applyStep(index, options) {
      var focus = options && options.focus;
      var tab = tabs[index];
      if (!tab) return;

      tabs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });

      if (panel) {
        panel.setAttribute("aria-labelledby", tab.id);
      }

      var src = (tab.getAttribute("data-reno-src") || "").trim();
      var alt = tab.getAttribute("data-reno-alt") || "";
      var src2 = (tab.getAttribute("data-reno-src-2") || "").trim();
      var alt2 = tab.getAttribute("data-reno-alt-2") || "";
      var cap = tab.getAttribute("data-reno-caption") || "";
      var ph = (tab.getAttribute("data-reno-placeholder") || "").trim();

      if (img && placeholder) {
        if (src) {
          img.src = src;
          img.alt = alt;
          img.hidden = false;
          placeholder.hidden = true;
        } else {
          img.removeAttribute("src");
          img.alt = "";
          img.hidden = true;
          placeholder.hidden = false;
          placeholder.textContent =
            ph || "Visual for this step — coming soon.";
        }
      }

      var isDual = !!(src && src2);
      if (img2) {
        if (isDual) {
          img2.src = src2;
          img2.alt = alt2;
          img2.hidden = false;
        } else {
          img2.removeAttribute("src");
          img2.alt = "";
          img2.hidden = true;
        }
      }
      if (arrow) arrow.hidden = !isDual;
      if (frame) frame.classList.toggle("is-dual", isDual);

      if (captionEl) {
        captionEl.textContent = cap;
      }

      if (focus) {
        tab.focus();
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        applyStep(index, { focus: false });
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
        if (next !== null) applyStep(next, { focus: true });
      });
    });

    var initial = 0;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute("aria-selected") === "true") {
        initial = i;
        break;
      }
    }
    applyStep(initial, { focus: false });
  });
})();
