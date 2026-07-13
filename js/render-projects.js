/**
 * Renderiza la galería de proyectos a partir de data/projects.js
 * dentro de <div class="project-grid" id="project-grid"></div>.
 */
(function () {
  const grid = document.getElementById('project-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  const playIcon = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

  grid.innerHTML = PROJECTS.map((p, i) => `
    <a href="${p.link}" class="project-card" style="transition-delay:${Math.min(i * 90, 450)}ms">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title} — ${p.category}" loading="lazy" width="800" height="1000">
        <div class="play-btn"><span>${playIcon}</span></div>
      </div>
      <div class="project-meta">
        <div>
          <h3>${p.title}</h3>
          <p class="tags">${p.category} · ${p.client} · ${p.year}</p>
          <p class="project-desc">${p.description}</p>
        </div>
      </div>
      <span class="ver">Ver proyecto completo <span aria-hidden="true">→</span></span>
    </a>
  `).join('');

  grid.querySelectorAll('.project-card').forEach((el) => el.classList.add('reveal'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  grid.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
