/* Splits the hero title into letters so each one rises from the bottom in turn */
(function () {
  var title = document.querySelector(".hero2__title");
  if (!title) return;
  var text = title.textContent.trim();
  title.setAttribute("aria-label", text);
  title.textContent = "";
  Array.from(text).forEach(function (ch, i) {
    var wrap = document.createElement("span");
    wrap.className = "hero2__char" + (ch === " " ? " hero2__char--space" : "");
    wrap.setAttribute("aria-hidden", "true");
    var inner = document.createElement("span");
    inner.className = "hero2__char-in";
    inner.style.setProperty("--i", i);
    inner.textContent = ch === " " ? " " : ch;
    wrap.appendChild(inner);
    title.appendChild(wrap);
  });
})();
