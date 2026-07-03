/* ============================================================
   SECTION VIEW — full list page per panel, opened via "View all"
============================================================ */
const SECTIONS = {
  stories: {title:'Top Stories', noun:'stories', description:'The week’s highest-signal AI stories, expanded with source context for a slower read.', icon:`<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    items: () => weeklySignals, listClass:'section-list-stories', meta: items => [`${items.length} stories`, `${items.reduce((n, s) => n + (s.sources?.length || 0), 0)} sources`], row: (s, i) => `
      <a class="p-story section-item section-story-card" href="${s.sources[0].url}" target="_blank" rel="noopener" aria-label="${s.title}">
        <div class="p-story-thumb">${imageThumb(s.image,s.kind)}</div>
        <div class="section-item-body">
          <div class="section-item-kicker">Story ${String(i + 1).padStart(2,'0')}</div>
          <h4 class="p-story-title">${s.title}</h4>
          <p class="p-story-desc">${s.desc}</p>
          <div class="section-item-footer">${sourceChips(s.sources)}<span class="section-link-cue">Open source →</span></div>
        </div>
      </a>`},
  tools: {title:'Tools & Repos', noun:'tools', description:'Projects and launches worth opening, trying, or bookmarking from this week’s builder feed.', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="8 5 2 12 8 19"/><polyline points="16 5 22 12 16 19"/></svg>`,
    items: () => weeklyTools, listClass:'section-list-tools grid-2', meta: items => [`${items.length} tools`, `${items.filter(t => t.stars).length} with stars`], row: (t, i) => `
      <a class="p-tool section-item section-tool-card" href="${t.url}" target="_blank" rel="noopener" aria-label="${t.name}">
        <div class="p-tool-thumb">${imageThumb(t.image,'mcp')}</div>
        <div class="section-item-body">
          <div class="section-item-kicker">Tool ${String(i + 1).padStart(2,'0')}</div>
          <p class="p-tool-name">${t.name}</p>
          <p class="p-tool-desc">${t.desc}</p>
          ${(t.stars || t.forks) ? `<div class="tool-stats-row section-stat-row">${t.stars ? `<span>★ ${t.stars}</span>` : ''}${t.forks ? `<span>⑂ ${t.forks}</span>` : ''}</div>` : ''}
          <div class="section-item-footer"><div class="tag-row">${t.tags.map(tg=>`<span class="tag">${tg}</span>`).join('')}</div><span class="section-link-cue">Open repo →</span></div>
        </div>
      </a>`},
  reads: {title:'Blogs', noun:'reads', description:'Longer reads and technical notes that explain what changed, not just what shipped.', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    items: () => weeklyBlogs, listClass:'section-list-blogs', meta: items => [`${items.length} reads`, `${items.filter(b => b.read).length} read times`], row: b => `
      <a class="p-blog section-item section-blog-card" href="${b.url}" target="_blank" rel="noopener" aria-label="${b.title}">
        <div class="p-blog-thumb">${imageThumb(b.image,'gpt')}</div>
        <div class="section-item-body">
          <p class="p-blog-title">${b.title}</p>
          ${b.desc ? `<p class="p-blog-desc">${b.desc}</p>` : ''}
          <div class="section-item-footer"><p class="p-blog-meta">${b.meta} · <time>${b.date}</time></p><span class="tag">${b.read}</span><span class="section-link-cue">Read →</span></div>
        </div>
      </a>`},
  rounds: {title:'Funding & Launches', noun:'updates', description:'Funding rounds, launches, and company movements that may shape the builder market.', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    items: () => weeklyFunding, listClass:'section-list-funding', meta: items => [`${items.length} updates`, `${items.filter(f => f.amount).length} amounts`], row: f => `
      <a class="p-fund-row section-item section-fund-card" href="${f.url}" target="_blank" rel="noopener" aria-label="${f.name}">
        <div class="p-fund-thumb">${imageThumb(f.image,'perp')}</div>
        <div class="section-item-body">
          <span class="p-fund-name">${f.name}</span>
          <span class="p-fund-desc">${f.desc}</span>
          <div class="section-item-footer"><div class="section-fund-meta"><span class="stage-pill">${f.stage}</span><span class="p-fund-amt">${f.amount}</span></div><span class="section-link-cue">Open update →</span></div>
        </div>
      </a>`},
  events: {title:'Radar', noun:'items', description:'Events, meetups, and community signals to keep on the calendar.', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
    items: () => weeklyRadar, listClass:'section-list-radar grid-2', meta: items => [`${items.length} radar items`, `${new Set(items.map(r => r.loc).filter(Boolean)).size} places`], row: r => `
      <a class="p-radar-item section-item section-radar-card" href="${r.url}" target="_blank" rel="noopener" aria-label="${r.title}">
        <div class="p-radar-thumb">${imageThumb(r.image,r.kind)}</div>
        <div class="section-item-body">
          <p class="p-radar-title">${r.title}</p>
          <div class="p-radar-meta"><span>${ICONS.pin} ${r.loc}</span><span>${ICONS.cal} <time>${r.date}</time>, ${r.time}</span></div>
          <div class="section-item-footer"><span class="section-link-cue">Open event →</span></div>
        </div>
      </a>`}
};

