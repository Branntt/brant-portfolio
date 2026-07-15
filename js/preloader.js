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

  // Datos curiosos aleatorios: mitad trivia audiovisual, mitad sabor bumangués.
  const FUN_FACTS = [
    'Dato curioso: la claqueta se llama así por el sonido que hace al cerrarse — ayuda a sincronizar audio y video en edición.',
    'La "hora dorada", justo después del amanecer o antes del atardecer, es la favorita de todo director de fotografía.',
    'La regla de los 180° existe para que el espectador nunca pierda la orientación dentro de una escena.',
    '24 cuadros por segundo se volvió el estándar del cine para ahorrar película, no por una razón científica.',
    'El primer largometraje colombiano fue "María", estrenado en 1922.',
    'Un buen corte de edición se siente, no se ve.',
    'Camine, que esto ya casi está listo...',
    'Sin hablar paja: esto sí está cargando de verdad.',
    'Poniéndole toda la berraquera a los detalles...',
    'Nada de joche — aquí todo va rápido.',
    'Cero paila: la experiencia ya casi carga.',
    'Ajustando cada detalle bien bacano, mano.'
  ];
  const line2 = pre.querySelector('.pre-line-2');
  if (line2) {
    line2.textContent = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
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
