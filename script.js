// script.js
// Dark mode, smooth scroll, fade-in on scroll, mobile nav toggle, collapsible experience

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const darkToggle = document.getElementById('darkToggle');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const yearEl = document.getElementById('year');

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize theme from localStorage
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    root.setAttribute('data-theme', 'dark');
    darkToggle.textContent = '☀️';
    darkToggle.setAttribute('aria-pressed', 'true');
  } else {
    root.removeAttribute('data-theme');
    darkToggle.textContent = '🌙';
    darkToggle.setAttribute('aria-pressed', 'false');
  }

  darkToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkToggle.textContent = '🌙';
      darkToggle.setAttribute('aria-pressed', 'false');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkToggle.textContent = '☀️';
      darkToggle.setAttribute('aria-pressed', 'true');
    }
  });

  // Mobile nav toggle
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        navLinks.classList.remove('open'); // close mobile nav
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });

  // Fade-in sections using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Timeline collapsible items
  document.querySelectorAll('.timeline-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const body = btn.nextElementSibling;
      if (!body) return;
      if (body.classList.contains('expanded')) {
        body.classList.remove('expanded');
        body.classList.add('collapsed');
      } else {
        body.classList.remove('collapsed');
        body.classList.add('expanded');
      }
    });
  });

  // Accessibility: close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks || !navToggle) return;
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

}); // DOMContentLoaded
