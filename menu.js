document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  if (!hamburger || !menu) return;

  const toggle = () => {
    menu.classList.toggle('active');
    const opened = menu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  };

  hamburger.addEventListener('click', toggle);
  // ook via toetsenbord toegankelijk
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
