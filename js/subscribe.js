/* ============================================================
   SUBSCRIBE FORM
============================================================ */
const subscribeForm = document.getElementById('subscribeForm');
const subscribeStatus = document.getElementById('subscribeStatus');

function setSubscribeStatus(message, kind = ''){
  if(!subscribeStatus) return;
  subscribeStatus.textContent = message;
  subscribeStatus.classList.toggle('success', kind === 'success');
  subscribeStatus.classList.toggle('error', kind === 'error');
}

if(subscribeForm){
  if(!subscribeApiBaseUrl){
    setSubscribeStatus('Email signup is not configured yet.');
  }
  subscribeForm.addEventListener('submit', async event => {
    event.preventDefault();
    if(!subscribeApiBaseUrl){
      setSubscribeStatus('Email signup is not configured yet.', 'error');
      return;
    }
    const input = subscribeForm.elements.email;
    const button = subscribeForm.querySelector('button[type="submit"]');
    const email = input.value.trim();
    if(!email){
      setSubscribeStatus('Enter your email address.', 'error');
      return;
    }
    button.disabled = true;
    setSubscribeStatus('Subscribing…');
    try{
      const response = await fetch(`${subscribeApiBaseUrl}/subscribe`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      });
      let data = {};
      try{ data = await response.json(); }catch{}
      if(!response.ok){
        throw new Error(data.detail || 'Could not subscribe. Try again.');
      }
      input.value = '';
      setSubscribeStatus(data.message || "You're subscribed. Ekloge will now arrive in your inbox.", 'success');
    }catch(error){
      setSubscribeStatus(error.message || 'Could not subscribe. Try again.', 'error');
    }finally{
      button.disabled = false;
    }
  });
}
