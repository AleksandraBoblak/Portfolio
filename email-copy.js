(function () {
  document.querySelectorAll("[data-copy-email]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var text = el.getAttribute("data-copy-email");
      if (!text) return;

      var textEl = el.querySelector(".footer-link__text");
      var copyIcon = el.querySelector(".footer-link__icon--copy");
      var labelText = textEl ? textEl.textContent.trim() : el.textContent.trim();

      function showCopied() {
        if (textEl) {
          textEl.textContent = "Copied";
        } else {
          el.textContent = "Copied";
        }
        if (copyIcon) {
          copyIcon.setAttribute("hidden", "");
        }
        window.setTimeout(function () {
          if (textEl) {
            textEl.textContent = labelText;
          } else {
            el.textContent = labelText;
          }
          if (copyIcon) {
            copyIcon.removeAttribute("hidden");
          }
        }, 1600);
      }

      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showCopied();
        } catch (err) {
          /* ignore */
        }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });
})();
