/* Portfolio interactions — no dependencies required. */
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  /* Preloader */
  window.addEventListener('load', () => setTimeout(() => $('.preloader').classList.add('is-done'), 150));
  $('#year').textContent = new Date().getFullYear();

  /* Smooth nav, active links and compact sticky header */
  const header = $('.site-header');
  const navLinks = $$('.main-nav a');
  const sections = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
  const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-38% 0px -53% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));

  /* Mobile menu */
  const menuButton = $('.menu-button'); const nav = $('.main-nav');
  menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
  navLinks.forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }));

  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); menuButton.focus(); } });

  /* Persistent colour theme */
  const themeButton = $('.theme-toggle');
  let savedTheme = null; try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* storage unavailable */ }
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.body.classList.add('dark');
  const updateThemeLabel = () => themeButton.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode');
  updateThemeLabel();
  themeButton.addEventListener('click', () => { document.body.classList.toggle('dark'); try { localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); } catch { /* storage unavailable */ } updateThemeLabel(); });

  /* Reveal animations and skills progress bars */
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach((element) => revealObserver.observe(element));

  /* Hero typewriter */
  const phrases = ['turning spatial data into evidence', 'learning how landscapes change', 'building maps people can use'];
  const typeElement = $('.typewriter'); let phraseIndex = 0; let characterIndex = 0; let deleting = false;
  const type = () => { const phrase = phrases[phraseIndex]; typeElement.textContent = phrase.slice(0, characterIndex); if (!deleting && characterIndex < phrase.length) { characterIndex += 1; setTimeout(type, 72); } else if (!deleting) { deleting = true; setTimeout(type, 1600); } else if (characterIndex > 0) { characterIndex -= 1; setTimeout(type, 34); } else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(type, 350); } };
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) type();

  /* Tasteful hero parallax and cursor glow */
  const heroImage = $('[data-parallax]'); const glow = $('.cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', (event) => { glow.style.opacity = '1'; glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });
    window.addEventListener('scroll', () => { if (window.scrollY < window.innerHeight) heroImage.style.transform = `translateY(${window.scrollY * .18}px)`; }, { passive: true });
  }

  /* Project filter and keyboard-accessible modal */
  const filterButtons = $$('.filter-button'); const cards = $$('.project-card'); const modal = $('.project-modal'); const closeModal = $('.modal-close'); let previousFocus;
  filterButtons.forEach((button) => button.addEventListener('click', () => { const filter = button.dataset.filter; filterButtons.forEach((item) => item.classList.toggle('active', item === button)); cards.forEach((card) => card.classList.toggle('is-filtered', filter !== 'all' && !card.dataset.category.includes(filter))); }));
  const openModal = (card) => { previousFocus = document.activeElement; const extra = $('.modal-extra'); extra.innerHTML = ''; const tpl = card.dataset.extra && document.getElementById(card.dataset.extra); if (tpl) extra.appendChild(tpl.content.cloneNode(true)); $('#modal-title').textContent = card.dataset.title; $('.modal-description').textContent = card.dataset.description; $('.modal-details').textContent = card.dataset.details; const image = $('.modal-image'); const modalLink = $('.modal-link'); image.onerror = () => { image.hidden = true; }; if (card.dataset.image) { image.src = card.dataset.image; image.alt = `${card.dataset.title} project thumbnail`; image.hidden = false; } else { image.hidden = true; image.removeAttribute('src'); } if (card.dataset.link) { modalLink.href = card.dataset.link; modalLink.textContent = `${card.dataset.linkLabel || 'View project'} ↗`; modalLink.hidden = false; } else { modalLink.hidden = true; modalLink.removeAttribute('href'); } modal.showModal(); document.body.classList.add('modal-open'); closeModal.focus(); };
  $$('.project-card__open').forEach((button) => button.addEventListener('click', () => openModal(button.closest('.project-card'))));
  const shutModal = () => { modal.close(); document.body.classList.remove('modal-open'); previousFocus?.focus(); };
  closeModal.addEventListener('click', shutModal); modal.addEventListener('click', (event) => { if (event.target === modal) shutModal(); }); modal.addEventListener('cancel', () => document.body.classList.remove('modal-open'));

  /* Formspree contact form with client-side validation and feedback */
  const form = $('.contact-form'); const message = $('.form-message');
  const setMessage = (text, isError = false) => { message.textContent = text; message.classList.toggle('error', isError); };
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = $$('input, textarea', form).find((field) => !field.checkValidity());
    if (invalid) { setMessage(`Please enter a valid ${invalid.name}.`, true); invalid.focus(); return; }
    const data = new FormData(form);
    const formId = (form.dataset.formId || '').trim();
    if (!formId) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:kwadwoagyei962@gmail.com?subject=${subject}&body=${body}`;
      setMessage('Opening your email app to send the message.');
      return;
    }
    const button = $('button[type="submit"]', form);
    button.disabled = true; button.innerHTML = 'Sending…'; setMessage('');
    try {
      const response = await fetch(formId.startsWith('http') ? formId : `https://formspree.io/f/${formId}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset(); setMessage('Thanks — your message has been sent. I’ll reply soon.');
    } catch { setMessage('Something went wrong. Please email me directly instead.', true); }
    finally { button.disabled = false; button.innerHTML = 'Send message <span>→</span>'; }
  });

})();
