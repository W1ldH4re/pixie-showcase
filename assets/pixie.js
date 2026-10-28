// Общая магия для всех сцен Pixie: искры, крылышки, лес, тексты из config.js
(function () {
  const C = window.PIXIE_CONFIG || {};
  const Q = new URLSearchParams(location.search);
  const param = (k, d) => (Q.has(k) ? Q.get(k) : d);
  const PALETTE = ['#ff79c6', '#ffb8e0', '#b49bff', '#7cf0d4', '#ffd98a', '#fff5fb'];
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  let uid = 0;

  // ───────── SVG-кусочки ─────────
  const STAR_D = 'M0 -10 Q1.4 -1.4 10 0 Q1.4 1.4 0 10 Q-1.4 1.4 -10 0 Q-1.4 -1.4 0 -10Z';
  const star = () => `<svg viewBox="-10 -10 20 20" aria-hidden="true"><path d="${STAR_D}" fill="currentColor"/></svg>`;

  function wings() {
    const id = 'pw' + uid++;
    const half = `
      <g class="wing">
        <path d="M3 -3 C 14 -52, 80 -78, 94 -46 C 104 -20, 60 2, 3 -3 Z" fill="url(#${id}a)" fill-opacity=".92" stroke="#fff5fb" stroke-opacity=".85" stroke-width="2"/>
        <path d="M3 4 C 36 2, 74 18, 66 46 C 58 72, 20 52, 3 4 Z" fill="url(#${id}b)" fill-opacity=".88" stroke="#fff5fb" stroke-opacity=".85" stroke-width="2"/>
        <g fill="none" stroke="#fff5fb" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round">
          <path d="M8 -7 C 26 -30, 54 -46, 82 -50"/>
          <path d="M10 -4 C 34 -14, 62 -18, 90 -28"/>
          <path d="M8 7 C 26 14, 44 26, 56 46"/>
        </g>
        <circle cx="70" cy="-42" r="4" fill="#fff5fb" fill-opacity=".8"/>
        <circle cx="50" cy="30" r="3" fill="#fff5fb" fill-opacity=".7"/>
      </g>`;
    return `<svg viewBox="-100 -80 200 160" aria-hidden="true">
      <defs>
        <linearGradient id="${id}a" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff79c6"/><stop offset=".55" stop-color="#ffb8e0"/><stop offset="1" stop-color="#b49bff"/></linearGradient>
        <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b49bff"/><stop offset="1" stop-color="#7cf0d4"/></linearGradient>
      </defs>
      ${half}
      <g transform="scale(-1 1)">${half}</g>
      <path class="core" d="${STAR_D}" transform="scale(1.6)" fill="#fff5fb"/>
    </svg>`;
  }

  const ICONS = {
    heart:    '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="3.5"/><path d="M8 3v4M16 3v4M3.5 10.5h17"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/>',
    shield:   '<path d="M12 3l7.5 3v6c0 4.6-3.2 7.7-7.5 9-4.3-1.3-7.5-4.4-7.5-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
    gift:     '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M2.5 7.5h19v3h-19zM12 7.5V20"/><path d="M12 7.5C10.5 4 6.5 3.6 6.8 6c.2 1.5 3 1.5 5.2 1.5zM12 7.5c1.5-3.5 5.5-3.9 5.2-1.5-.2 1.5-3 1.5-5.2 1.5z"/>',
    chat:     '<path d="M5 4.5h14a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 19 17.5h-7L7.5 21v-3.5H5A2.5 2.5 0 0 1 2.5 15V7A2.5 2.5 0 0 1 5 4.5z"/><path d="M8 11h.01M12 11h.01M16 11h.01" stroke-width="3"/>',
    monitor:  '<rect x="2.5" y="4" width="19" height="12.5" rx="2.5"/><path d="M8.5 20.5h7M12 16.5v4"/>',
    star:     `<path d="M12 2.5Q13.6 10.4 21.5 12 13.6 13.6 12 21.5 10.4 13.6 2.5 12 10.4 10.4 12 2.5z"/>`
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;

  // ───────── Сказочный лес снизу ─────────
  function forest(el) {
    const W = 1920, H = 280;
    const back = 'M0 150 C 260 80, 560 150, 880 110 C 1180 72, 1480 150, 1920 92 L1920 280 L0 280Z';
    const front = 'M0 214 C 240 168, 520 228, 820 196 C 1140 162, 1460 222, 1920 182 L1920 280 L0 280Z';
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <filter id="mglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e1752"/><stop offset="1" stop-color="#1a0c31"/></linearGradient>
        <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b0d33"/><stop offset="1" stop-color="#0c0618"/></linearGradient>
      </defs>
      <path d="${back}" fill="url(#hillA)"/>
      <g class="mush back"></g>
      <path class="hill-front" d="${front}" fill="url(#hillB)"/>
      <g class="mush front"></g>
    </svg>`;
    const svg = el.querySelector('svg');
    const yOn = (d, x) => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d); svg.appendChild(p);
      let lo = 0, hi = p.getTotalLength();
      for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (p.getPointAtLength(m).x < x) lo = m; else hi = m; }
      const y = p.getPointAtLength(lo).y; p.remove(); return y;
    };
    const mush = (x, y, s, color, delay) => `
      <g transform="translate(${x} ${y + 4}) scale(${s})">
        <path d="M-7 0 C -6 -18, -4 -26, -5 -30 L 5 -30 C 4 -26, 6 -18, 7 0 Z" fill="#e8d8ff" fill-opacity=".75"/>
        <path class="mush-cap" style="animation-delay:${delay}s" d="M-30 -26 Q 0 -74 30 -26 Q 0 -18 -30 -26 Z" fill="${color}" filter="url(#mglow)"/>
        <circle cx="-12" cy="-38" r="4" fill="#fff5fb" fill-opacity=".85"/>
        <circle cx="6" cy="-46" r="3" fill="#fff5fb" fill-opacity=".85"/>
        <circle cx="16" cy="-32" r="2.5" fill="#fff5fb" fill-opacity=".85"/>
      </g>`;
    const backM = [[150, .6, '#b49bff'], [1010, .5, '#7cf0d4'], [1560, .65, '#ff79c6'], [1630, .45, '#b49bff']];
    const frontM = [[90, 1.1, '#ff79c6'], [170, .75, '#b49bff'], [640, .9, '#7cf0d4'], [1300, .8, '#ff79c6'], [1780, 1.2, '#b49bff'], [1850, .7, '#7cf0d4']];
    svg.querySelector('.mush.back').innerHTML = backM.map(([x, s, c], i) => mush(x, yOn(back, x), s, c, -i)).join('');
    svg.querySelector('.mush.front').innerHTML = frontM.map(([x, s, c], i) => mush(x, yOn(front, x), s, c, -i * .7)).join('');
  }

  // ───────── Пыльца / искорки на canvas ─────────
  function sprite(color, isStar) {
    const s = 64, c = document.createElement('canvas'); c.width = c.height = s;
    const x = c.getContext('2d'), h = s / 2;
    const g = x.createRadialGradient(h, h, 0, h, h, h);
    g.addColorStop(0, '#ffffff'); g.addColorStop(.12, color); g.addColorStop(.4, color + '55'); g.addColorStop(1, color + '00');
    x.fillStyle = g; x.fillRect(0, 0, s, s);
    if (isStar) {
      x.fillStyle = '#fff';
      x.beginPath(); x.moveTo(h, 2);
      x.quadraticCurveTo(h + 3, h - 3, s - 2, h); x.quadraticCurveTo(h + 3, h + 3, h, s - 2);
      x.quadraticCurveTo(h - 3, h + 3, 2, h); x.quadraticCurveTo(h - 3, h - 3, h, 2); x.fill();
    }
    return c;
  }
  const SPRITES = {};
  const getSprite = (c, st) => (SPRITES[c + st] ||= sprite(c, st));

  function sparkles(canvas, o = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const density = o.density ?? 0.00011;
    const rise = o.rise ?? 1;
    const colors = o.colors || PALETTE;
    let w = 0, h = 0;
    const parts = [], bursts = [];
    const make = (init) => ({
      x: Math.random() * w, y: init ? Math.random() * h : h + 12,
      r: rand(3, 11) * (o.scale || 1), star: Math.random() < .3,
      vx: rand(-.12, .12), vy: -rand(.15, .6) * rise,
      ph: Math.random() * 6.28, sp: rand(.012, .04), sway: rand(.1, .45), c: pick(colors)
    });
    function resize() {
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(w * h * density);
      while (parts.length < n) parts.push(make(true));
      parts.length = n;
    }
    function draw(p, a) {
      const s = p.r * (p.star ? 2.6 : 2);
      ctx.globalAlpha = a;
      ctx.drawImage(getSprite(p.c, p.star), p.x - s / 2, p.y - s / 2, s, s);
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of parts) {
        p.ph += p.sp;
        p.x += p.vx + Math.sin(p.ph * .6) * p.sway;
        p.y += p.vy;
        if (p.y < -20 || p.x < -20 || p.x > w + 20) Object.assign(p, make(false));
        draw(p, .2 + .8 * Math.abs(Math.sin(p.ph)));
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx; b.y += b.vy; b.vx *= .965; b.vy = b.vy * .965 + .05; b.ph += .2;
        b.life -= b.decay;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        draw(b, b.life * (.6 + .4 * Math.abs(Math.sin(b.ph))));
      }
      requestAnimationFrame(frame);
    }
    resize(); addEventListener('resize', resize); requestAnimationFrame(frame);
    return {
      burst(x, y, n = 80, cols = colors) {
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, v = rand(2, 11);
          bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, r: rand(5, 16), star: Math.random() < .6,
            c: pick(cols), life: 1, decay: rand(.007, .018), ph: Math.random() * 6 });
        }
      }
    };
  }

  // ───────── Тексты, таймеры, часы ─────────
  function rotate(el, list, every = 6000) {
    if (!list || !list.length) return;
    let i = 0; el.textContent = list[0];
    setInterval(() => {
      el.classList.add('out');
      setTimeout(() => { i = (i + 1) % list.length; el.textContent = list[i]; el.classList.remove('out'); }, 650);
    }, every);
  }

  function countdown(el) {
    const doneText = el.dataset.done || 'уже начинаем!';
    let end;
    const until = param('until');
    if (until && /^\d{1,2}:\d{2}$/.test(until)) {
      const [hh, mm] = until.split(':').map(Number);
      const d = new Date(); d.setHours(hh, mm, 0, 0);
      if (d < Date.now()) d.setDate(d.getDate() + 1);
      end = d.getTime();
    } else {
      end = Date.now() + Number(param('minutes', C.startingMinutes ?? 5)) * 60000;
    }
    const tick = () => {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      if (!left) { el.textContent = doneText; el.classList.add('done'); return; }
      const h = Math.floor(left / 3600), m = Math.floor(left / 60) % 60, s = left % 60;
      el.textContent = (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(s).padStart(2, '0');
      setTimeout(tick, 250);
    };
    tick();
  }

  function clock(el) {
    const t = () => { el.textContent = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); };
    t(); setInterval(t, 5000);
  }

  // значение из ссылки → из config.js (поддерживает «latest.follower»)
  const value = (key) => param(key.split('.').pop(), key.split('.').reduce((o, k) => (o ? o[k] : undefined), C));

  function init() {
    document.querySelectorAll('.wings').forEach((el) => (el.innerHTML = wings()));
    document.querySelectorAll('.spark').forEach((el) => (el.innerHTML = star()));
    document.querySelectorAll('[data-icon]').forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
    document.querySelectorAll('.forest').forEach(forest);
    document.querySelectorAll('[data-c]').forEach((el) => { const v = value(el.dataset.c); if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-socials]').forEach((el) => {
      el.innerHTML = (C.socials || []).map((s) =>
        `<span class="pill"><span class="spark">${star()}</span><span class="lbl">${s.label}</span><b>${s.handle}</b></span>`).join('');
    });
    document.querySelectorAll('[data-rotate]').forEach((el) => rotate(el, C[el.dataset.rotate], Number(el.dataset.every) || 6000));
    document.querySelectorAll('[data-countdown]').forEach(countdown);
    document.querySelectorAll('[data-clock]').forEach(clock);
    document.querySelectorAll('canvas.sparkles').forEach((cv) => {
      cv._fx = sparkles(cv, { density: Number(cv.dataset.density) || undefined, rise: Number(cv.dataset.rise) || undefined, scale: Number(cv.dataset.scale) || undefined });
    });
  }

  window.Pixie = { config: C, param, wings, star, icon, forest, sparkles, rotate, PALETTE };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
