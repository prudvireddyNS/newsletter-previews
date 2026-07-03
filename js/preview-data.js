/* ============================================================
   DATA
============================================================ */
const ICONS = {
  link: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>`,
  pin: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.8 12 21 12 21z"/></svg>`,
  cal: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  doc: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`
};

function thumbSVG(kind){
  const T = {
    gpt: `<svg viewBox="0 0 220 118" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="220" height="118" fill="#F2EDE1"/><g stroke="#B7AE9C" stroke-width="1.1" fill="none"><path d="M40 30h22M105 30h20M40 60h22M105 60h22M40 90h22M105 90h20"/><path d="M62 30h12M127 30v18M62 60h12M150 60v18M62 90h12"/><path d="M74 30v18M74 90v-18"/></g><rect x="28" y="22" width="24" height="16" rx="4" fill="#D9CBE8" stroke="#9C86B5" stroke-width="1"/><rect x="93" y="22" width="24" height="16" rx="4" fill="#CFE0D6" stroke="#7FA68F" stroke-width="1"/><circle cx="74" cy="60" r="11" fill="#F3D9A4" stroke="#C99A4A" stroke-width="1"/><rect x="28" y="82" width="24" height="16" rx="4" fill="#F2C9B7" stroke="#C2562F" stroke-width="1"/></svg>`,
    mcp: `<svg viewBox="0 0 220 118" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="220" height="118" fill="#11151F"/><g stroke="#3A4254" stroke-width="0.6"><line x1="20" y1="20" x2="80" y2="55"/><line x1="80" y1="55" x2="140" y2="30"/><line x1="80" y1="55" x2="60" y2="95"/><line x1="140" y1="30" x2="190" y2="60"/><line x1="140" y1="30" x2="120" y2="85"/><line x1="60" y1="95" x2="120" y2="85"/></g><g fill="#E7C988"><circle cx="20" cy="20" r="1.6"/><circle cx="80" cy="55" r="1.8"/><circle cx="140" cy="30" r="1.6"/><circle cx="60" cy="95" r="1.6"/><circle cx="190" cy="60" r="1.6"/><circle cx="120" cy="85" r="1.8"/></g></svg>`,
    gemini: `<svg viewBox="0 0 220 118" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="220" height="118" fill="#1B3B36"/><rect x="78" y="29" width="64" height="60" rx="6" fill="#0F2622" stroke="#4C8073" stroke-width="1.2"/><rect x="92" y="43" width="36" height="32" rx="3" fill="#163530"/><text x="98" y="64" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="#E8E2D2">G</text><rect x="120" y="50" width="14" height="18" rx="2" fill="#F2EDE1"/></svg>`,
    perp: `<svg viewBox="0 0 220 118" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="220" height="118" fill="#2B3344"/><circle cx="110" cy="59" r="34" fill="none" stroke="#C99A4A" stroke-width="1.4"/><circle cx="110" cy="59" r="20" fill="none" stroke="#8FA6C2" stroke-width="1.2"/><circle cx="110" cy="59" r="4" fill="#E7C988"/><line x1="76" y1="59" x2="30" y2="59" stroke="#8FA6C2" stroke-width="1"/><line x1="144" y1="59" x2="190" y2="59" stroke="#8FA6C2" stroke-width="1"/></svg>`,
    event1: `<svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="260" height="120" fill="#EFE6D1"/><rect x="0" y="50" width="260" height="70" fill="#E3C9A0"/><rect x="30" y="40" width="200" height="55" fill="#C2562F"/><rect x="40" y="50" width="35" height="35" fill="#F2EDE1"/><rect x="85" y="50" width="35" height="35" fill="#4C8073"/><rect x="130" y="50" width="35" height="35" fill="#E8C988"/><rect x="175" y="50" width="35" height="35" fill="#2B3344"/></svg>`,
    event2: `<svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="260" height="120" fill="#DCE7E0"/><rect x="0" y="78" width="260" height="42" fill="#C7BFA9"/><rect x="50" y="20" width="160" height="65" fill="#F4F6F4" stroke="#9CB4A8" stroke-width="1"/><g fill="#A9CBC0" opacity="0.85"><rect x="58" y="28" width="18" height="14"/><rect x="80" y="28" width="18" height="14"/><rect x="102" y="28" width="18" height="14"/><rect x="124" y="28" width="18" height="14"/></g></svg>`,
    event3: `<svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="260" height="120" fill="#EFE3D3"/><ellipse cx="105" cy="100" rx="80" ry="10" fill="#D8C7A8"/><path d="M70 60h70v25a35 35 0 0 1-70 0V60Z" fill="#F4ECDB" stroke="#B79A6B" stroke-width="1.5"/><rect x="165" y="35" width="55" height="40" rx="4" fill="#2B3344"/><rect x="172" y="42" width="41" height="22" rx="2" fill="#5C7A9A"/></svg>`,
    event4: `<svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="260" height="120" fill="#E8DCEC"/><circle cx="130" cy="55" r="30" fill="#F4ECF6" stroke="#9C86B5" stroke-width="1.4"/><rect x="60" y="90" width="140" height="8" rx="4" fill="#C9B0DB"/><circle cx="90" cy="50" r="6" fill="#C2562F"/><circle cx="170" cy="50" r="6" fill="#4C8073"/></svg>`,
    event5: `<svg viewBox="0 0 260 120" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><rect width="260" height="120" fill="#DDE6EF"/><rect x="40" y="30" width="180" height="60" rx="6" fill="#F2F6FA" stroke="#8FA6C2" stroke-width="1.2"/><circle cx="90" cy="60" r="16" fill="#C99A4A"/><rect x="120" y="48" width="70" height="6" rx="3" fill="#8FA6C2"/><rect x="120" y="62" width="50" height="6" rx="3" fill="#B7AE9C"/></svg>`
  };
  return T[kind] || T.gpt;
}

function readJsonScript(id){
  return JSON.parse(document.getElementById(id).textContent);
}

const dailyEditions = readJsonScript('daily-editions-json');
const weeklyEditions = readJsonScript('weekly-editions-json');
let dailyEdition = readJsonScript('daily-edition-json');
let weeklyEdition = readJsonScript('weekly-edition-json');
const initialView = readJsonScript('initial-view-json');
const availableViews = readJsonScript('available-views-json');
const subscribeApiBaseUrl = readJsonScript('subscribe-api-base-url-json');
let activeDailyDate = dailyEditions[0]?.date || '';

const signalKinds = ['gpt','mcp','gemini','perp'];
const eventKinds = ['event1','event2','event3','event4','event5'];

function hostLabel(url){
  try{
    return new URL(url).hostname.replace(/^www\./,'').split('.')[0].replace(/-/g,' ');
  }catch{
    return 'Source';
  }
}

function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function safeHttpUrl(value){
  if(!value) return '';
  try{
    const url = new URL(value, window.location.href);
    if(url.protocol === 'http:' || url.protocol === 'https:') return escapeHtml(value);
  }catch{}
  return '';
}

function safeHref(value){
  return safeHttpUrl(value) || '#';
}

function toolIcon(name){
  return escapeHtml((name || '?').split(/[\/\s-]+/).filter(Boolean).slice(-1)[0].slice(0,2).toUpperCase());
}

function toSignals(edition){
  return edition.top_stories.map((story, index) => ({
    kind: signalKinds[index % signalKinds.length],
    title: escapeHtml(story.title),
    desc: escapeHtml(story.why_it_matters || story.description),
    image: safeHttpUrl(story.image_url),
    sources: [{ label: escapeHtml(hostLabel(story.url)), url: safeHref(story.url) }]
  }));
}

function toTools(edition){
  return edition.tools_and_repos.map(tool => ({
    icon: escapeHtml(tool.icon || toolIcon(tool.name)),
    name: escapeHtml(tool.name),
    desc: escapeHtml(tool.description),
    image: safeHttpUrl(tool.image_url),
    stars: escapeHtml(tool.stars || ''),
    forks: escapeHtml(tool.forks || ''),
    tags: tool.tags && tool.tags.length ? tool.tags.map(escapeHtml) : ['repo'],
    url: safeHref(tool.url)
  }));
}


function toBlogs(edition){
  return edition.blogs.map(blog => ({
    title: escapeHtml(blog.title),
    desc: escapeHtml(blog.description || ''),
    meta: escapeHtml(blog.source || hostLabel(blog.url)),
    image: safeHttpUrl(blog.image_url),
    date: escapeHtml(blog.date || edition.masthead.date),
    read: escapeHtml(blog.read_time || 'Read'),
    url: safeHref(blog.url)
  }));
}

function toFunding(edition){
  return edition.funding_and_launches.map(item => ({
    name: escapeHtml(item.company),
    desc: escapeHtml(item.description),
    image: safeHttpUrl(item.image_url),
    amount: escapeHtml(item.amount || item.stage || 'Launch'),
    stage: escapeHtml(item.stage || 'Update'),
    investor: escapeHtml(item.lead_investor || ''),
    url: safeHref(item.url)
  }));
}

function toRadar(edition){
  return edition.tech_radar.map((item, index) => ({
    kind: eventKinds[index % eventKinds.length],
    title: escapeHtml(item.title),
    desc: escapeHtml(item.description),
    image: safeHttpUrl(item.image_url),
    loc: escapeHtml(item.location || 'Location TBA'),
    date: escapeHtml([item.day, item.date].filter(Boolean).join(', ')),
    time: escapeHtml(item.time || ''),
    url: safeHref(item.url)
  }));
}

let signals = [];
let tools = [];
let blogs = [];
let funding = [];
let radar = [];
let weeklySignals = [];
let weeklyTools = [];
let weeklyBlogs = [];
let weeklyFunding = [];
let weeklyRadar = [];
let recap = [];

function latestWeeklyForDate(date){
  return weeklyEditions.find(item => item.date <= date) || weeklyEditions[0] || null;
}

function rebuildEditionData(){
  signals = toSignals(dailyEdition);
  tools = toTools(dailyEdition);
  blogs = toBlogs(dailyEdition);
  funding = toFunding(dailyEdition);
  radar = toRadar(dailyEdition);
  weeklySignals = toSignals(weeklyEdition);
  weeklyTools = toTools(weeklyEdition);
  weeklyBlogs = toBlogs(weeklyEdition);
  weeklyFunding = toFunding(weeklyEdition);
  weeklyRadar = toRadar(weeklyEdition);
  recap = weeklySignals.slice(0,3).map(item => ({
    title: item.title,
    sub: 'Weekly anchor signal'
  }));
}

function setDailyDate(date, options = {}){
  const { render = true, switchToDaily = true } = options;
  const entry = dailyEditions.find(item => item.date === date);
  if(!entry) return;
  activeDailyDate = entry.date;
  dailyEdition = entry.edition;
  const weeklyEntry = latestWeeklyForDate(entry.date);
  if(weeklyEntry) weeklyEdition = weeklyEntry.edition;
  rebuildEditionData();
  if(render){
    hydrateChrome();
    renderHome();
    renderSignals();
    renderTools();
    renderBlogs();
    renderFunding();
    renderRadar();
    renderDashboard();
    if(activeView === 'weekly' && document.getElementById('view-section').classList.contains('active')){
      closeSection({ sync: false });
    }
    updateChrome(activeView || initialView);
  }
  if(switchToDaily) setView('daily');
}

rebuildEditionData();
