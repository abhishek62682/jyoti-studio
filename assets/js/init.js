(() => {
  const lenis = new Lenis({ autoRaf: true });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();