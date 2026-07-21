/**
 * Lightbox genérico: cualquier <figure> dentro de un contenedor con
 * [data-lightbox] abre su imagen en grande, con navegación anterior/
 * siguiente entre las figuras de ese mismo contenedor.
 */
(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = lightbox.querySelector(".lightbox-img");
  const capEl = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let group = [];
  let index = 0;
  let lastFocused = null;

  function show() {
    const figure = group[index];
    const img = figure.querySelector("img");
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt || "";
    const caption = figure.querySelector("figcaption");
    capEl.textContent = caption ? caption.textContent : "";
    const multiple = group.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  }

  function open(newGroup, newIndex) {
    group = newGroup;
    index = newIndex;
    show();
    lastFocused = document.activeElement;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    imgEl.src = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function next() { index = (index + 1) % group.length; show(); }
  function prev() { index = (index - 1 + group.length) % group.length; show(); }

  document.addEventListener("click", (e) => {
    const figure = e.target.closest("[data-lightbox] figure");
    if (!figure) return;
    const container = figure.closest("[data-lightbox]");
    const figures = [...container.querySelectorAll("figure")];
    open(figures, figures.indexOf(figure));
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();
