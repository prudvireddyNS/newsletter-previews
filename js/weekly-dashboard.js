/* ============================================================
   RENDER: WEEKLY DASHBOARD
============================================================ */
function panelIcon(svg){ return `<div class="panel-icon">${svg}</div>`; }

function renderDashboard(){
  const signals = weeklySignals;
  const tools = weeklyTools;
  const blogs = weeklyBlogs;
  const funding = weeklyFunding;
  const radar = weeklyRadar;
  const svgSignal = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const svgTool = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="8 5 2 12 8 19"/><polyline points="16 5 22 12 16 19"/></svg>`;
  const svgBlog = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
  const svgFund = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
  const svgRadar = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`;
  const svgRecap = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10"/></svg>`;
  const chevron = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="6 9 12 15 18 9"/></svg>`;

  // STORIES panel — capped, "view all" routes to section page
  const storiesCap = 2;
  const storiesHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgSignal)}<h3>Top Stories</h3><span class="count-pill">${signals.length} this week</span></div>
      </div>
      ${signals.length ? signals.slice(0,storiesCap).map(s=>storyRow(s)).join('') : emptyState('top stories')}
      ${viewAllBtn(signals.length,storiesCap,'stories')}
    </div>`;

  function storyRow(s){
    return `<a class="p-story" href="${s.sources[0].url}" target="_blank" rel="noopener" aria-label="${s.title}">
      <div class="p-story-thumb">${imageThumb(s.image,s.kind)}</div>
      <div style="min-width:0; flex:1;">
        <h4 class="p-story-title">${s.title}</h4>
        <p class="p-story-desc">${s.desc}</p>
        ${sourceChips(s.sources)}
      </div>
    </a>`;
  }

  // RADAR panel — capped, "view all" routes to section page
  const radarCap = 2;
  const radarHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgRadar)}<h3>Radar</h3><span class="count-pill">${radar.length} events</span></div>
      </div>
      ${radar.length ? radar.slice(0,radarCap).map(r=>radarRow(r)).join('') : emptyState('radar items')}
      ${viewAllBtn(radar.length,radarCap,'events')}
    </div>`;

  function radarRow(r){
    return `<a class="p-radar-item" href="${r.url}" target="_blank" rel="noopener" aria-label="${r.title}">
      <div class="p-radar-thumb">${imageThumb(r.image,r.kind)}</div>
      <div style="min-width:0;">
        <p class="p-radar-title">${r.title}</p>
        <div class="p-radar-meta"><span>${ICONS.pin} ${r.loc}</span><span>${ICONS.cal} <time>${r.date}</time>, ${r.time}</span></div>
      </div>
    </a>`;
  }

  // TOOLS panel — capped, "view all" routes to section page
  const toolsCap = 2;
  const toolsHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgTool)}<h3>Tools &amp; Repos</h3><span class="count-pill">${tools.length} this week</span></div>
      </div>
      <div class="p-tools-grid">
        ${tools.length ? tools.slice(0,toolsCap).map(t=>toolCell(t)).join('') : emptyState('tools or repos')}
      </div>
      ${viewAllBtn(tools.length,toolsCap,'tools')}
    </div>`;

  function toolCell(t){
    return `<a class="p-tool" href="${t.url}" target="_blank" rel="noopener" aria-label="${t.name}">
      <div class="p-tool-thumb">${imageThumb(t.image,'mcp')}</div>
      <div style="min-width:0;">
        <p class="p-tool-name">${t.name}</p>
        <p class="p-tool-desc">${t.desc}</p>
        <div class="tag-row">${t.tags.slice(0,2).map(tg=>`<span class="tag">${tg}</span>`).join('')}</div>
      </div>
    </a>`;
  }

  // BLOGS panel — capped, "view all" routes to section page
  const blogsCap = 2;
  const blogsHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgBlog)}<h3>Blogs</h3><span class="count-pill">${blogs.length} this week</span></div>
      </div>
      ${blogs.length ? blogs.slice(0,blogsCap).map(b=>blogRow(b)).join('') : emptyState('blogs')}
      ${viewAllBtn(blogs.length,blogsCap,'reads')}
    </div>`;

  function blogRow(b){
    return `<a class="p-blog" href="${b.url}" target="_blank" rel="noopener" aria-label="${b.title}">
      <div class="p-blog-thumb">${imageThumb(b.image,'gpt')}</div>
      <div style="min-width:0; flex:1;">
        <p class="p-blog-title">${b.title}</p>
        ${b.desc ? `<p class="p-blog-desc">${b.desc}</p>` : ''}
        <p class="p-blog-meta">${b.meta} · <time>${b.date}</time></p>
      </div>
      <span class="tag">${b.read}</span>
    </a>`;
  }

  // FUNDING panel — capped, "view all" routes to section page
  const fundCap = 3;
  const fundHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgFund)}<h3>Funding &amp; Launches</h3><span class="count-pill">${funding.length} this week</span></div>
      </div>
      ${funding.length ? funding.slice(0,fundCap).map(f=>fundRow(f)).join('') : emptyState('funding updates')}
      ${viewAllBtn(funding.length,fundCap,'rounds')}
    </div>`;

  function fundRow(f){
    return `<a class="p-fund-row" href="${f.url}" target="_blank" rel="noopener" aria-label="${f.name}">
      <div class="p-fund-thumb">${imageThumb(f.image,'perp')}</div>
      <div style="min-width:0; flex:1;">
        <span class="p-fund-name">${f.name}</span>
        <span class="p-fund-desc">${f.desc}</span>
      </div>
      <div class="p-fund-right">
        <span class="stage-pill">${f.stage}</span>
        <span class="p-fund-amt">${f.amount}</span>
      </div>
    </a>`;
  }

  // RECAP panel — internal, no source links needed
  const recapHtml = `
    <div class="panel" data-panel>
      <div class="panel-head">
        <div class="panel-head-left">${panelIcon(svgRecap)}<h3>Week's Anchor Signals</h3></div>
      </div>
      ${recap.map((r,i)=>`
        <div class="p-recap">
          <div class="p-recap-rank">0${i+1}</div>
          <div style="min-width:0;">
            <p class="p-recap-title">${r.title}</p>
            <p class="p-recap-clicks">${r.sub}</p>
          </div>
        </div>`).join('')}
    </div>`;

  function viewAllBtn(total, cap, label){
    if(total<=cap) return '';
    return `<button class="show-more-btn" onclick="openSection('${label}')">
      <span class="more-label">View all ${total} ${label}</span> ${chevron}
    </button>`;
  }

  document.getElementById('dashMain').innerHTML = storiesHtml + toolsHtml + blogsHtml + fundHtml;
  document.getElementById('dashSide').innerHTML = radarHtml + recapHtml;
}
