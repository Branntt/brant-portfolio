/**
 * Datos de las sesiones fotográficas (fotografia.html + sesion.html).
 *
 * Cada sesión es una subgalería propia con su URL: sesion.html?id=<id>
 * Para agregar una sesión nueva, copia un objeto, cámbiale los datos y
 * agrega las fotos a assets/img/. No hace falta tocar el HTML.
 *
 *   id          Identificador único para la URL (?id=...)      (texto, sin espacios)
 *   title       Nombre de la sesión                            (texto)
 *   category    Tipo de trabajo                                (ej: "Marca Personal", "Sesión XV")
 *   cover       Imagen de portada para la tarjeta               (assets/img/...)
 *   photos      Lista de fotos: [{ src, alt }, ...]
 */
const SESSIONS = [
  {
    id: "brayanher",
    title: "Brayanher",
    category: "Marca Personal",
    cover: "assets/img/sesion-brayanher-mustang-frontal.jpg",
    photos: [
      { src: "assets/img/sesion-brayanher-mustang-frontal.jpg", alt: "Ford Mustang GT en locación campestre" },
      { src: "assets/img/sesion-brayanher-caballo-baul.jpg", alt: "Caballo asomado al baúl de un Mustang" },
      { src: "assets/img/sesion-brayanher-caballo-retrato.jpg", alt: "Retrato de caballo blanco en la puerta del establo" },
      { src: "assets/img/sesion-brayanher-caballo-jinete.jpg", alt: "Brayanher a caballo con montura Motovalle Ford" },
      { src: "assets/img/sesion-brayanher-dos-autos.jpg", alt: "Brayanher recostado en el Mustang junto a otro vehículo" },
      { src: "assets/img/sesion-brayanher-cenital.jpg", alt: "Vista cenital del interior del Mustang" }
    ]
  },
  {
    id: "xv-paula",
    title: "Sesión XV",
    category: "Quinceañera",
    cover: "assets/img/sesion-xv-retrato.jpg",
    photos: [
      { src: "assets/img/sesion-xv-retrato.jpg", alt: "Retrato de quinceañera con iluminación dramática" },
      { src: "assets/img/sesion-xv-ramo.jpg", alt: "Quinceañera con ramo de flores" },
      { src: "assets/img/sesion-xv-serenata.jpg", alt: "Serenata de mariachi a la quinceañera" },
      { src: "assets/img/sesion-xv-mariachi-retrato.jpg", alt: "Retrato de mariachi durante la serenata" },
      { src: "assets/img/sesion-xv-aplauso.jpg", alt: "Quinceañera celebrando con la banda de mariachi" },
      { src: "assets/img/sesion-xv-emocion.jpg", alt: "Momento emotivo de la quinceañera" }
    ]
  }
];

// Exponer para el script de render en fotografia.html y sesion.html
if (typeof module !== "undefined") module.exports = SESSIONS;
