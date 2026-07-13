/**
 * Marca <html class="fonts-ready"> cuando Anton/Playfair/Inter terminan
 * de cargar. Hasta entonces, css/coming-soon.css mantiene el texto y la
 * cinta animada ocultos y en pausa — así se evita el salto/parpadeo que
 * ocurre cuando la fuente de reserva es reemplazada a mitad de una
 * animación cuyo ancho depende del texto (ver comentario en el CSS).
 * El timeout de respaldo evita que la pantalla se quede oculta si
 * document.fonts no está disponible o nunca resuelve.
 */
(function () {
  document.documentElement.classList.remove('no-js');

  function reveal() {
    document.documentElement.classList.add('fonts-ready');
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reveal);
    setTimeout(reveal, 1500);
  } else {
    reveal();
  }
})();
