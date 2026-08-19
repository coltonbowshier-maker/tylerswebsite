// Tyler Willis — site interactions

// gate reveal-hidden styles on JS actually running
document.documentElement.classList.add('js');

// ---- nav state ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- scroll reveal ----
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---- lightbox ----
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lb-img');
const zoomables = [...document.querySelectorAll('[data-full]')];
let current = -1;

function openLightbox(i) {
  current = (i + zoomables.length) % zoomables.length;
  const fig = zoomables[current];
  lbImg.src = fig.dataset.full;
  lbImg.alt = fig.querySelector('img')?.alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  current = -1;
}

zoomables.forEach((fig, i) => fig.addEventListener('click', () => openLightbox(i)));
lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); openLightbox(current - 1); });
lightbox.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); openLightbox(current + 1); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target === lbImg) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(current - 1);
  if (e.key === 'ArrowRight') openLightbox(current + 1);
});

// ---- before / after slider ----
document.querySelectorAll('.ba-frame').forEach((frame) => {
  let pos = 50;

  const render = () => {
    frame.style.setProperty('--pos', pos + '%');
    frame.setAttribute('aria-valuenow', Math.round(pos));
    frame.classList.toggle('at-left', pos < 12);
    frame.classList.toggle('at-right', pos > 88);
  };

  const setFromClientX = (x) => {
    const r = frame.getBoundingClientRect();
    pos = Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100));
    render();
  };

  frame.addEventListener('pointerdown', (e) => {
    frame.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  });
  frame.addEventListener('pointermove', (e) => {
    if (e.buttons) setFromClientX(e.clientX);
  });

  frame.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { pos = Math.max(0, pos - 5); render(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { pos = Math.min(100, pos + 5); render(); e.preventDefault(); }
    if (e.key === 'Home') { pos = 0; render(); e.preventDefault(); }
    if (e.key === 'End') { pos = 100; render(); e.preventDefault(); }
  });

  render();
});

// ---- before / after — cinematic crossfade reveal ----
document.querySelectorAll('[data-reveal]').forEach((frame) => {
  const btns = [...frame.querySelectorAll('.rs-btn')];
  let done = false;

  const setState = (state) => {
    frame.classList.toggle('show-before', state === 'before');
    btns.forEach((b) => {
      const on = b.dataset.state === state;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };

  // manual toggle cancels the auto-reveal and wins
  btns.forEach((b) => b.addEventListener('click', () => { done = true; setState(b.dataset.state); }));

  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!motionOK) { setState('after'); return; }

  // arm to "before" while off-screen, then transform to "after" once seen
  setState('before');

  const inView = () => {
    const r = frame.getBoundingClientRect();
    return r.top < window.innerHeight * 0.75 && r.bottom > 0;
  };
  const reveal = () => {
    if (done) return;
    done = true;
    window.removeEventListener('scroll', onScroll);
    if (io) io.disconnect();
    setTimeout(() => setState('after'), 520);
  };
  const onScroll = () => { if (inView()) reveal(); };

  // IntersectionObserver is primary; scroll listener is a fallback for
  // environments that throttle IO (hidden/background tabs)
  let io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) reveal();
    }, { threshold: 0.4 });
    io.observe(frame);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (inView()) reveal();
});

// ---- active section in nav ----
const navLinks = [...document.querySelectorAll('.nav-links a')];
const byHash = Object.fromEntries(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
const sectionIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => a.classList.remove('active'));
      const id = e.target.id === 'manifesto' ? null : e.target.id;
      if (id && byHash[id]) byHash[id].classList.add('active');
    }
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
['manifesto', 'work', 'approach', 'places', 'partners', 'about', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionIO.observe(el);
});

// ---- hero parallax ----
const heroImg = document.querySelector('.hero-img');
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroImg && motionOK) {
  heroImg.addEventListener('animationend', () => { heroImg.style.animation = 'none'; });
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        const max = heroImg.offsetHeight - heroImg.parentElement.offsetHeight;
        heroImg.style.transform = `translateY(${-Math.min(y * 0.12, max)}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}
