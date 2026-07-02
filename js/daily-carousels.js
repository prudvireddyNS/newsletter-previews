/* ============================================================
   RENDER: DAILY CAROUSELS
============================================================ */
function imageThumb(url, fallbackKind){
  return url ? `<img src="${url}" alt="" width="680" height="300" loading="lazy" decoding="async" referrerpolicy="no-referrer">` : thumbSVG(fallbackKind);
}

function smallToolImage(url, fallbackText){
  return url ? `<img src="${url}" alt="" width="80" height="80" loading="lazy" decoding="async" referrerpolicy="no-referrer">` : fallbackText;
}

function sourceChips(sources){
  return `<div class="sources">${sources.map(s=>`<span class="source-chip" aria-label="Source: ${s.label}">${ICONS.link}${s.label}</span>`).join('')}</div>`;
}

function emptyState(label){
  return `<div class="empty-state" role="status">No ${label} in this edition.</div>`;
}

function setCarouselCount(id, count){
  document.getElementById(id).dataset.cardCount = count;
}

function setupCarouselControls(id){
  const el = document.getElementById(id);
  const controls = document.querySelectorAll(`button[aria-controls="${id}"]`);
  if(!el || controls.length < 2) return;
  const parent = controls[0].parentElement;
  let progress = parent.querySelector('.carousel-progress');
  if(!progress){
    progress = document.createElement('span');
    progress.className = 'carousel-progress';
    parent.appendChild(progress);
  }
  if(!el.dataset.controlsBound){
    el.addEventListener('scroll', () => updateCarouselControls(id), { passive: true });
    window.addEventListener('resize', () => updateCarouselControls(id));
    el.dataset.controlsBound = 'true';
  }
  updateCarouselControls(id);
}

function updateCarouselControls(id){
  const el = document.getElementById(id);
  const controls = document.querySelectorAll(`button[aria-controls="${id}"]`);
  if(!el || controls.length < 2) return;
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  const canScroll = maxScroll > 2;
  controls[0].disabled = !canScroll || el.scrollLeft <= 2;
  controls[1].disabled = !canScroll || el.scrollLeft >= maxScroll - 2;
  const progress = controls[0].parentElement.querySelector('.carousel-progress');
  if(progress){
    const total = canScroll ? Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)) : 1;
    const current = canScroll ? Math.min(total, Math.floor(el.scrollLeft / el.clientWidth) + 1) : 1;
    progress.textContent = `${current}/${total}`;
  }
}

function renderCarousel(id, items, label, renderItem){
  setCarouselCount(id, items.length);
  document.getElementById(id).innerHTML = items.length ? items.map(renderItem).join('') : emptyState(label);
  requestAnimationFrame(() => setupCarouselControls(id));
}

function renderSignals(){
  renderCarousel('c-signals', signals, 'top signals', s=>`
    <a class="card" href="${s.sources[0].url}" target="_blank" rel="noopener" aria-label="${s.title}">
      <div class="card-thumb">${imageThumb(s.image,s.kind)}</div>
      <div class="card-body">
        <h3 class="card-title">${s.title}</h3>
        <p class="card-desc">${s.desc}</p>
        ${sourceChips(s.sources)}
      </div>
    </a>`);
}

function renderTools(){
  renderCarousel('c-tools', tools, 'tools or repos', t=>`
    <a class="card card-tool" href="${t.url}" target="_blank" rel="noopener" aria-label="${t.name}">
      <div class="card-body">
        <div class="tool-head">
          <div class="tool-icon">${smallToolImage(t.image, t.icon)}</div>
          <div style="min-width:0;">
            <h3 class="card-title" style="font-size:14.5px;">${t.name}</h3>
          </div>
        </div>
        <p class="card-desc">${t.desc}</p>
        ${(t.stars || t.forks) ? `<div class="tool-stats-row">${t.stars ? `<span>★ ${t.stars}</span>` : ''}${t.forks ? `<span>⑂ ${t.forks}</span>` : ''}</div>` : ''}
        <div class="tag-row">${t.tags.map(tg=>`<span class="tag">${tg}</span>`).join('')}</div>
        <div class="card-foot"><span class="go-link">Open repo ${ICONS.link}</span></div>
      </div>
    </a>`);
}

function renderBlogs(){
  renderCarousel('c-blogs', blogs, 'fresh reads', b=>`
    <a class="card card-blog" href="${b.url}" target="_blank" rel="noopener" aria-label="${b.title}">
      <div class="card-thumb">${imageThumb(b.image,'gpt')}</div>
      <div class="card-body">
        <h3 class="card-title" style="font-size:14.5px;">${b.title}</h3>
        ${b.desc ? `<p class="card-desc">${b.desc}</p>` : ''}
        <div class="card-foot"><span class="tag">${b.meta} · ${b.read}</span><span class="go-link">Read ${ICONS.link}</span></div>
      </div>
    </a>`);
}

function renderFunding(){
  renderCarousel('c-funding', funding, 'funding updates', f=>`
    <a class="card card-funding" href="${f.url}" target="_blank" rel="noopener" aria-label="${f.name}">
      <div class="card-thumb">${imageThumb(f.image,'perp')}<span class="stage-pill on-image">${f.stage}</span></div>
      <div class="card-body">
        <h3 class="card-title" style="font-size:15px; margin-top:6px;">${f.name}</h3>
        <p class="card-desc">${f.desc}</p>
        <div class="funding-amount-lg">${f.amount}</div>
        <div class="card-foot"><span class="card-desc" style="margin:0;">${f.investor}</span><span class="go-link">Details ${ICONS.link}</span></div>
      </div>
    </a>`);
}

function renderRadar(){
  renderCarousel('c-radar', radar, 'local radar items', r=>`
    <a class="card card-radar" href="${r.url}" target="_blank" rel="noopener" aria-label="${r.title}">
      <div class="card-thumb">${imageThumb(r.image,r.kind)}</div>
      <div class="card-body">
        <h3 class="card-title" style="font-size:15px;">${r.title}</h3>
        <p class="card-desc">${r.desc}</p>
        <div class="radar-meta-row">
          <span>${ICONS.pin}${r.loc}</span>
          <span>${ICONS.cal}<time>${r.date}</time> &nbsp;${ICONS.clock}${r.time}</span>
        </div>
      </div>
    </a>`);
}

function prefersReducedMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollCarousel(id, dir){
  const el = document.getElementById(id);
  el.scrollBy({left: dir * el.clientWidth * 0.82, behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
  setTimeout(() => updateCarouselControls(id), prefersReducedMotion() ? 0 : 280);
}