let lastView = 'weekly';
let activeView = initialView;
let sectionReturnFocus = null;

function readRoute(){
  const raw = window.location.hash.replace(/^#/, '').replace(/^\//, '');
  if(!raw) return { view: null, section: null };
  const [view, section] = raw.split('/');
  if(!availableViews.includes(view)) return { view: null, section: null };
  if(section && view === 'weekly' && SECTIONS[section]) return { view, section };
  return { view, section: null };
}

function syncRoute(view, section){
  const hash = section ? `#${view}/${section}` : `#${view}`;
  window.history.replaceState({ view, section }, '', `${window.location.pathname}${window.location.search}${hash}`);
}

function sectionCountLabel(section, count){
  const noun = count === 1 ? (section.singular || section.noun.replace(/s$/, '')) : section.noun;
  return `${count} ${noun} this week`;
}

function renderSectionMeta(section, items){
  const chips = section.meta ? section.meta(items) : [sectionCountLabel(section, items.length)];
  return chips.filter(Boolean).map(label => `<span class="section-meta-pill">${label}</span>`).join('');
}

function renderSectionNav(activeKey){
  return Object.entries(SECTIONS).map(([key, section]) => `
    <button type="button" class="section-nav-button ${key === activeKey ? 'active' : ''}" onclick="openSection('${key}')" aria-current="${key === activeKey ? 'page' : 'false'}">
      <span class="section-nav-icon">${section.icon}</span>${section.title}
    </button>
  `).join('');
}

function openSection(key, options = {}){
  const { sync = true, focus = true } = options;
  const s = SECTIONS[key];
  if(!s) return;
  const items = s.items();
  document.getElementById('sectionIcon').innerHTML = s.icon;
  document.getElementById('sectionTitle').textContent = s.title;
  document.getElementById('sectionCount').textContent = sectionCountLabel(s, items.length);
  document.getElementById('sectionSubtitle').textContent = s.description;
  document.getElementById('sectionMeta').innerHTML = renderSectionMeta(s, items);
  document.getElementById('sectionNav').innerHTML = renderSectionNav(key);
  document.getElementById('sectionContent').innerHTML = `<div class="section-list section-list-full ${s.listClass}">${items.length ? items.map(s.row).join('') : emptyState(s.title.toLowerCase())}</div>`;
  document.getElementById('view-section').querySelectorAll('svg').forEach(svg => svg.setAttribute('aria-hidden', 'true'));
  sectionReturnFocus = focus ? document.activeElement : sectionReturnFocus;
  lastView = 'weekly';
  activeView = 'weekly';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-section').classList.add('active');
  updateChrome('weekly', key);
  if(sync) syncRoute('weekly', key);
  window.scrollTo({top:0, behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  if(focus) document.querySelector('.section-back').focus({ preventScroll: true });
}

function closeSection(options = {}){
  const { sync = true } = options;
  document.getElementById('view-section').classList.remove('active');
  document.getElementById(`view-${lastView}`).classList.add('active');
  activeView = lastView;
  updateChrome(lastView);
  if(sync) syncRoute(lastView);
  window.scrollTo({top:0, behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  if(sectionReturnFocus && typeof sectionReturnFocus.focus === 'function'){
    sectionReturnFocus.focus({ preventScroll: true });
  }
}

/* ---- Swipe vs tap detection for carousels ----
   Horizontal swipes should scroll the row, not open the anchor that was
   under the release point. */
document.querySelectorAll('.carousel').forEach(carousel => {
  let startX = 0, startY = 0, swiping = false;

  carousel.addEventListener('touchstart', e => {
    if(e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    swiping = false;
  }, { passive: true });

  carousel.addEventListener('touchmove', e => {
    if(swiping) return;
    const t = e.touches[0];
    const dx = Math.abs(t.clientX - startX);
    const dy = Math.abs(t.clientY - startY);
    if(dx > 10 && dx > dy * 1.5) swiping = true;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    if(!swiping || e.changedTouches.length === 0) return;
    const t = e.changedTouches[0];
    const el = document.elementFromPoint(t.clientX, t.clientY)?.closest('a');
    if(el){
      el.dataset.justSwiped = '1';
      setTimeout(() => { delete el.dataset.justSwiped; }, 600);
    }
  }, { passive: true });
});

document.addEventListener('click', e => {
  const swiped = e.target.closest('[data-just-swiped]');
  if(!swiped) return;
  e.preventDefault();
  e.stopPropagation();
});

function editionMeta(edition){
  const date = edition.masthead.date;
  const weekday = edition.masthead.weekday;
  return weekday ? `${weekday} · ${date}` : date;
}

function updateChrome(view, section){
  const edition = view === 'weekly' ? weeklyEdition : dailyEdition;
  const footerBits = document.querySelectorAll('.site-footer-inner > div');
  const meta = view === 'home'
    ? `Latest · ${escapeHtml(editionMeta(dailyEdition))}`
    : view === 'weekly'
      ? `Edition #${escapeHtml(weeklyEdition.masthead.edition_number)} · ${escapeHtml(weeklyEdition.masthead.date)}`
      : escapeHtml(editionMeta(dailyEdition));

  const newsletterName = edition.masthead.newsletter_name || 'Ekloge';
  document.title = section
    ? `${newsletterName} — ${SECTIONS[section].title}`
    : view === 'home'
      ? `${newsletterName} — Only What Matters`
      : `${newsletterName} — ${edition.masthead.date}`;
  document.getElementById('topbarMeta').innerHTML = `<span><span class="dot-live"></span>${meta}</span>`;
  document.querySelector('.skip-link').setAttribute('href', section ? '#view-section' : `#view-${view}`);
  footerBits[0].innerHTML = `<svg class="footer-heart" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>${escapeHtml(edition.footer.share_text)}`;
  footerBits[1].innerHTML = `Email editions are sent only to subscribers. <a href="#home" onclick="scrollToSubscribeForm()">Subscribe now</a>`;
}

function renderHome(){
  const hasWeekly = availableViews.includes('weekly');
  document.getElementById('homeLede').textContent = dailyEdition.hero.subtitle || 'The latest AI signal, sorted for builders.';
  document.getElementById('homeDailyTitle').textContent = dailyEdition.masthead.date || activeDailyDate;
  document.getElementById('homeDailyMeta').textContent = `${signals.length + tools.length + blogs.length + funding.length + radar.length} curated items across 5 sections.`;
  document.querySelector('.home-secondary').hidden = !hasWeekly;
  document.querySelector('.home-weekly-panel').hidden = !hasWeekly;
  if(hasWeekly){
    document.getElementById('homeWeeklyTitle').textContent = weeklyEdition.masthead.date || 'Weekly rollup';
    document.getElementById('homeWeeklyMeta').textContent = `${weeklySignals.length + weeklyTools.length + weeklyBlogs.length + weeklyFunding.length + weeklyRadar.length} weekly items selected for a slower read.`;
  }
  document.getElementById('homeArchiveList').innerHTML = dailyEditions.slice(0, 10).map(item => `
    <button type="button" class="${item.date === activeDailyDate ? 'active' : ''}" onclick="setDailyDate('${escapeHtml(item.date)}')">${escapeHtml(item.date)}</button>
  `).join('');
}

function hydrateArchivePicker(){
  const select = document.getElementById('archiveSelect');
  const dailyOptions = currentWeekDailyEditions().map(item => `<option value="daily:${escapeHtml(item.date)}">${escapeHtml(item.date)}</option>`).join('');
  const weeklyOptions = recentWeeklyEditions().map(item => {
    const editionNumber = item.edition?.masthead?.edition_number || item.date;
    return `<option value="weekly:${escapeHtml(item.date)}">Edition #${escapeHtml(editionNumber)}</option>`;
  }).join('');
  select.innerHTML = `<option value="">Archive</option>${dailyOptions}${weeklyOptions}`;
  select.value = '';
  if(!select.dataset.bound){
    select.addEventListener('change', () => {
      if(!select.value) return;
      const [kind, date] = select.value.split(':');
      if(kind === 'weekly') setWeeklyDate(date);
      if(kind === 'daily') setDailyDate(date);
      select.value = '';
    });
    select.dataset.bound = 'true';
  }
}

function hydrateChrome(){
  document.querySelectorAll('.view-toggle button').forEach(button => {
    const isAvailable = availableViews.includes(button.dataset.view);
    button.hidden = !isAvailable;
  });
  document.getElementById('viewToggle').classList.toggle('two-options', availableViews.length === 2);
  if(availableViews.length < 2){
    document.getElementById('viewToggle').style.display = 'none';
  }
  hydrateArchivePicker();

  document.querySelector('[data-section="signals"] .count-pill').textContent = `${signals.length} today`;
  document.querySelector('[data-section="tools"] .count-pill').textContent = `${tools.length} today`;
  document.querySelector('[data-section="blogs"] .count-pill').textContent = `${blogs.length} today`;
  document.querySelector('[data-section="funding"] .count-pill').textContent = `${funding.length} today`;
  document.querySelector('[data-section="radar"] .count-pill').textContent = `${radar.length} today`;

  document.querySelector('.daily-hero .eyebrow').innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${escapeHtml(dailyEdition.masthead.weekday)} digest · ${signals.length + tools.length + blogs.length + funding.length + radar.length} items`;
  document.querySelector('.daily-hero p').textContent = dailyEdition.hero.subtitle;

  const weeklyTotal = weeklySignals.length + weeklyTools.length + weeklyBlogs.length + weeklyFunding.length + weeklyRadar.length;
  if(availableViews.includes('weekly')){
    document.querySelector('.weekly-hero .eyebrow').innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>Edition #${escapeHtml(weeklyEdition.masthead.edition_number)} · ${escapeHtml(weeklyEdition.masthead.date)}`;
    document.querySelector('.weekly-hero p').textContent = weeklyEdition.hero.subtitle;
    document.querySelectorAll('.weekly-stat .num')[0].textContent = weeklyTotal;
    document.querySelectorAll('.weekly-stat .num')[1].textContent = '5';
    document.querySelectorAll('.weekly-stat .num')[2].textContent = weeklyRadar.length;
    document.querySelectorAll('.weekly-stat .lbl')[0].textContent = 'Items curated';
    document.querySelectorAll('.weekly-stat .lbl')[1].textContent = 'Sections';
    document.querySelectorAll('.weekly-stat .lbl')[2].textContent = 'Events near you';
  }
}
