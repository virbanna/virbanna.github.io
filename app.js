(() => {
  'use strict';

  const portfolio = window.PORTFOLIO;
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const dialog = document.querySelector('.project-dialog');
  const dialogContent = document.querySelector('.dialog-content');
  let previousFocus = null;
  let copyResetTimer = null;

  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

  function setMenu(open) {
    navigation.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });
  const desktopQuery = window.matchMedia('(min-width: 761px)');
  desktopQuery.addEventListener('change', event => { if (event.matches) setMenu(false); });

  const filters = [...document.querySelectorAll('.filter')];
  const projectCards = [...document.querySelectorAll('.project-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    let visibleCount = 0;
    projectCards.forEach(card => {
      const visible = category === 'all' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });
    document.querySelector('.result-count').textContent = `${String(visibleCount).padStart(2, '0')} ${visibleCount === 1 ? 'PROJECT' : 'PROJECTS'}`;
  }));

  function workflowMarkup(project) {
    const steps = project.id === 'stock'
      ? ['Capture stock', 'Keep on device', 'Sync to Sheets']
      : ['Enter amount', 'Add details', 'Send to Sheets'];
    return `<div class="dialog-workflow" aria-label="App workflow">${steps.map((step, index) => `${index ? icon('arrow') : ''}<span>${escapeHTML(step)}</span>`).join('')}</div>`;
  }

  function openProject(id) {
    const project = portfolio?.projects.find(item => item.id === id);
    if (!project) return;
    previousFocus = document.activeElement;
    dialogContent.innerHTML = `
      <p class="dialog-kicker">PROJECT ${escapeHTML(project.number)} / ${escapeHTML(project.categoryLabel.toUpperCase())}</p>
      <h2 id="dialog-title">${escapeHTML(project.title)}</h2>
      <p class="dialog-description">${escapeHTML(project.description)}</p>
      <div class="project-tags">${project.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>
      <div class="dialog-section-grid">
        <section><h3>The problem</h3><p>${escapeHTML(project.problem)}</p></section>
        <section><h3>What I built</h3><p>${escapeHTML(project.approach)}</p></section>
      </div>
      <section class="dialog-feature-section"><h3>Inside the project</h3><ul>${project.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join('')}</ul></section>
      <section class="dialog-result"><h3>The result</h3><p>${escapeHTML(project.outcome)}</p></section>
      ${project.image ? `<figure><img src="${escapeHTML(project.image)}" alt="Original Madhav Ecommerce Sales Power BI dashboard showing sales, profit, category and regional performance" width="1177" height="668"><figcaption>Original report preview · Power BI · demonstration dataset</figcaption></figure>` : workflowMarkup(project)}
      ${project.secondaryImage ? `<figure><img src="${escapeHTML(project.secondaryImage)}" alt="Additional Power BI dashboard preview showing the quarter and state filter controls" width="1163" height="657" loading="lazy"><figcaption>A second view from the project repository.</figcaption></figure>` : ''}
      <p class="dialog-note">${escapeHTML(project.note)}</p>
      <a class="button button-dark dialog-source" href="${escapeHTML(project.repository)}" target="_blank" rel="noopener noreferrer">View project on GitHub ${icon('diagonal')}</a>
    `;
    document.body.classList.add('modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    document.querySelector('.dialog-close').focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open)));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rectangle = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rectangle.left || event.clientX > rectangle.right || event.clientY < rectangle.top || event.clientY > rectangle.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  });

  const copyButton = document.querySelector('.copy-email');
  const copyLabel = copyButton.querySelector('span');
  const copyStatus = document.querySelector('.copy-status');
  copyButton.addEventListener('click', async () => {
    clearTimeout(copyResetTimer);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(portfolio.email);
      copyLabel.textContent = 'Email copied';
      copyStatus.textContent = 'Email address copied to clipboard.';
      copyResetTimer = setTimeout(() => { copyLabel.textContent = 'Copy email address'; }, 2800);
    } catch {
      const emailText = document.querySelector('.contact-row[href^="mailto:"]>span:nth-child(2)');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(emailText);
      selection?.removeAllRanges();
      selection?.addRange(range);
      copyLabel.textContent = 'Email selected — use Copy';
      copyStatus.textContent = 'The email address is selected. Use your device’s copy command to copy it.';
    }
  });

  document.querySelectorAll('svg.icon').forEach(svg => svg.setAttribute('aria-hidden', 'true'));
  document.querySelector('#year').textContent = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date());

  if ('IntersectionObserver' in window) {
    const links = [...navigation.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
})();
