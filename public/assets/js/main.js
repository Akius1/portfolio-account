/* =============================================
   ANDREW UROM - PORTFOLIO JS
   GSAP + ScrollTrigger animations
   ============================================= */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Loader ────────────────────────────────────
const loader    = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 18 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    loaderFill.style.width = '100%';

    setTimeout(() => {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          initAnimations();
        }
      });
    }, 300);
  }
  loaderFill.style.width = Math.min(progress, 100) + '%';
}, 80);

// ── Custom Cursor ─────────────────────────────
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(cursorFollower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .magnetic, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      cursorFollower.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      cursorFollower.classList.remove('is-hover');
    });
  });
}

// ── Magnetic Buttons ──────────────────────────
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect   = el.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * 0.35;
    const dy     = (e.clientY - cy) * 0.35;
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  });
});

// ── Nav scroll state ──────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ───────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Scroll reveal helper ──────────────────────
// Elements stay fully visible on page load.
// ONLY when they scroll into view does GSAP animate them in.
function onScrollEnter(targets, fromVars, staggerDelay) {
  gsap.utils.toArray(targets).forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.from(el, {
          ...fromVars,
          delay: (staggerDelay || 0) * i,
        });
      }
    });
  });
}

// ── Main Animations ───────────────────────────
function initAnimations() {

  // ── Hero entrance (no ScrollTrigger — fires immediately) ──

  gsap.to('.name-line', {
    y: '0%',
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.12,
    delay: 0.1
  });

  gsap.to('.reveal-up', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.5
  });

  gsap.to('.reveal-right', {
    opacity: 1,
    x: 0,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.7
  });

  // Counter animation
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      delay: 1.2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].val);
      }
    });
  });

  // ── Scroll-triggered section animations ──
  // onScrollEnter fires ONLY when element enters viewport — nothing is
  // pre-hidden on page load, so all sections are always readable.

  onScrollEnter('.section-tag',
    { opacity: 0, x: -20, duration: 0.7, ease: 'power3.out' });

  onScrollEnter('.section-title',
    { opacity: 0, y: 40, duration: 1, ease: 'power3.out' });

  onScrollEnter('.about-lead, .about-body',
    { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out' }, 0.08);

  onScrollEnter('.about-certs',
    { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' });

  onScrollEnter('.about-card',
    { opacity: 0, x: 40, scale: 0.97, duration: 0.9, ease: 'power3.out' });

  onScrollEnter('.skill-category',
    { opacity: 0, y: 36, duration: 0.7, ease: 'power3.out' }, 0.07);

  onScrollEnter('.timeline-item',
    { opacity: 0, x: -28, duration: 0.8, ease: 'power3.out' }, 0.05);

  // GoodAction case study entrance
  ScrollTrigger.create({
    trigger: '.cs-card',
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.from('.cs-card', { opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
      // Stagger screenshots from their natural positions
      gsap.from('.cs-ss-1', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', delay: 0.3 });
      gsap.from('.cs-ss-4', { opacity: 0, y: -30, duration: 0.9, ease: 'power3.out', delay: 0.45 });
      gsap.from('.cs-ss-2', { opacity: 0, x: 40,  duration: 0.9, ease: 'power3.out', delay: 0.55 });
      gsap.from('.cs-ss-3', { opacity: 0, y: 40,  duration: 0.9, ease: 'power3.out', delay: 0.65 });
    }
  });

  // Energy Marketplace entrance
  ScrollTrigger.create({
    trigger: '.cs-card-energy',
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.from('.cs-card-energy', { opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
      gsap.from('.ess-1', { opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', delay: 0.35 });
      gsap.from('.ess-2', { opacity: 0, x: 40, duration: 0.9, ease: 'power3.out', delay: 0.55 });
      gsap.from('.ess-badge-float', { opacity: 0, y: -20, scale: 0.8, duration: 0.7, ease: 'back.out(1.5)', delay: 0.75 });
    }
  });

  // UiLand case study entrance
  ScrollTrigger.create({
    trigger: '.cs-card-uiland',
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.from('.cs-card-uiland', { opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
      gsap.from('.uiland-mockup', { opacity: 0, x: -50, rotateY: 12, duration: 1.1, ease: 'power3.out', delay: 0.3 });
    }
  });

  // Other projects cards
  onScrollEnter('.op-card',
    { opacity: 0, y: 36, duration: 0.8, ease: 'power3.out' }, 0.08);

  onScrollEnter('.contact-title, .contact-sub, .contact-links, .contact-socials',
    { opacity: 0, y: 36, duration: 0.8, ease: 'power3.out' }, 0.1);

  // ── Parallax on hero grid ─────────────────
  gsap.to('.hero-grid', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // ── Active nav highlight ──────────────────
  document.querySelectorAll('section[id]').forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setActiveNav(section.id),
      onEnterBack: () => setActiveNav(section.id),
    });
  });

  ScrollTrigger.refresh();
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--dark)' : '';
  });
}

// ── Screenshot lightbox ───────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cs-ss, .sph, .sph-float').forEach(ss => {
  ss.style.cursor = 'pointer';
  ss.addEventListener('click', () => {
    const img = ss.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

[lightboxClose, lightbox].forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Smooth anchor scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 72 },
      duration: 1.2,
      ease: 'power3.inOut'
    });
  });
});
