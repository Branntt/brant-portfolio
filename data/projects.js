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
 */
const PROJECTS = [
  {
    title: "Mercedes-Benz",
    category: "Marca · Dirección",
    client: "Mercedes-Benz",
    year: "2026",
    description: "Pieza de marca con dirección cinematográfica para contenido digital.",
    image: "assets/img/reel-mustang.jpg",
    link: "#"
  },
  {
    title: "Paintball Continental",
    category: "Publicidad · Dirección",
    client: "Paintball Continental",
    year: "2025",
    description: "Campaña publicitaria rodada en locación con equipo reducido.",
    image: "assets/img/night-crew.jpg",
    link: "#"
  },
  {
    title: "Motilarte",
    category: "Marca · Dirección",
    client: "Motilarte",
    year: "2025",
    description: "Contenido de marca para barbería, fotografía y video de producto.",
    image: "assets/img/barbershop.jpg",
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
  }
];

// Exponer para el script de render en proyectos.html
if (typeof module !== "undefined") module.exports = PROJECTS;
