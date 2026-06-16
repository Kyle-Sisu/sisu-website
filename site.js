/* SISU SPACE — interactions */
(function () {
  'use strict';

  /* ---- Sticky nav ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector('.hamburger');
  if (burger) {
    burger.addEventListener('click', function () { nav.classList.toggle('menu-open'); });
  }
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('menu-open'); });
  });

  /* ---- Scroll reveal ---- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Packs: public packs vs private sessions ---- */
  var toggleBtns = document.querySelectorAll('.toggle button');
  var panes = document.querySelectorAll('.pack-pane');
  var packsHeadCopy = {
    packs: {
      eyebrow: 'Book a session',
      title: 'Reserve your Sisu.',
      lead: 'Public sessions are 75 minutes of heat, cold, and the vineyard setting, at your own pace. Buy a pack and the per session price drops up to 33%. Credits live on your account and can be shared between two people.'
    },
    member: {
      eyebrow: 'Private bookings',
      title: 'Reserve the space.',
      lead: 'Book the entire sauna and cold plunge just for your group. Ideal for birthdays, celebrations, special occasions, or simply gathering your people in a singular setting at the vineyard.'
    }
  };
  function setHead(mode) {
    var c = packsHeadCopy[mode] || packsHeadCopy.packs;
    var e = document.getElementById('packs-eyebrow');
    var t = document.getElementById('packs-title');
    var l = document.getElementById('packs-lead');
    if (e) e.textContent = c.eyebrow;
    if (t) t.textContent = c.title;
    if (l) l.textContent = c.lead;
  }
  function setMode(mode) {
    toggleBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.mode === mode); });
    panes.forEach(function (p) { p.style.display = p.dataset.mode === mode ? '' : 'none'; });
    setHead(mode);
  }
  toggleBtns.forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.dataset.mode); });
  });
  if (toggleBtns.length) setMode('packs');

  /* ---- Booking ---- */
  var BOOK_URL = 'https://book.sisu-space.com/';
  document.querySelectorAll('[data-book]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(BOOK_URL, '_blank', 'noopener');
    });
  });

  /* ---- Year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
