/* ═══════════════════════════════════════════════════
   ISTABRAK PORTFOLIO — script.js
═══════════════════════════════════════════════════ */

'use strict';

/* ─── THEME SWITCHER ─── */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-btn');
  if (!btn) return;
  const icons = { light: 'fa-sun', dark: 'fa-moon', cyber: 'fa-bolt' };
  const labels = { light: 'Light', dark: 'Dark', cyber: 'Cyber' };
  btn.innerHTML = `<i class="fas ${icons[theme]} me-1"></i> ${labels[theme]}`;
}

function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'light';
  setTheme(saved);
}

/* ─── NAVBAR SCROLL EFFECT ─── */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 90;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Trigger GPA bar fill once visible
          const fill = entry.target.querySelector('.gpa-fill');
          if (fill) {
            setTimeout(() => {
              fill.style.width = fill.getAttribute('data-width') || fill.style.width;
            }, 300);
          }
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ─── SMOOTH SCROLL for nav links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile nav if open
        const navCollapse = document.getElementById('navMenu');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });
}

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const btn = document.querySelector('.contact-form-card .btn-primary-custom');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-form-card .custom-input');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = 'var(--accent)';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });

    if (allFilled) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
      btn.style.background = '#1e9664';
      btn.style.borderColor = '#1e9664';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        inputs.forEach(input => { input.value = ''; });
      }, 3000);
    }
  });
}

/* ─── TYPING ANIMATION for hero title ─── */
function initTypingEffect() {
  const titles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Laravel Specialist',
    'React.js Developer'
  ];
  const el = document.querySelector('.hero-title');
  if (!el) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      el.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingSpeed = 1800; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Start after a small delay
  setTimeout(type, 1200);
}

/* ─── TILT effect on cards (subtle) ─── */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .edu-card, .skill-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── COUNTER ANIMATION for About stats ─── */
function initCounters() {
  const counters = document.querySelectorAll('.about-stat span');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        if (isNaN(target)) return;
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 50);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ─── INIT ALL ─── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initReveal();
  initSmoothScroll();
  initContactForm();
  initTypingEffect();
  initCardTilt();
  initCounters();
});
