# BRANT · Bacu Creative — Design System

Portafolio web de Brandon "Brant" Cárdenas (Bacu Creative), director creativo
y realizador audiovisual en Bucaramanga, Colombia. Este documento describe
el sistema de diseño actual, tal como está implementado hoy, para usarlo
como referencia al generar o mejorar pantallas en Stitch.

Estado actual: sitio en modo "Coming Soon" (no lanzado públicamente todavía).
Sitio estático (HTML/CSS/JS puro, sin framework ni build step).

---

## 1. Identidad de marca

- **Nombre / marca**: BRANT — Bacu Creative
- **Instagram**: @bacu_creative
- **Rol**: Director creativo y realizador audiovisual (cine, publicidad,
  videoclips, contenido de marca, fotografía)
- **Ubicación**: Bucaramanga, Santander, Colombia
- **Tono de voz**: profesional pero cercano, frases cortas, en español,
  con un toque de orgullo local (referencias a Bucaramanga/Santander).
  Tagline de portada: *"Entra a mi mundo creativo."*
- **Logo**: un ojo dibujado a mano en trazo simple (forma de almendra +
  círculo del iris), color verde bosque. Usado como ícono de marca en el
  nav, favicon, y como elemento decorativo recurrente en el hero.
- **Motivo visual central**: el "ojo" — aparece en el logo, flotando
  alrededor del título del hero (efecto de 9 ojos en órbita con rayos
  láser, ver sección 6), y como separador/marca de agua en otras páginas.
- **Estética general**: collage de papel rasgado (torn-paper), tipografía
  editorial mezclada con carteles urbanos/street, fotografía cinematográfica
  con iluminación dramática. Cream cálido + negro tinta + verde bosque.

---

## 2. Paleta de colores

| Variable         | Hex       | Uso                                              |
|------------------|-----------|---------------------------------------------------|
| `--cream`        | `#f8f8f6` | Fondo claro principal                             |
| `--cream-2`       | `#f1f0ec` | Fondo claro secundario (alterna con --cream)      |
| `--ink`          | `#1c1a17` | Texto principal, fondo oscuro alterno              |
| `--ink-2`         | `#221d1e` | Fondo oscuro principal (hero, secciones dark)      |
| `--green`        | `#2c6754` | Color de marca / acento principal                  |
| `--green-light`   | `#4d7f6e` | Acento sobre fondo oscuro, hovers                   |
| `--laser`        | `#6bf0b0` | Verde neón brillante — solo para el efecto láser del hero y hovers puntuales |
| `--line`         | `#d2d9d2` | Bordes/divisores sobre fondo claro                  |
| `--line-dark`     | `#333a36` | Bordes/divisores sobre fondo oscuro                 |
| `--muted`        | `#726e67` | Texto secundario sobre fondo claro                  |
| `--muted-dark`    | `#9b9892` | Texto secundario sobre fondo oscuro                 |

