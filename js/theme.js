(() => {
  const THEME_KEY = 'ekloge.preview.theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function storedTheme(){
    try{
      const value = localStorage.getItem(THEME_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    }catch{
      return null;
    }
  }

  function systemTheme(){
    return media.matches ? 'dark' : 'light';
  }

  function effectiveTheme(){
    return storedTheme() || systemTheme();
  }

  function applyTheme(theme){
    document.documentElement.dataset.theme = theme;
    const meta = document.getElementById('themeColorMeta');
    if(meta) meta.setAttribute('content', theme === 'dark' ? '#071316' : '#ECF3F1');

    const button = document.getElementById('themeToggle');
    if(!button) return;
    const isDark = theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    button.querySelector('.theme-toggle-label').textContent = isDark ? 'Dark' : 'Light';
    button.querySelector('.theme-toggle-icon').textContent = isDark ? '☾' : '☼';
  }

  function toggleTheme(){
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    try{ localStorage.setItem(THEME_KEY, next); }catch{}
    applyTheme(next);
  }

  function hydrateThemeToggle(){
    applyTheme(effectiveTheme());
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    media.addEventListener?.('change', () => {
      if(!storedTheme()) applyTheme(effectiveTheme());
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', hydrateThemeToggle, { once:true });
  }else{
    hydrateThemeToggle();
  }
})();
