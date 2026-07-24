(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const progress = document.querySelector('[data-progress]');
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const receiptTitle = document.querySelector('[data-receipt-title]');
  const receiptDetail = document.querySelector('[data-receipt-detail]');
  const receiptRows = [...document.querySelectorAll('[data-receipt]')];

  const setMenu = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };

  const updatePageState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    progress.style.setProperty('--progress', `${percent}%`);
  };

  setMenu(false);
  updatePageState();
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', updatePageState, { passive: true });

  receiptRows.forEach((row) => {
    const activate = () => {
      if (receiptTitle) receiptTitle.textContent = row.dataset.receipt || '';
      if (receiptDetail) receiptDetail.textContent = row.dataset.detail || '';
    };
    row.addEventListener('mouseenter', activate);
    row.addEventListener('focus', activate);
  });

  if (!('IntersectionObserver' in window)) return;

  if (!reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = navLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter(({ section }) => section);
  const navObserver = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    sections.forEach(({ link, section }) => link.classList.toggle('is-active', section === active.target));
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
  sections.forEach(({ section }) => navObserver.observe(section));
})();
