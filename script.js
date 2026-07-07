document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.dataset.theme = savedTheme;
  }

  function updateThemeButton() {
    const isLight = body.dataset.theme === 'light';
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    themeToggle.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  }

  if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener('click', () => {
      const nextTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
      body.dataset.theme = nextTheme;
      localStorage.setItem('theme', nextTheme);
      updateThemeButton();
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card, .project-card, .service-card, .timeline-item').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (!submitButton) return;
      submitButton.textContent = 'Sent! ✓';
      submitButton.classList.add('btn-primary');
      submitButton.style.background = 'var(--green)';
      submitButton.style.borderColor = 'var(--green)';
      setTimeout(() => {
        submitButton.textContent = 'Send Message →';
        submitButton.style.background = '';
        submitButton.style.borderColor = '';
        contactForm.reset();
      }, 2600);
    });
  }

  const avatarImage = document.querySelector('.hero-avatar img');
  if (avatarImage) {
    avatarImage.addEventListener('error', () => {
      avatarImage.src = 'https://via.placeholder.com/420?text=Mohamed+Elftiany';
    });
  }
});
