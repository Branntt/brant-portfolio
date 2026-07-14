/**
 * Datos de la galería de proyectos (proyectos.html).
 *
 * Para agregar un proyecto nuevo, copia un objeto y cámbiale los datos.
 * No hace falta tocar el HTML ni el CSS.
 *
 *   title       Nombre del proyecto            (texto)
 *   category    Tipo de trabajo                (ej: "Marca", "Publicidad", "Videoclip")
 *   client      Cliente o marca                 (texto)
 *   year        Año de realización              (texto o número)
 *   description Descripción breve (1 frase)      (texto)
 *   image       Ruta de la imagen de portada     (assets/img/...)
 *   link        URL de Instagram/YouTube/Vimeo   ("#" mientras no exista)
 *   video       (Opcional) Ruta a un .mp4 propio en assets/video/ — si existe,
 *               la tarjeta reproduce el video directo en vez de enlazar afuera.
 */
const PROJECTS = [
  {
    title: "Mercedes-Benz",
    category: "Marca · Dirección",
    client: "Mercedes-Benz",
    year: "2026",
    description: "Revelación de vehículo con dirección de marca para contenido digital.",
    image: "assets/img/mercedes-reveal-poster.jpg",
    video: "assets/video/mercedes-reveal.mp4",
    link: "#"
  },
  {
    title: "Paintball Continental",
    category: "Publicidad · Dirección",
    client: "Paintball Continental",
    year: "2025",
    description: "Campaña publicitaria rodada en locación con equipo reducido.",
    image: "assets/img/paintball-continental-poster.jpg",
    video: "assets/video/paintball-continental.mp4",
    link: "#"
  },
  {
    title: "Motilarte",
    category: "Marca · Dirección",
    client: "Motilarte",
    year: "2025",
    description: "Contenido de marca para barbería, fotografía y video de producto.",
    image: "assets/img/motilarte-dron-poster.jpg",
    video: "assets/video/motilarte-dron.mp4",
    link: "#"
  },
  {
    title: "Ojitos Mentirosos",
    category: "Videoclip · Dirección",
    client: "Artista independiente",
    year: "2025",
    description: "Videoclip musical con dirección de arte y montaje narrativo.",
    image: "assets/img/edit-desk.jpg",
    link: "#"
  },
  {
    // TÍTULO PROVISIONAL: Brant no me confirmó de qué proyecto es este video
    // (rodaje nocturno con motos). Cambia title/client/category/description
    // cuando tengas el dato real.
    title: "Rodaje nocturno",
    category: "Video · Dirección",
    client: "Por confirmar",
    year: "2026",
    description: "Rodaje nocturno en locación — pendiente de confirmar el proyecto.",
    image: "assets/img/rodaje-nocturno-poster.jpg",
    video: "assets/video/rodaje-nocturno.mp4",
    link: "#"
  }
];

// Exponer para el script de render en proyectos.html
if (typeof module !== "undefined") module.exports = PROJECTS;
