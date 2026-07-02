(function () {
  'use strict';

  /* ── Scroll reveal for card ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    els.forEach(el => io.observe(el));
  }

  /* ── Stagger timing rows ── */
  function initTimingStagger() {
    const rows = document.querySelectorAll('.timing-row');
    rows.forEach((r, i) => {
      r.style.opacity = '0';
      r.style.transform = 'translateX(-20px)';
      r.style.transition = `opacity 0.55s ease ${0.15 + i * 0.18}s, transform 0.55s ease ${0.15 + i * 0.18}s`;
    });
    const block = document.querySelector('.timing-block');
    if (!block) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          rows.forEach(r => { r.style.opacity = '1'; r.style.transform = 'translateX(0)'; });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    io.observe(block);
  }

  /* ── Subtle bg parallax ── */
  // function initParallax() {
  //   const bg = document.querySelector('.page-bg');
  //   if (!bg) return;
  //   let tick = false;
  //   window.addEventListener('scroll', () => {
  //     if (!tick) {
  //       requestAnimationFrame(() => {
  //         bg.style.transform = `scale(1.04) translateY(${window.scrollY * -0.15}px)`;
  //         tick = false;
  //       });
  //       tick = true;
  //     }
  //   }, { passive: true });
  // }

  /* ── Countdown under date ── */
  function initCountdown() {
    const dateEl = document.querySelector('.wedding-date');
    if (!dateEl) return;
    const target = new Date('2026-09-26');
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const days = Math.ceil((target - now) / 86400000);
    if (days <= 0) return;
    const forms = ['день', 'дня', 'дней'];
    const mod10 = days % 10, mod100 = days % 100;
    const form = mod10 === 1 && mod100 !== 11 ? forms[0]
      : [2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100) ? forms[1]
        : forms[2];
    const sub = document.createElement('p');
    Object.assign(sub.style, {
      fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: '300',
      letterSpacing: '0.14em', color: '#7a5c5c', textAlign: 'center',
      textTransform: 'uppercase', marginTop: '6px', paddingBottom: '2px'
    });
    sub.textContent = `осталось ${days} ${form}`;
    dateEl.insertAdjacentElement('afterend', sub);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initTimingStagger();
    initParallax();
    initCountdown();
  });
})();
