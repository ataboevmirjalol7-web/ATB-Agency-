const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function setMenuOpen(isOpen) {
  navLinks.classList.toggle('open', isOpen);
  navToggle.classList.toggle('active', isOpen);
  navOverlay.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Menyuni yopish' : 'Menyuni ochish');
}

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  setMenuOpen(!navLinks.classList.contains('open'));
});

navOverlay.addEventListener('click', () => {
  setMenuOpen(false);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    setMenuOpen(false);
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.service-card, .about-grid, .contact-card, .section-header, .cta-box').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
