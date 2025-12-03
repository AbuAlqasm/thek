/* Simple interactive JS: menu toggle, year, demo wave animation, micro interactions */
(() => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const yearEl = document.getElementById('year');
  const ctaDemo = document.getElementById('ctaDemo');
  const sendBtn = document.getElementById('sendBtn');

  yearEl.textContent = new Date().getFullYear();

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });

  ctaDemo.addEventListener('click', () => {
    // quick demo effect: flash cards
    document.querySelectorAll('.mini-card').forEach((el, i) => {
      el.animate([{transform:'translateY(0)'},{transform:'translateY(-8px)'},{transform:'translateY(0)'}],{duration:500,delay:i*100});
    });
  });

  sendBtn.addEventListener('click', () => {
    sendBtn.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:250});
    sendBtn.textContent = 'تم الإرسال!';
    setTimeout(()=> sendBtn.textContent = 'أرسل',1500);
  });

  // Mini canvas wave for visual polish
  const canvas = document.getElementById('waveCanvas');
  const dpr = window.devicePixelRatio || 1;
  function resizeCanvas(){
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  function drawWave(t){
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.save();
    ctx.scale(dpr,dpr);
    ctx.translate(0, h/dpr/2);
    ctx.beginPath();
    for(let x=0;x<=420;x+=10){
      const y = Math.sin((x/40) + t/600) * 8 + Math.cos((x/25)+t/800)*4;
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.lineTo(420,200);ctx.lineTo(0,200);ctx.closePath();
    const g = ctx.createLinearGradient(0,-40,420,120);
    g.addColorStop(0,'rgba(124,58,237,0.8)');
    g.addColorStop(1,'rgba(6,182,212,0.6)');
    ctx.fillStyle = g; ctx.globalAlpha = 0.12; ctx.fill();
    ctx.restore();
    requestAnimationFrame(drawWave);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); requestAnimationFrame(drawWave);

})();
