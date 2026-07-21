/**
 * Renderiza las sesiones fotográficas a partir de data/sessions.js.
 *
 * En fotografia.html llena <div id="session-grid"> con una tarjeta de
 * portada por sesión, cada una enlazando a sesion.html?id=<id>.
 *
 * En sesion.html lee "?id=" de la URL y llena el título y la galería
 * completa de esa sesión dentro de <div id="session-gallery">.
 */
(function () {
  if (typeof SESSIONS === "undefined") return;

  function reveal(container, selector) {
    const els = container.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  // --- fotografia.html: tarjetas de portada ---
  const sessionGrid = document.getElementById("session-grid");
  if (sessionGrid) {
    sessionGrid.innerHTML = SESSIONS.map((s) => `
      <a class="session-card" href="sesion.html?id=${s.id}">
        <img src="${s.cover}" alt="${s.title} — ${s.category}" loading="lazy">
        <div class="session-card-meta">
          <p class="kicker">${s.category}</p>
          <h3 class="h-serif">${s.title}</h3>
          <p class="session-cue">Ver sesión completa →</p>
        </div>
      </a>
    `).join("");
    reveal(sessionGrid, ".session-card");
  }

  // --- sesion.html: galería de una sesión ---
  const gallery = document.getElementById("session-gallery");
  if (gallery) {
    const params = new URLSearchParams(location.search);
    const session = SESSIONS.find((s) => s.id === params.get("id")) || SESSIONS[0];

    const kicker = document.getElementById("session-kicker");
    const title = document.getElementById("session-title");
    const count = document.getElementById("session-count");
    if (kicker) kicker.textContent = session.category;
    if (title) title.textContent = session.title;
    if (count) count.textContent = `${session.photos.length} fotos`;
    document.title = `${session.title} — Brant · Bacu Creative`;

    gallery.innerHTML = session.photos.map((p) => `
      <figure>
        <img src="${p.src}" alt="${p.alt}" loading="lazy">
      </figure>
    `).join("");
    reveal(gallery, "figure");
  }
})();
