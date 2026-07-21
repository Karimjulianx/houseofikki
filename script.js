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

/* ─── BREVO EMBEDDED FORM ───────────────────────────────────── */
const form     = document.getElementById('sib-form');
const emailIn  = document.getElementById('EMAIL');
const success  = document.getElementById('notifySuccess');
const errorMsg = document.getElementById('notifyError');
const note     = document.getElementById('notifyNote');
const btn      = document.getElementById('notifyBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailIn.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailIn.style.borderColor = '#e39a8a';
    emailIn.focus();
    setTimeout(() => { emailIn.style.borderColor = ''; }, 800);
    return;
  }
  btn.textContent = '...';
  btn.disabled = true;
  emailIn.disabled = true;
  errorMsg.style.display = 'none';

  try {
    const data = new FormData(form);
    await fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    note.style.display = 'none';
    success.style.display = 'block';
    btn.textContent = '✓';
  } catch (err) {
    note.style.display = 'none';
    success.style.display = 'block';
    btn.textContent = '✓';
  }
});
