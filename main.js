(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionQuery.matches;
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const progress = document.querySelector('[data-progress]');
  const phaseStart = document.querySelector('.phase-rail span:first-child');
  const hero = document.querySelector('.film-hero');
  const chapters = [...document.querySelectorAll('.system-chapter')];
  const materials = document.querySelector('.materials');
  const materialsVisual = document.querySelector('.materials-visual');
  const receipt = document.querySelector('.proof-receipt');
  const receiptTitle = document.querySelector('[data-receipt-title]');
  const receiptDetail = document.querySelector('[data-receipt-detail]');
  const receiptRows = [...document.querySelectorAll('[data-receipt]')];
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  const revealItems = [...document.querySelectorAll(
    '.manifesto h2, .manifesto-copy, .systems-intro h2, .chapter-story h3, .chapter-lede, .chapter-story dl > div, .evidence h2, .evidence-rows a, .materials-copy h2, .materials-copy p, .career-evidence span, .recruiter h2, .role-lines a'
  )];
  revealItems.forEach((item, index) => {
    item.setAttribute('data-reveal', '');
    item.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 45}ms`);
  });

  if (!reduceMotion) root.classList.add('motion-ready');

  const setMenu = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };

  const updateChapter = (chapter) => {
    const distance = Math.max(1, chapter.offsetHeight - window.innerHeight);
    const chapterProgress = clamp((window.scrollY - chapter.offsetTop) / distance);
    chapter.style.setProperty('--chapter-progress', chapterProgress.toFixed(3));
    chapter.style.setProperty('--media-shift', `${((0.5 - chapterProgress) * 18).toFixed(1)}px`);
    chapter.style.setProperty('--media-scale', (1.065 - chapterProgress * 0.045).toFixed(3));
    chapter.style.setProperty('--media-saturation', (0.64 + chapterProgress * 0.36).toFixed(3));
    chapter.style.setProperty('--quality-wipe', `${(chapterProgress * 118 - 18).toFixed(1)}%`);

    if (!chapter.classList.contains('chapter-mrci')) return;
    const stage = chapterProgress < 0.12 ? 0
      : chapterProgress < 0.31 ? 1
        : chapterProgress < 0.5 ? 2
          : chapterProgress < 0.7 ? 3 : 4;
    chapter.dataset.stage = String(stage);
  };

  const updateMotion = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pageProgress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
    progress?.style.setProperty('--progress', `${(pageProgress * 100).toFixed(2)}%`);

    if (phaseStart) {
      const chapter = chapters.find((item) => {
        const rect = item.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.45;
      });
      phaseStart.textContent = chapter?.dataset.chapter || (pageProgress > 0.84 ? '05' : '00');
    }

    if (reduceMotion) return;

    if (hero) {
      const heroProgress = clamp(window.scrollY / Math.max(hero.offsetHeight, 1));
      hero.style.setProperty('--hero-progress', heroProgress.toFixed(3));
      hero.style.setProperty('--hero-copy-y', `${(-24 * heroProgress).toFixed(1)}px`);
      hero.style.setProperty('--hero-copy-opacity', (1 - 0.22 * heroProgress).toFixed(3));
      hero.style.setProperty('--hero-grid-y', `${(18 * heroProgress).toFixed(1)}px`);
      hero.style.setProperty('--orbit-x', `${(20 * heroProgress).toFixed(1)}px`);
      hero.style.setProperty('--orbit-y', `${(-34 * heroProgress).toFixed(1)}px`);
      hero.style.setProperty('--orbit-opacity', (0.78 - 0.28 * heroProgress).toFixed(3));
    }

    chapters.forEach(updateChapter);

    if (materials && materialsVisual) {
      const rect = materials.getBoundingClientRect();
      const materialProgress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      materialsVisual.style.setProperty('--material-progress', materialProgress.toFixed(3));
      materialsVisual.style.setProperty('--layer-one', `${((materialProgress - 0.5) * -34).toFixed(1)}px`);
      materialsVisual.style.setProperty('--layer-two', `${((materialProgress - 0.5) * -14).toFixed(1)}px`);
      materialsVisual.style.setProperty('--layer-three', `${((materialProgress - 0.5) * 14).toFixed(1)}px`);
      materialsVisual.style.setProperty('--layer-four', `${((materialProgress - 0.5) * 34).toFixed(1)}px`);
    }
  };

  let frame = 0;
  const scheduleMotion = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      updateMotion();
    });
  };

  setMenu(false);
  scheduleMotion();
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', scheduleMotion, { passive: true });
  window.addEventListener('resize', scheduleMotion, { passive: true });

  let receiptTimer = 0;
  receiptRows.forEach((row) => {
    const activate = () => {
      const apply = () => {
        if (receiptTitle) receiptTitle.textContent = row.dataset.receipt || '';
        if (receiptDetail) receiptDetail.textContent = row.dataset.detail || '';
      };
      window.clearTimeout(receiptTimer);
      if (reduceMotion || !receipt) {
        apply();
        return;
      }
      receipt.classList.add('is-updating');
      receiptTimer = window.setTimeout(() => {
        apply();
        receipt.classList.remove('is-updating');
      }, 130);
    };
    row.addEventListener('mouseenter', activate);
    row.addEventListener('focus', activate);
  });

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  if (!reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
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
