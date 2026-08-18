/* ============================================================
   ASSERT LABS — main.js
   Console run, verdict stamp, counters, reveals, nav, pricing tabs.
   No dependencies. ~120 lines.
   ============================================================ */
(function () {
  'use strict';
  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll progress ---------- */
  var pbar = document.getElementById('pbar');
  addEventListener('scroll', function () {
    var h = document.documentElement;
    var p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
    pbar.style.width = p + '%';
  }, { passive: true });

  /* ---------- mobile nav ---------- */
  var bg = document.getElementById('bg'), mn = document.getElementById('mn');
  bg.addEventListener('click', function () {
    var open = mn.classList.toggle('open');
    bg.setAttribute('aria-expanded', open);
  });
  mn.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mn.classList.remove('open');
      bg.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- active nav link ---------- */
  var links = document.querySelectorAll('.nav__l a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var navIo = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting && map[e.target.id]) {
        links.forEach(function (a) { a.classList.remove('on'); });
        map[e.target.id].classList.add('on');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['test', 'promise', 'numbers', 'growth', 'pricing'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) navIo.observe(el);
  });

  /* ---------- test console + stamp ---------- */
  var L = [
    { s: 'p', t: 'auth.spec.ts',     m: '14 passed  1.2s' },
    { s: 'p', t: 'search.spec.ts',   m: '22 passed  2.1s' },
    { s: 'p', t: 'cart.spec.ts',     m: '11 passed  1.0s' },
    { s: 'f', t: 'checkout.spec.ts', m: '1 failed' },
    { s: 'd', t: '  › expected total 80.00, received 60.00', m: '' },
    { s: 'd', t: '  › discount applied 2× on payment retry', m: '' }
  ];
  var cb = document.getElementById('cb');
  function ic(s) { return s === 'p' ? '✓' : s === 'f' ? '✗' : ' '; }
  function run() {
    cb.innerHTML = '';
    L.forEach(function (l, i) {
      var e = document.createElement('div');
      e.className = 'ln ln--' + l.s;
      e.style.animationDelay = (rm ? 0 : i * 0.26) + 's';
      e.innerHTML = '<span class="ln__i">' + ic(l.s) + '</span><span class="ln__t">' + l.t + '</span>' +
                    (l.m ? '<span class="ln__m">' + l.m + '</span>' : '');
      cb.appendChild(e);
    });
    var st = document.createElement('div');
    st.className = 'stamp';
    st.innerHTML = 'Release: Hold<small>Defects Hunter · QA verdict</small>';
    cb.appendChild(st);
    setTimeout(function () { st.classList.add('show'); }, rm ? 0 : L.length * 260 + 320);
  }
  var started = false;
  new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting && !started) { started = true; run(); } });
  }, { threshold: 0.25 }).observe(document.getElementById('con'));
  document.getElementById('rr').addEventListener('click', run);

  /* ---------- ticker duplicate ---------- */
  var tk = document.getElementById('tk');
  tk.appendChild(tk.firstElementChild.cloneNode(true));

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.rv,.rv-kids').forEach(function (el) { io.observe(el); });

  /* ---------- KPI count-up ---------- */
  function count(el) {
    var end = +el.dataset.n, dur = 900, t0 = null;
    if (rm || end === 0) { el.textContent = end; return; }
    function tick(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var kpiIo = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-n]').forEach(count);
        kpiIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  kpiIo.observe(document.getElementById('score'));

  /* ---------- pricing tabs ---------- */
  var tabs = document.querySelectorAll('.tog button');
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      document.querySelectorAll('[data-p]').forEach(function (p) {
        p.hidden = p.dataset.p !== b.dataset.t;
      });
    });
  });

  /* ---------- FAQ: one open ---------- */
  var qs = document.querySelectorAll('.q');
  qs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) qs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- form → Netlify Forms (AJAX, stays on page) ---------- */
  document.getElementById('fm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target, f = document.getElementById('fn');
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (r) {
      if (!r.ok) throw 0;
      form.reset();
      f.textContent = 'Sent. We\'ll reply within one working day.';
      f.style.color = '#12B76A';
    }).catch(function () {
      f.textContent = 'Could not send — email us directly: hello@defectshunter.com';
      f.style.color = '#FFB224';
    }).finally(function () { btn.disabled = false; });
  });
})();
