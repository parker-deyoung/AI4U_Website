/* ============================================================
   AI4U Website — main.js
   ============================================================ */

// ─── Navbar: scroll shadow + mobile toggle ──────────────────
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ─── Contact Form: client-side success state ─────────────────
const contactForm    = document.getElementById('contact-form');
const formFields     = document.getElementById('form-fields');
const formSuccess    = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const name    = contactForm.querySelector('[name="name"]').value.trim();
  const email   = contactForm.querySelector('[name="email"]').value.trim();
  const message = contactForm.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) return;

  // TODO: wire up real form submission (e.g. Formspree, EmailJS, Netlify Forms)
  // For now just show the success state
  formFields.style.display = 'none';
  formSuccess.style.display = 'block';
});

// ─── Smooth active nav link highlighting ─────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -45% 0px' });

sections.forEach(s => observer.observe(s));
