/* ================================================
   ANUNNAKI — Cairo Underground  |  js/canvas.js
   Space particle background
   ================================================ */

const cv = document.getElementById('cv');
const cx = cv.getContext('2d');
let W, H, stars = [], parts = [], mx = -999, my = -999;

const COLS = [
  [0,   255,  65],   // green
  [180,   0, 255],   // purple
  [0,   229, 255],   // cyan
];

function rsz() {
  W = cv.width  = innerWidth;
  H = cv.height = innerHeight;
}

function init() {
  rsz();
  stars = [];
  for (let i = 0; i < Math.floor(W * H / 1800); i++) {
    const c = COLS[Math.floor(Math.random() * COLS.length)];
    stars.push({
      x: Math.random() * W,  y: Math.random() * H,
      r: Math.random() * 1.4 + .15,
      a: Math.random() * .7  + .1,
      t: Math.random() * Math.PI * 2,
      s: Math.random() * .012 + .004,
      c, w: Math.random() > .75,
    });
  }
  parts = [];
  for (let i = 0; i < Math.floor(W * H / 10000); i++) {
    const c = COLS[Math.floor(Math.random() * COLS.length)];
    parts.push({
      x: Math.random() * W,  y: Math.random() * H,
      vx: (Math.random() - .5) * .2,
      vy: (Math.random() - .5) * .2,
      r: Math.random() * 1.4 + .3,
      p: Math.random() * Math.PI * 2,
      c,
    });
  }
}

function draw() {
  cx.clearRect(0, 0, W, H);
  const sy = scrollY;
  const sh = document.body.scrollHeight - H || 1;
  const en = .2 + Math.min(sy / sh, 1) * .8;

  // Nebulae
  [
    [W * .55, H * .3,  W * .40,   0,  50,  15, .055],
    [W * .2,  H * .7,  W * .28, 100,   0, 120, .040],
    [W * .8,  H * .55, W * .22,  80,   0, 100, .038],
  ].forEach(([nx, ny, nr, r, g, b, a]) => {
    const gd = cx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    gd.addColorStop(0, `rgba(${r},${g},${b},${a * en})`);
    gd.addColorStop(1, 'transparent');
    cx.fillStyle = gd;
    cx.fillRect(0, 0, W, H);
  });

  // Stars
  stars.forEach(s => {
    s.t += s.s;
    const a = s.a * (.4 + Math.sin(s.t) * .6);
    cx.beginPath();
    cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    cx.fillStyle = s.w
      ? `rgba(200,230,215,${a})`
      : `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${a * .5})`;
    cx.fill();
  });

  // Particles
  parts.forEach(p => {
    p.p += .007;
    const pu = Math.sin(p.p) * .5 + .5;
    const dx = p.x - mx, dy = p.y - my;
    const d  = Math.hypot(dx, dy);
    if (d < 150) {
      const f = (150 - d) / 150 * .5;
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
    p.vx *= .97; p.vy *= .97;
    p.x  += p.vx; p.y  += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    const a = (.2 + pu * .8) * en * .6;
    cx.beginPath();
    cx.arc(p.x, p.y, p.r * (1 + pu * .35), 0, Math.PI * 2);
    cx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;
    cx.fill();
  });

  // Particle connections
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const dx = parts[i].x - parts[j].x;
      const dy = parts[i].y - parts[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < 100) {
        cx.beginPath();
        cx.moveTo(parts[i].x, parts[i].y);
        cx.lineTo(parts[j].x, parts[j].y);
        cx.strokeStyle = `rgba(${parts[i].c[0]},${parts[i].c[1]},${parts[i].c[2]},${(1 - d / 100) * .04 * en})`;
        cx.lineWidth = .3;
        cx.stroke();
      }
    }
  }

  // Mouse rays
  if (mx > 0) {
    parts.forEach(p => {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < 180) {
        cx.beginPath();
        cx.moveTo(mx, my);
        cx.lineTo(p.x, p.y);
        cx.strokeStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${(1 - d / 180) * .12 * en})`;
        cx.lineWidth = .25;
        cx.stroke();
      }
    });
  }

  requestAnimationFrame(draw);
}

addEventListener('resize',   () => init());
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
addEventListener('touchmove', e => {
  const t = e.touches[0];
  mx = t.clientX; my = t.clientY;
}, { passive: true });

init();
draw();