Patrón de uso: las secciones alternan entre 4 fondos —
`.on-cream` (#f8f8f6), `.on-cream-2` (#f1f0ec), `.on-dark` (#221d1e, texto
cream), `.on-green` (#2c6754, texto cream) — para crear ritmo vertical al
hacer scroll. El verde (`--green`) es el ÚNICO acento de color en todo el
sitio; todo lo demás es neutro (cream/ink). El verde-láser (`--laser`) se
reserva para el efecto especial del hero y algunos hover states — no se usa
como color de texto/fondo normal.

---

## 3. Tipografía

Tres familias, cada una con un rol fijo (no se mezclan):

1. **Anton** (`--f-display`) — display/impacto. Todo mayúsculas, sin peso
   variable (400 uppercase). Usado en: el nombre "BRANT" del hero (gigante,
   `clamp(5rem, 18vw, 12rem)`), "Portafolio Creativo" del collage
   (`clamp(4rem, 19vw, 11rem)`), logo del nav, títulos display puntuales.
2. **Playfair Display** (`--f-serif`) — serif editorial, con variantes
   itálicas para énfasis emocional. Usado en: casi todos los `<h2>`/`<h3>`
   de sección (`.section-title`, `clamp(2.2rem, 4.5vw, 3.4rem)`, peso 500,
   line-height 1.08), títulos de tarjetas (proyectos, sesiones), la palabra
   "Contact" en itálica verde.
3. **Inter** (`--f-sans`) — texto de cuerpo, UI, kickers/labels. Pesos 400
   a 800. Los "kickers" (etiquetas pequeñas sobre cada título de sección)
   usan Inter 12px, uppercase, letter-spacing 0.22em, peso 600, color verde.

Jerarquía típica de una sección: **kicker** (Inter, pequeño, verde,
uppercase) → **título** (Playfair itálico o Anton display) → **texto**
(Inter, `line-height:1.6`, `color:muted` para descripciones).

---

## 4. Layout y espaciado

- **Ancho de contenido**: `max-width: 1180px`, centrado, con padding lateral
  fluido `clamp(24px, 5vw, 96px)` (`.container`).
- **Padding vertical de sección**: `clamp(64px, 10vw, 140px)` (`section.pad`).
- **Grid principal**: CSS Grid nativo, casi siempre 2 o 3 columnas en
  desktop que colapsan a 1 columna en mobile. No hay sistema de 12
  columnas — cada componente define su propio grid simple.
- **Breakpoint principal**: `780px` (nav a hamburguesa) y `760px` (la
  mayoría de grids de 2-3 columnas a 1 columna). Breakpoints secundarios en
  `860px` (splits de 2 columnas), `620-640px` (ajustes finos mobile).
- **Bordes/radios**: prácticamente sin `border-radius` (2px máximo en
  botones/tarjetas) — el sitio es intencionalmente de esquinas rectas,
  editorial, no "app-like".
- **Sombras**: mínimas, solo `drop-shadow`/`box-shadow` sutiles en hovers
  de botones y en el retrato del hero — el sitio no usa elevación tipo
  Material Design.

---

## 5. Componentes

### Nav (`.site-header`)
Sticky top, fondo cream, borde inferior 1px. Logo (ojo + "BRANT" / "Bacu
Creative" en dos líneas) a la izquierda, links a la derecha (Inicio, Sobre
mí, Proyectos, Fotografía, Contacto) en mayúsculas pequeñas con subrayado
verde animado on-hover y en la página activa. El logo tiene un parpadeo
sutil (`scaleY` a 0.1 cada ~5s, como un ojo real). Colapsa a menú
hamburguesa full-screen por debajo de 780px.

### Botones (`.btn`)
Rectangulares (2px radius), uppercase, 13px, letter-spacing 0.08em, borde
1px. Dos variantes: `.btn-solid` (fondo ink → hover fondo verde con sombra)
y `.btn-outline` (transparente con borde → hover se invierte). Leve
`translateY(-2px)` al hover.

### Hero + collage (home.html / index.html)
El componente más elaborado del sitio. Fondo oscuro, nombre "BRANT" gigante
en Anton, luego un bloque tipo "collage de papel rasgado": fondo con
textura de periódico + marco de papel rasgado (recorte real, no CSS
clip-path genérico), sobre el que flota el título "Portafolio Creativo"
con 9 íconos de ojo en órbita elíptica conectados por "rayos láser" SVG
(verde neón) al centro, todo animado (cada ojo flota/gira en un patrón
distinto, como si "compitieran" por el título). El retrato de Brant
(recorte real, manos en los bolsillos) se superpone por debajo, con el
título terminando detrás de su cabeza/hombros. Íconos decorativos
recortados (ojo, hoja, puente, audífonos, reloj de arena, cámara) flotan
alrededor, estilo recorte de revista/graffiti.

### Tarjetas de proyecto (`.project-card`, proyectos.html)
Grid 2 columnas. Miniatura 4:5 con outline verde on-hover y zoom sutil de
imagen; si el proyecto tiene video propio, se reproduce inline con
controles nativos en vez de miniatura+link. Debajo: título (Playfair),
categoría · cliente · año (Inter, muted), descripción, link "Ver proyecto
completo →".

### Tarjetas de sesión fotográfica (`.session-card`, fotografia.html →
sesion.html) — **agregado en esta sesión de trabajo**
Grid 2 columnas, formato retrato 3:4. Foto de portada a pantalla completa
con degradado oscuro inferior, sobre el que flota categoría (kicker verde-
láser) + título (Playfair itálico) + cue "Ver sesión completa →". Al hacer
clic lleva a `sesion.html?id=...`, una página dedicada que muestra la
galería completa de esa sesión (mismo componente `.bts-grid` de abajo) con
un botón "← Volver a fotografía".

### Grid de fotos (`.bts-grid`, fotografia.html)
Grid de 3 columnas (mosaico), con algunas figuras marcadas `.big` que
ocupan 2×2. object-fit:cover, outline verde on-hover, figcaption flotante
abajo-izquierda en mayúsculas pequeñas. Usado para "Divisiones", "Entre
bastidores" y ahora las galerías de sesión.

