/* ============================================================
   Preview gate — LOW SECURITY, deterrence only.
   ------------------------------------------------------------
   Keeps casual visitors out of the work-in-progress pages while
   the site is private. It is NOT real security: this is a public
   repo, so the password below is visible to anyone who reads the
   source. It only stops someone from casually typing the URL and
   seeing the WIP. The testimonial page does NOT load this file,
   so people you send that link to are never asked for a password.

   To change the password: edit PASSWORD below.
   To remove the gate at launch: delete this file and the two
   lines that reference it (the inline <style>/<script> snippet
   and the <script src="/js/preview-gate.js"> tag) from
   index.html and b/index.html.
   ============================================================ */
(function () {
  var PASSWORD = "willis2026"; // case-insensitive

  // The head snippet adds .tw-locked when the visitor isn't unlocked yet.
  if (!document.documentElement.classList.contains('tw-locked')) return;

  // ---- styles (injected so the gate looks the same on both layouts) ----
  var css = document.createElement('style');
  css.textContent = [
    '#tw-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;',
    'padding:1.5rem;background:radial-gradient(120% 100% at 30% 10%,#3f4534 0%,#211e19 90%);',
    'font-family:"Inter",-apple-system,system-ui,sans-serif}',
    '#tw-gate .g-card{width:100%;max-width:380px;text-align:center;color:#f5f1ea}',
    '#tw-gate .g-kicker{font-size:.72rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,241,234,.6)}',
    '#tw-gate h1{font-family:"Fraunces",Georgia,serif;font-weight:300;font-size:2rem;margin:.6rem 0 .4rem;letter-spacing:-.01em}',
    '#tw-gate p{font-size:.92rem;line-height:1.55;color:rgba(245,241,234,.75);margin-bottom:1.5rem}',
    '#tw-gate form{display:flex;flex-direction:column;gap:.7rem}',
    '#tw-gate input{font-family:inherit;font-size:1rem;text-align:center;color:#f5f1ea;background:rgba(245,241,234,.08);',
    'border:1px solid rgba(245,241,234,.25);border-radius:10px;padding:.8rem 1rem;transition:border-color .2s,box-shadow .2s}',
    '#tw-gate input:focus{outline:none;border-color:#b0684a;box-shadow:0 0 0 3px rgba(176,104,74,.3)}',
    '#tw-gate input::placeholder{color:rgba(245,241,234,.45)}',
    '#tw-gate button{font-family:inherit;font-size:.8rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;',
    'color:#f5f1ea;background:#b0684a;border:none;border-radius:999px;padding:.85rem 1rem;cursor:pointer;transition:background .2s}',
    '#tw-gate button:hover{background:#9a5940}',
    '#tw-gate .g-err{display:none;color:#e6a586;font-size:.85rem;margin-top:.2rem}',
    '#tw-gate .g-err.show{display:block}'
  ].join('');
  document.head.appendChild(css);

  // ---- markup ----
  var gate = document.createElement('div');
  gate.id = 'tw-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-label', 'Private preview — password required');
  gate.innerHTML = [
    '<div class="g-card">',
    '  <p class="g-kicker">Tyler Willis · Private preview</p>',
    '  <h1>This site is still in progress.</h1>',
    '  <p>Enter the preview password to take a look. If you were sent here to leave a testimonial, use the link you were given — no password needed.</p>',
    '  <form id="tw-gate-form">',
    '    <input id="tw-gate-input" type="password" placeholder="Preview password" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Preview password" autofocus>',
    '    <button type="submit">Enter</button>',
    '    <span class="g-err" id="tw-gate-err">That’s not it — try again.</span>',
    '  </form>',
    '</div>'
  ].join('');

  function mount() {
    document.body.appendChild(gate);
    var form = document.getElementById('tw-gate-form');
    var input = document.getElementById('tw-gate-input');
    var err = document.getElementById('tw-gate-err');
    input.focus();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
        try { localStorage.setItem('tw_preview', 'ok'); } catch (e2) {}
        document.documentElement.classList.remove('tw-locked');
        gate.remove();
      } else {
        err.classList.add('show');
        input.select();
      }
    });
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
