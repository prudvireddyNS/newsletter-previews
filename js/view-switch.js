/* ============================================================
   VIEW SWITCH
============================================================ */
function scrollToSubscribeForm(){
  setView('home');
  setTimeout(() => {
    const form = document.getElementById('subscribeForm');
    if(!form) return;
    form.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    form.classList.remove('subscribe-form-highlight');
    void form.offsetWidth;
    form.classList.add('subscribe-form-highlight');
    setTimeout(() => form.classList.remove('subscribe-form-highlight'), 1700);
  }, 0);
}

function setView(view, options = {}){
  const { sync = true, scroll = true } = options;
  if(!availableViews.includes(view)){
    view = availableViews[0] || 'daily';
  }
  activeView = view;
  document.getElementById('viewToggle').dataset.active = view;
  document.querySelectorAll('.view-toggle button').forEach(b=>{
    const isActive = b.dataset.view===view;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.getElementById('view-home').classList.toggle('active', view==='home');
  document.getElementById('view-daily').classList.toggle('active', view==='daily');
  document.getElementById('view-weekly').classList.toggle('active', view==='weekly');
  document.getElementById('view-section').classList.remove('active');
  updateChrome(view);
  if(sync) syncRoute(view);
  if(scroll) window.scrollTo({top:0, behavior: prefersReducedMotion() ? 'auto' : 'smooth'});
}

window.addEventListener('popstate', () => {
  const route = readRoute();
  const view = route.view || initialView;
  setView(view, { sync: false, scroll: false });
  if(route.section) openSection(route.section, { sync: false, focus: false });
});

hydrateChrome();
renderHome();
renderSignals();
renderTools();
renderBlogs();
renderFunding();
renderRadar();
renderDashboard();
document.querySelectorAll('svg').forEach(svg => svg.setAttribute('aria-hidden', 'true'));
const route = readRoute();
const startView = route.view || initialView;
setView(startView, { sync: false, scroll: false });
if(route.section) openSection(route.section, { sync: false, focus: false });
