/* ============================================================
   SECTION VIEW — full list page per panel, opened via "View all"
============================================================ */
const SECTIONS = {
  stories: {title:'Top Stories', icon:`<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    items: () => weeklySignals, listClass:'', row: s => `
      <a class="p-story" href="${s.sources[0].url}" target="_blank" rel="noopener" aria-label="${s.title}">
        <div class="p-story-thumb">${imageThumb(s.image,s.kind)}</div>
        <div style="min-width:0; flex:1;">
          <h4 class="p-story-title">${s.title}</h4>
          <p class="p-story-desc">${s.desc}</p>
          ${sourceChips(s.sources)}
        </div>
      </a>`},
  tools: {title:'Tools & Repos', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="8 5 2 12 8 19"/><polyline points="16 5 22 12 16 19"/></svg>`,
    items: () => weeklyTools, listClass:'', row: t => `
      <a class="p-tool" href="${t.url}" target="_blank" rel="noopener" aria-label="${t.name}">
        <div class="p-tool-thumb">${imageThumb(t.image,'mcp')}</div>
        <div style="min-width:0;">
          <p class="p-tool-name">${t.name}</p>
          <p class="p-tool-desc">${t.desc}</p>
          ${(t.stars || t.forks) ? `<div class="tool-stats-row">${t.stars ? `<span>★ ${t.stars}</span>` : ''}${t.forks ? `<span>⑂ ${t.forks}</span>` : ''}</div>` : ''}
          <div class="tag-row">${t.tags.map(tg=>`<span class="tag">${tg}</span>`).join('')}</div>
        </div>
      </a>`},
  reads: {title:'Blogs', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    items: () => weeklyBlogs, listClass:'', row: b => `
      <a class="p-blog" href="${b.url}" target="_blank" rel="noopener" aria-label="${b.title}">
        <div class="p-blog-thumb">${imageThumb(b.image,'gpt')}</div>
        <div style="min-width:0; flex:1;">
          <p class="p-blog-title">${b.title}</p>
          ${b.desc ? `<p class="p-blog-desc">${b.desc}</p>` : ''}
          <p class="p-blog-meta">${b.meta} · ${b.date}</p>
        </div>
        <span class="tag">${b.read}</span>
      </a>`},
  rounds: {title:'Funding & Launches', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    items: () => weeklyFunding, listClass:'', row: f => `
      <a class="p-fund-row" href="${f.url}" target="_blank" rel="noopener" aria-label="${f.name}">
        <div class="p-fund-thumb">${imageThumb(f.image,'perp')}</div>
        <div style="min-width:0; flex:1;">
          <span class="p-fund-name">${f.name}</span>
          <span class="p-fund-desc">${f.desc}</span>
        </div>
        <div class="p-fund-right">
          <span class="stage-pill">${f.stage}</span>
          <span class="p-fund-amt">${f.amount}</span>
        </div>
      </a>`},
  events: {title:'Radar', icon:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
    items: () => weeklyRadar, listClass:'', row: r => `
      <a class="p-radar-item" href="${r.url}" target="_blank" rel="noopener" aria-label="${r.title}">
        <div class="p-radar-thumb">${imageThumb(r.image,r.kind)}</div>
        <div style="min-width:0;">
          <p class="p-radar-title">${r.title}</p>
          <div class="p-radar-meta"><span>${ICONS.pin} ${r.loc}</span><span>${ICONS.cal} ${r.date}, ${r.time}</span></div>
        </div>
      </a>`}
};

let lastView = 'weekly';
let activeView = initialView;
let sectionReturnFocus = null;

function readRoute(){
  return { view: null, section: null };
}

function syncRoute(view, section){
  window.history.replaceState({ view, section }, '', window.location.pathname + window.location.hash);
}

function openSection(key, options = {}){
  const { sync = true, focus = true } = options;
  const s = SECTIONS[key];
  if(!s) return;
  const items = s.items();
  document.getElementById('sectionIcon').innerHTML = s.icon;
  document.getElementById('sectionTitle').textContent = s.title;
  document.getElementById('sectionCount').textContent = `${items.length} this week`;
  document.getElementById('sectionContent').innerHTML = `<div class="section-list ${s.listClass}">${items.length ? items.map(s.row).join('') : emptyState(s.title.toLowerCase())}</div>`;
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
  footerBits[0].innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C2562F" stroke-width="2" style="vertical-align:-2px; margin-right:6px;"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>${escapeHtml(edition.footer.share_text)}`;
  footerBits[1].textContent = 'Email editions are sent only to subscribers.';
}

function renderHome(){
  document.getElementById('homeLede').textContent = dailyEdition.hero.subtitle || 'The latest AI signal, sorted for builders.';
  document.getElementById('homeDailyTitle').textContent = dailyEdition.masthead.date || activeDailyDate;
  document.getElementById('homeDailyMeta').textContent = `${signals.length + tools.length + blogs.length + funding.length + radar.length} curated items across 5 sections.`;
  document.getElementById('homeWeeklyTitle').textContent = weeklyEdition.masthead.date || 'Weekly rollup';
  document.getElementById('homeWeeklyMeta').textContent = `${weeklySignals.length + weeklyTools.length + weeklyBlogs.length + weeklyFunding.length + weeklyRadar.length} weekly items selected for a slower read.`;
  document.getElementById('homeArchiveList').innerHTML = dailyEditions.slice(0, 10).map(item => `
    <button type="button" class="${item.date === activeDailyDate ? 'active' : ''}" onclick="setDailyDate('${escapeHtml(item.date)}')">${escapeHtml(item.date)}</button>
  `).join('');
}

function hydrateArchivePicker(){
  const select = document.getElementById('archiveSelect');
  select.innerHTML = dailyEditions.map(item => `<option value="${escapeHtml(item.date)}">${escapeHtml(item.date)}</option>`).join('');
  select.value = activeDailyDate;
  if(!select.dataset.bound){
    select.addEventListener('change', () => setDailyDate(select.value));
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
  document.querySelector('.weekly-hero .eyebrow').innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>Edition #${escapeHtml(weeklyEdition.masthead.edition_number)} · ${escapeHtml(weeklyEdition.masthead.date)}`;
  document.querySelector('.weekly-hero p').textContent = weeklyEdition.hero.subtitle;
  document.querySelectorAll('.weekly-stat .num')[0].textContent = weeklyTotal;
  document.querySelectorAll('.weekly-stat .num')[1].textContent = '5';
  document.querySelectorAll('.weekly-stat .num')[2].textContent = weeklyRadar.length;
  document.querySelectorAll('.weekly-stat .lbl')[0].textContent = 'Items curated';
  document.querySelectorAll('.weekly-stat .lbl')[1].textContent = 'Sections';
  document.querySelectorAll('.weekly-stat .lbl')[2].textContent = 'Events near you';
}
