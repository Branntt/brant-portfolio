/**
 * Preloader cinematográfico.
 * Se muestra una sola vez por sesión de navegación (sessionStorage) para no
 * repetir la animación en cada cambio de página dentro del mismo sitio.
 * Respeta prefers-reduced-motion acortando la espera a lo mínimo.
 */
(function () {
  const pre = document.getElementById('preloader');
  if (!pre) return;

  const seen = sessionStorage.getItem('brant_intro_seen');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (seen) {
    pre.remove();
    return;
  }

  document.documentElement.classList.add('is-preloading');

  const MIN_MS = reduced ? 300 : 2600;
  const FADE_MS = reduced ? 150 : 900;
  const start = Date.now();

  function finish() {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(() => {
      pre.classList.add('is-hidden');
      document.documentElement.classList.remove('is-preloading');
      sessionStorage.setItem('brant_intro_seen', '1');
      setTimeout(() => pre.remove(), FADE_MS);
    }, wait);
  }

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish, { once: true });
  }
})();
