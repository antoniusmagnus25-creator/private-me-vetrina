/* Private Me Work · conteggio visite anonimo del sito
   Nessun cookie, nessun indirizzo IP, nessun dato personale: solo pagina, tempo, scorrimento e clic sui pulsanti.
   Per escludere i tuoi dispositivi apri una volta: https://privateme.work/?noconto=1  (per riattivare: ?noconto=0) */
(function () {
  var URL_ = 'https://xdzwnwkwdzadkwnvzxkl.supabase.co', KEY = 'sb_publishable_k9td9Qw0_Tc1wNeLc197XA_DjlFOAT3'
  try {
    var q = /[?&]noconto=(\d)/.exec(location.search)
    if (q) localStorage.setItem('pmw-noconto', q[1])
    if (localStorage.getItem('pmw-noconto') === '1') return
  } catch (e) {}
  if (!/^https?:$/.test(location.protocol) || /^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname)) return
  if (navigator.webdriver || /bot|crawl|spider|headless|lighthouse|preview|facebookexternalhit|slurp/i.test(navigator.userAgent)) return
  var rid = function () { return Math.random().toString(36).slice(2, 12) + Math.random().toString(36).slice(2, 8) }
  var sess; try { sess = sessionStorage.getItem('vt-s'); if (!sess) { sess = rid(); sessionStorage.setItem('vt-s', sess) } } catch (e) { sess = rid() }
  var sid = rid(), t0 = null, acc = 0, scroll = 0, faccia = 0, az = {}, dirty = true, sent = false
  var ref = ''; try { var r = new URL(document.referrer); if (r.hostname && r.hostname !== location.hostname) ref = r.hostname.replace(/^www\./, '') } catch (e) {}
  var w = innerWidth, disp = w < 768 ? 'mobile' : w < 1100 ? 'tablet' : 'desktop'
  function act(k) { az[k] = (az[k] || 0) + 1; dirty = true }
  function once(k) { if (!az[k]) act(k) }
  function secs() { return Math.round(acc + (t0 != null ? (Date.now() - t0) / 1000 : 0)) }
  function send(keep) {
    if (!dirty && sent) return; dirty = false; sent = true
    try {
      fetch(URL_ + '/rest/v1/rpc/sito_traccia', {
        method: 'POST', keepalive: !!keep,
        headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY },
        body: JSON.stringify({ p_sid: sid, p_sess: sess, p_pagina: location.pathname || '/', p_ref: ref, p_disp: disp, p_lingua: (navigator.language || '').slice(0, 2).toLowerCase(),
          p_durata: secs(), p_scroll: scroll, p_faccia: faccia, p_azioni: az })
      }).catch(function () {})
    } catch (e) {}
  }
  function vis() { if (document.visibilityState === 'visible') { if (t0 == null) t0 = Date.now() } else { if (t0 != null) { acc += (Date.now() - t0) / 1000; t0 = null } dirty = true; send(true) } }
  function measure() {
    var h = document.documentElement, max = h.scrollHeight - innerHeight, p = max > 0 ? Math.round(scrollY / max * 100) : 100
    if (p > scroll) { scroll = Math.min(100, p); dirty = true; if (scroll >= 97) once('fondo') }
    var f = document.querySelectorAll('[data-face]')
    for (var i = 0; i < f.length; i++) { var n = +f[i].getAttribute('data-face'); if (n > faccia && f[i].getBoundingClientRect().top < innerHeight * .65) { faccia = n; dirty = true } }
  }
  addEventListener('scroll', measure, { passive: true }); addEventListener('resize', measure)
  document.addEventListener('visibilitychange', vis); addEventListener('pagehide', function () { dirty = true; vis(); send(true) })
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return
    if (t.closest('a[href^="mailto"]')) return act('contatto')
    if (t.closest('details>summary')) return act('faq')
    if (t.closest('.btn,.cta,.cta2 a,a.b,button')) return act('cta')
    if (t.closest('header a,nav a,.nav a')) return act('nav')
    var a = t.closest('a[href^="http"]'); if (a && a.hostname !== location.hostname) act('link')
  }, true)
  var cv = function () { return document.getElementById('h3d') }
  addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse' && scrollY < innerHeight * .8) once('logo') }, { passive: true })
  addEventListener('touchstart', function () { if (scrollY < innerHeight * .8) once('logo') }, { passive: true })
  if (document.visibilityState === 'visible') t0 = Date.now()
  setTimeout(function () { measure(); send(false) }, 1500)
  setInterval(function () { if (document.visibilityState === 'visible' && !document.hidden) { dirty = true; measure(); send(false) } }, 15000)
})()
