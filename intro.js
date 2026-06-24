/* ================================================
   ANUNNAKI — Cairo Underground  |  js/intro.js
   Intro sequence, BPM bars, scroll observer
   ================================================ */

let playing = true;

/* BPM visualiser bars */
const barsEl = document.getElementById('bars');
for (let i = 0; i < 26; i++) {
  const b = document.createElement('div');
  b.className = 'bar';
  b.style.cssText = [
    `animation-duration:${(Math.random() * .3 + .15).toFixed(2)}s`,
    `animation-delay:${Math.random().toFixed(2)}s`,
    `height:${Math.floor(Math.random() * 45 + 10)}px`,
  ].join(';');
  barsEl.appendChild(b);
}

/* Intro sequence timing */
setTimeout(() => document.getElementById('il').classList.add('on'),    300);
setTimeout(() => document.getElementById('in').classList.add('on'),   1700);
setTimeout(() => document.getElementById('itag').classList.add('on'), 2300);
setTimeout(() => document.getElementById('iline').classList.add('on'),3100);
setTimeout(() => document.getElementById('skip').classList.add('on'), 2500);
setTimeout(() => { if (playing) go(); }, 7500);

function go() {
  if (!playing) return;
  playing = false;
  document.getElementById('intro').classList.add('gone');
  document.getElementById('skip').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('main').classList.add('on');
    document.getElementById('sh').classList.add('on');
    document.getElementById('nav').classList.add('on');
    document.querySelectorAll('.ob').forEach(el => obs.observe(el));
  }, 600);
}

document.getElementById('skip').addEventListener('click', go);

addEventListener('scroll', () => {
  document.getElementById('sh').classList.toggle('hide', scrollY > 80);
}, { passive: true });

/* Intersection observer — reveal on scroll */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains('bw')) {
      el.classList.add('iv');
      setTimeout(() => el.classList.add('lit'), 600);
    } else {
      el.classList.add('iv');
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: .25 });
