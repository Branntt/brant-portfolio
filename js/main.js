/**
 * Comportamiento del sitio: nav (una vez cargado el partial), scroll reveal
 * con stagger opcional, y respeto a prefers-reduced-motion.
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function currentPage() {
    const file = location.pathname.split('/').pop() || 'index.html';
    return file.replace('.html', '') || 'index';
  }

  function setupNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    const page = currentPage();
    links.querySelectorAll('a[data-page]').forEach((a) => {
      if (a.getAttribute('data-page') === page) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function setupReveal() {
    const groups = document.querySelectorAll('[data-stagger]');
    groups.forEach((group) => {
      [...group.children].forEach((child, i) => {
        child.classList.add('reveal');
        child.style.transitionDelay = reduced ? '0ms' : `${Math.min(i * 90, 450)}ms`;
      });
    });

    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  if (window.partialsReady) {
    window.partialsReady.then(setupNav);
  } else {
    document.addEventListener('DOMContentLoaded', setupNav);
  }
  document.addEventListener('DOMContentLoaded', setupReveal);
})();
