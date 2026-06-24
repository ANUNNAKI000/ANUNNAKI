/* ================================================
   ANUNNAKI — Cairo Underground  |  js/countdown.js
   Live countdown to 1 January 2027
   ================================================ */

const TARGET = new Date('2027-01-01T00:00:00');

function updateCountdown() {
  const diff = TARGET - new Date();
  if (diff <= 0) return;
  document.getElementById('cd-d').textContent = String(Math.floor(diff / 86400000)).padStart(3, '0');
  document.getElementById('cd-h').textContent = String(Math.floor(diff % 86400000 / 3600000)).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(Math.floor(diff % 3600000  /   60000)).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(Math.floor(diff % 60000    /    1000)).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
