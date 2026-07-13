# Brant — Portafolio

Sitio estático (HTML/CSS/JS puro, sin frameworks ni build step) para el portafolio
de Brant, director creativo y realizador audiovisual.

## Modo actual: "Coming Soon"

El sitio **aún no se lanzó oficialmente**. `index.html` (la URL pública) es una
pantalla de espera independiente (`css/coming-soon.css`) con el logo, el nombre
y una animación — no tiene navegación ni enlaza al resto del portafolio.

El portafolio completo real sigue existiendo y funcionando igual que antes,
solo que renombrado a **`home.html`** (y las demás páginas `sobre-mi.html`,
`proyectos.html`, `fotografia.html`, `contacto.html` no cambiaron). Puedes
seguir editándolo con toda tranquilidad; simplemente no está enlazado desde
la portada pública todavía. También se marcaron esas 5 páginas con
`noindex, nofollow` para que Google no las indexe antes de tiempo.

### Cómo salir del modo Coming Soon (lanzamiento real)

1. Renombra `index.html` → `coming-soon.html` (por si quieres reusarlo después).
2. Renombra `home.html` → `index.html`.
3. En `partials/nav.html`, cambia `home.html` de vuelta a `index.html` (2 lugares)
   y `data-page="home"` por `data-page="index"`.
4. En `home.html` (ahora `index.html`) y en las otras 4 páginas, cambia
   `<meta name="robots" content="noindex, nofollow">` de vuelta a
   `content="index, follow"`.
5. Restaura `sitemap.xml` con las 5 URLs (están comentadas al inicio del archivo).
6. `git add -A && git commit -m "Lanzamiento" && git push`.

## Requisito: servir por HTTP

El nav y el footer se cargan por `fetch()` desde `partials/`. Eso solo funciona
si el sitio se sirve por `http://` o `https://` — **no** abriendo el HTML con
doble clic (`file://`). Para probar en local:

```bash
python -m http.server 8020
# o
npx serve .
```

Cualquier hosting real (Netlify, Vercel, GitHub Pages, un servidor propio) ya
sirve por HTTP, así que en producción no hay que hacer nada especial.

## Estructura

```
brant-portfolio/
├── index.html          Pantalla "Coming Soon" (URL pública actual)
├── home.html            Inicio real (hero + collage + intro + stats) — pendiente de lanzar
├── sobre-mi.html        Bio, experiencia, herramientas, habilidades
├── proyectos.html        Showreel + galería (datos en data/projects.js) + proceso
├── fotografia.html       Tres miradas + detrás de escena
├── contacto.html         Contacto
├── partials/
│   ├── nav.html          Barra de navegación — se edita UNA vez, aplica a las 5 páginas
│   └── footer.html        Pie de página — igual, fuente única
├── data/
│   └── projects.js        Array de proyectos de la galería (ver más abajo)
├── js/
│   ├── include.js         Inyecta los partials (nav/footer) en cada página
│   ├── preloader.js       Lógica de la pantalla de carga inicial
│   ├── main.js             Nav móvil, enlace activo, scroll-reveal, reduced-motion
│   └── render-projects.js  Convierte data/projects.js en las tarjetas de proyectos.html
├── css/
│   └── style.css          Sistema de diseño completo (variables, tipografía, componentes)
├── assets/img/            Fotografías e íconos (ya optimizados/redimensionados)
├── robots.txt / sitemap.xml   SEO básico — actualizar el dominio antes de publicar
└── README.md
```

## Cómo agregar un proyecto nuevo a la galería

Abre `data/projects.js` y agrega un objeto al array `PROJECTS`:

```js
{
  title: "Nombre del proyecto",
  category: "Marca · Dirección",
  client: "Nombre del cliente",
  year: "2026",
  description: "Una frase corta describiendo el proyecto.",
  image: "assets/img/tu-imagen.jpg",
  link: "https://instagram.com/reel/..."   // o YouTube/Vimeo
}
```

No hay que tocar HTML ni CSS: `proyectos.html` lo renderiza automáticamente
(`js/render-projects.js`) con su animación de aparición y hover incluidas.

## Cómo agregar fotos nuevas

- **Fotografía (Tres miradas) / Detrás de escena**: son bloques `<figure>` fijos
  en `fotografia.html`. Para cambiar una foto, reemplaza el `src` del `<img>`
  correspondiente. Para agregar una categoría nueva, duplica un bloque
  `<figure>` dentro de `.mirada-grid` o `.bts-grid`.
- Sube las imágenes a `assets/img/`. Se recomienda:
  - Ancho máximo ~1400px para fotos de contenido, ~500px para íconos.
  - JPG calidad 80–85 para fotos, PNG para imágenes con transparencia.
  - Añadir siempre `width`/`height` reales y `loading="lazy"` (excepto la
    primera imagen visible de cada página, que debe cargar sin `lazy`).

## Cómo agregar una página nueva (ej. Testimonios, Servicios, Equipo, FAQ)

1. Copia cualquier página existente como plantilla (por ejemplo `fotografia.html`).
2. Cambia el `<title>`, las meta `description`/Open Graph y el contenido de `<main>`.
3. Agrega el enlace en `partials/nav.html` (una sola vez, aparece en las 5 páginas):
   ```html
   <li><a href="nueva-pagina.html" data-page="nueva-pagina">Nueva página</a></li>
   ```
4. Agrega la URL en `sitemap.xml`.

## Preloader

`js/preloader.js` muestra la pantalla de carga (`#preloader` en cada HTML) solo
la **primera vez** por sesión de navegación (`sessionStorage`), para no repetir
la animación en cada clic de navegación interna. Respeta
`prefers-reduced-motion` acortando la espera casi a cero. El texto se edita
directamente en el bloque `#preloader` de cada página (o vía `partials/` si
prefieres centralizarlo).

## Sistema de diseño

Todo vive en `css/style.css` como variables CSS (`:root`) y clases utilitarias:

- **Colores**: `--cream`, `--ink`, `--green` (+ variantes) — no se tocaron los
  colores de marca, solo se afinó `--muted` unos puntos para cumplir contraste
  de accesibilidad (WCAG AA).
- **Tipografía**: Anton (títulos de impacto), Playfair Display (títulos
  editoriales), Inter (texto de cuerpo).
- **Animaciones**: `.reveal` + `data-stagger` en un contenedor hace que sus
  hijos aparezcan escalonados al hacer scroll (ver `js/main.js`).
- **Accesibilidad**: enlace "Saltar al contenido", `:focus-visible`, y un
  bloque `@media (prefers-reduced-motion: reduce)` que desactiva animaciones
  para quien las tenga desactivadas en su sistema.

## SEO básico incluido

- `<title>` y meta `description` únicos por página.
- Open Graph / Twitter Card por página.
- `robots.txt` + `sitemap.xml`.
- JSON-LD (`schema.org/Person`) en Inicio y Contacto.

Antes de publicar, reemplaza `https://tudominio.com` por el dominio real en:
`sitemap.xml`, `robots.txt` y las etiquetas `<link rel="canonical">` /
`og:url` / `og:image` de cada página (búscalo con Ctrl+F "tudominio.com").

## Videos pendientes

En `data/projects.js` y en el bloque del reel de `proyectos.html`, los campos
`link`/`href` están en `"#"` hasta que compartas los links reales de
Instagram/YouTube/Vimeo de cada pieza.
