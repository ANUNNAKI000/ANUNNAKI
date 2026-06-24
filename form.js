/* ================================================
   ANUNNAKI — Cairo Underground  |  js/form.js
   Supabase waitlist form
   ================================================ */

const SB_URL = 'https://qxfxrtihgvjxprgpdpmh.supabase.co';
const SB_KEY = 'sb_publishable_jd7Z7oDUcpOcVyyB1UuvWQ_bt1-co5G';

async function sub() {
  const name      = document.getElementById('fname').value.trim();
  const instagram = document.getElementById('finsta').value.trim();
  const whatsapp  = document.getElementById('fwa').value.trim();

  if (!name) { document.getElementById('fname').focus(); return; }

  const btn    = document.getElementById('sbtn');
  const errEl  = document.getElementById('errmsg');
  const btnTxt = document.getElementById('sbtn-txt');

  btn.disabled = true;
  btnTxt.textContent = 'Joining...';
  errEl.style.display = 'none';

  try {
    const res = await fetch(`${SB_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify({ name, instagram, whatsapp, created_at: new Date().toISOString() }),
    });

    if (res.ok || res.status === 201) {
      document.getElementById('wf').style.display = 'none';
      const succ = document.getElementById('succ');
      succ.classList.add('show');
      const sl = succ.querySelector('.succ-logo');
      if (sl) sl.style.filter = 'drop-shadow(0 0 40px rgba(0,255,65,1)) drop-shadow(0 0 80px rgba(180,0,255,.7))';
    } else {
      console.error('Supabase error:', res.status, await res.text());
      errEl.style.display = 'block';
      btn.disabled = false;
      btnTxt.textContent = 'I Was Here First';
    }
  } catch (err) {
    console.error('Network error:', err);
    errEl.style.display = 'block';
    btn.disabled = false;
    btnTxt.textContent = 'I Was Here First';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.closest('#wf')) sub();
});
