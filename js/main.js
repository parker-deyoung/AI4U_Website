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

// ─── Contact Form: Formspree integration ─────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreykreb';

const contactForm = document.getElementById('contact-form');
const formFields  = document.getElementById('form-fields');
const formSuccess = document.getElementById('form-success');
const submitBtn   = contactForm.querySelector('[type="submit"]');

// Inject error message element below the submit button
const formError = document.createElement('p');
formError.className = 'form-error';
formError.setAttribute('role', 'alert');
submitBtn.insertAdjacentElement('afterend', formError);

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  const name    = contactForm.querySelector('[name="name"]').value.trim();
  const email   = contactForm.querySelector('[name="email"]').value.trim();
  const message = contactForm.querySelector('[name="message"]').value.trim();
  if (!name || !email || !message) return;

  // Loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formError.textContent = '';

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm),
    });

    if (response.ok) {
      formFields.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      const data = await response.json();
      const msg = data?.errors?.map(err => err.message).join(', ')
        || 'Something went wrong. Please try again.';
      formError.textContent = msg;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  } catch {
    formError.textContent = 'Network error — please check your connection and try again.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
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
