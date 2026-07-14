/**
 * Sistema de includes HTML.
 * Busca cualquier <div data-include="nombre"></div> y lo reemplaza por el
 * contenido de partials/nombre.html. Así el nav y el footer viven en un
 * solo archivo y se editan una única vez para las 5 páginas.
 *
 * Expone window.partialsReady (una Promise) en vez de un evento: un evento
 * personalizado puede dispararse antes de que otro script llegue a
 * escucharlo (carrera de carga de <script> clásicos); una Promise no tiene
 * ese problema — `.then()` siempre se ejecuta, ya esté resuelta o no.
 *
 * Requiere servir el sitio por http(s) (servidor local o hosting real);
 * no funciona abriendo el HTML directamente con doble clic (file://).
 * Ver README.md → "Requisito: servir por HTTP".
 */
window.partialsReady = (function () {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return Promise.resolve();

  return Promise.all(
    [...slots].map((el) => {
      const name = el.getAttribute('data-include');
      return fetch(`partials/${name}.html?v=2`)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((html) => { el.outerHTML = html; })
        .catch(() => { el.innerHTML = ''; });
    })
  );
})();
