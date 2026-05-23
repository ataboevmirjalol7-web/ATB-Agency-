document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const langSwitch = document.getElementById('langSwitch');

  function setMenuOpen(isOpen) {
    if (!navLinks || !navToggle || !navOverlay) return;
    navLinks.classList.toggle('open', isOpen);
    navToggle.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (typeof getMenuLabel === 'function') {
      navToggle.setAttribute('aria-label', getMenuLabel(isOpen));
    }
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  navToggle?.addEventListener('click', () => {
    setMenuOpen(!navLinks?.classList.contains('open'));
  });

  navOverlay?.addEventListener('click', () => {
    setMenuOpen(false);
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenuOpen(false);
  });

  langSwitch?.addEventListener('click', (event) => {
    const btn = event.target.closest('.lang-btn');
    if (!btn?.dataset.lang || typeof applyLanguage !== 'function') return;
    event.preventDefault();
    applyLanguage(btn.dataset.lang);
  });

  if (typeof initLanguage === 'function') {
    initLanguage(false);
  }

  if (navToggle && typeof getMenuLabel === 'function') {
    navToggle.setAttribute('aria-label', getMenuLabel(false));
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.service-card, .about-grid, .contact-card, .section-header, .cta-box').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