### Lightbox — **agregado en esta sesión de trabajo**
Overlay fijo pantalla completa (`rgba(23,20,15,0.95)`), imagen centrada
`object-fit:contain`, navegación anterior/siguiente (flechas + teclado),
caption abajo, cierra con X / clic afuera / Escape. Se activa automático
en cualquier grid con el atributo `data-lightbox` — no requiere
configuración por imagen.

### Preloader
Pantalla completa negra (`#0d0b09`) al cargar cualquier página, con el
logo-ojo, una frase random (antes fija, ahora un array de datos curiosos
sobre Bucaramanga/audiovisual elegido al azar) y una barra de progreso
verde. Fade + blur + scale al desaparecer.

### Tarjetas de habilidad (`.skill-card`, sobre-mi.html)
3 columnas, imagen 16:10 con outline verde on-hover, título Anton pequeño
verde, descripción muted.

### Contacto
Sin formulario — son links directos (mailto, tel, Instagram) sobre fondo
oscuro, más una foto ancha (21:9) con caption superpuesto tipo revista.

---

## 6. Inventario de páginas

| Página | Rol | Secciones principales |
|---|---|---|
| `index.html` | Gate público "Coming Soon" (URL live actual) | Hero+collage, mensaje + botón "Ver portafolio", marquee de skills, contacto rápido |
| `home.html` | Home real (post-lanzamiento) | Hero+collage, intro bio, stats de Instagram, producciones seleccionadas |
| `sobre-mi.html` | Bio | Hola/Soy Brant, marca de agua (ojo + @handle), experiencia laboral, oficio/herramientas, habilidades audiovisuales |
| `proyectos.html` | Portafolio de video | Showreel destacado, galería de proyectos (data-driven), proceso creativo (5 pasos) |
| `fotografia.html` | Portafolio de foto | Divisiones (Retrato/Editorial/Documental), **Sesiones** (tarjetas de portada → sesion.html), Entre bastidores (BTS) |
| `sesion.html` | Galería de UNA sesión fotográfica | Volver, título+categoría+conteo, grid completo con lightbox |
| `contacto.html` | Contacto | Título "Contact", agradecimiento + correo/teléfono/Instagram, foto ancha con caption |

Todas comparten: preloader, nav sticky, footer, misma tipografía/paleta.

---

## 7. Estilo fotográfico

Fotografía real (no stock): cinematográfica, iluminación dramática/natural,
tomas BTS a mano o en gimbal, composiciones verticales predominantes
(formato retrato 2:3, cámara Sony), mezcla de momentos documentales
candados con contenido de marca pulido. Temas recurrentes: automóviles
(Mustang GT, Mercedes-Benz), motos, ambiente ecuestre, sesiones de
quinceañera (XV años), barbería. Paleta de la fotografía en sí: tonos
naturales con acentos dramáticos, buen manejo de luces cálidas en interior/
noche (bombillas, luces de fiesta).

---

## 8. Motion / interacción

- **Scroll reveal**: casi todo entra con fade+translateY(24px→0) al entrar
  en viewport (IntersectionObserver, threshold ~0.12-0.15), con stagger de
  90ms entre elementos de un mismo grupo (`[data-stagger]`).
- **Hovers**: outline verde en imágenes/tarjetas, ligero scale en
  miniaturas, subrayado animado en links de nav, `translateY(-2px)` en
  botones.
- **`prefers-reduced-motion: reduce`** respetado en todo el sitio —
  desactiva animaciones/transiciones y muestra el contenido ya revelado.
- El sitio NO usa parallax, scroll-jacking, ni animaciones 3D — todo el
  movimiento es sutil y basado en opacidad/transform simples.

---

## 9. Notas técnicas (relevantes para adaptar a Stitch)

- Sitio 100% estático: HTML + CSS + JS vanilla, **sin** framework
  (no React/Vue), **sin** Tailwind, **sin** build step ni Node.
- El único "sistema de componentes" real es CSS con variables (`:root`) +
  clases utilitarias reusadas (`.container`, `.pad`, `.on-cream`, `.reveal`,
  `.kicker`, `.h-serif`, `.h-display`, `.btn`).
- Dos "galerías data-driven" (arrays de JS que se renderizan a HTML):
  `data/projects.js` (proyectos) y `data/sessions.js` (sesiones de foto,
  agregado en esta sesión de trabajo) — agregar contenido nuevo no requiere
  tocar HTML.
- Si Stitch genera componentes nuevos, para que encajen visualmente deben
  respetar: sin bordes redondeados grandes, un solo acento de color
  (verde), tipografía Anton/Playfair/Inter, y el ritmo alternado de fondos
  cream/cream-2/dark descrito en la sección 4.
