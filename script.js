const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin');
const resultBlock = document.getElementById('result');
const prizeName = document.getElementById('prize-name');
const form = document.getElementById('contact-form');

const prizes = [
  'Подарок 1', 'Подарок 2', 'Подарок 3', 'Подарок 4',
  'Подарок 5', 'Подарок 6', 'Подарок 7', 'Подарок 8'
];
const colors = ['#f1e0c5', '#d6c1a5'];

let angle = 0;
const arc = 2 * Math.PI / prizes.length;

function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    const startAngle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i % 2];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, startAngle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(startAngle + arc / 2);
    ctx.fillStyle = '#4e3b31';
    ctx.font = '16px Arial';
    ctx.fillText(prizes[i], 140, 10);
    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener('click', () => {
  spinBtn.disabled = true;
  const randomSpin = Math.floor(3600 + Math.random() * 1000);
  const duration = 4000;
  const start = performance.now();

  function animate(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    angle = (randomSpin * progress) % 360;
    ctx.clearRect(0, 0, 500, 500);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const degrees = (360 - (angle % 360)) % 360;
      const index = Math.floor(degrees / (360 / prizes.length));
      prizeName.textContent = prizes[index];
      resultBlock.classList.remove('hidden');
      spinBtn.disabled = false;
    }
  }

  requestAnimationFrame(animate);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Спасибо! Мы с вами свяжемся.');
  form.reset();
});