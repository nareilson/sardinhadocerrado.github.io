// ── Header scroll: IntersectionObserver no lugar do scroll listener (sem jank) ──
const header = document.querySelector('.site-header');

const sentinel = document.createElement('div');
sentinel.style.cssText = 'position:absolute;top:80px;height:1px;width:1px;pointer-events:none;';
document.body.prepend(sentinel);

new IntersectionObserver(
  ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
  { threshold: 0 }
).observe(sentinel);

// ── Menu mobile ──
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// ── Animações de entrada por seção (sem scroll listener) ──
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.animate-section').forEach((el) => sectionObserver.observe(el));

// ── Timeline accordion ──
document.querySelectorAll('.timeline-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const card = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // fecha todos
    document.querySelectorAll('.timeline-trigger').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling.hidden = true;
    });

    // abre o clicado (se estava fechado)
    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      card.hidden = false;
    }
  });
});

// ── Cards de equipe — flip 3D ──
document.querySelectorAll('.member-card').forEach((card) => {
  const flip = () => card.classList.toggle('is-flipped');
  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });
});

// ── Badges e certificações da seção Produção ──
const factoryDetail      = document.querySelector('.factory-detail');
const factoryDetailTitle = factoryDetail?.querySelector('.factory-detail-title');
const factoryDetailDesc  = factoryDetail?.querySelector('.factory-detail-desc');

document.querySelectorAll('[data-factory-title]').forEach((el) => {
  el.addEventListener('click', () => {
    const isActive = el.classList.contains('is-active');

    document.querySelectorAll('[data-factory-title]').forEach((e) => e.classList.remove('is-active'));
    factoryDetail.hidden = true;

    if (!isActive) {
      el.classList.add('is-active');
      factoryDetailTitle.textContent = el.dataset.factoryTitle;
      factoryDetailDesc.textContent  = el.dataset.factoryDesc;
      factoryDetail.hidden = false;
    }
  });
});

// ── Value tags (Sobre nós) ──
const valueCard      = document.querySelector('.value-card');
const valueCardTitle = valueCard?.querySelector('.value-card-title');
const valueCardDesc  = valueCard?.querySelector('.value-card-desc');

document.querySelectorAll('.value-tag').forEach((tag) => {
  tag.addEventListener('click', () => {
    const isActive = tag.classList.contains('is-active');

    // reseta todos
    document.querySelectorAll('.value-tag').forEach((t) => t.classList.remove('is-active'));
    valueCard.hidden = true;

    if (!isActive) {
      tag.classList.add('is-active');
      valueCardTitle.textContent = tag.dataset.title;
      valueCardDesc.textContent  = tag.dataset.desc;
      valueCard.hidden = false;
    }
  });
});

// ── Formulário (demo) ──
document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Formulário demonstrativo. Conecte este envio ao canal oficial do projeto.');
});
