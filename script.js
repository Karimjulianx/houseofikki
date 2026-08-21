/* ─── Smooth anchor scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Header: border-on-scroll ─────────────────────────────── */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ─── Mobile nav toggle ─────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('nav-open'));
});

/* ─── Scroll reveal ─────────────────────────────────────────── */
const revealTargets = Array.from(document.querySelectorAll('.reveal'));

const isInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
};

let sweepTimer;
const sweep = () => {
  let remaining = false;
  revealTargets.forEach((el) => {
    if (el.classList.contains('is-visible')) return;
    if (isInView(el)) {
      el.classList.add('is-visible');
    } else {
      remaining = true;
    }
  });
  if (!remaining && sweepTimer) clearInterval(sweepTimer);
};

window.addEventListener('scroll', sweep, { passive: true });
window.addEventListener('resize', sweep);
sweep();
// Safety net: covers browsers/embeds where scroll events are throttled
// or suppressed (e.g. backgrounded tabs) so content never gets stuck hidden.
sweepTimer = setInterval(sweep, 300);
