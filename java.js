document.addEventListener('DOMContentLoaded', function() {
    // cora fondo
    function createHearts() {
        const container = document.body;
        const heartCount = 80;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-bg';
            
            // Posición pero es aleatoria por lo del random y vh/w para adaptarse
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            
            // Tamaño
            const size = Math.random() * 20 + 10;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Opacidad 
            heart.style.opacity = Math.random() * 0.7 + 0.3;
            
            // Velocidad de animación 
            const duration = Math.random() * 10 + 10;
            heart.style.animation = `float ${duration}s infinite linear`;
            
            // Color aleatorio (rosas/rojos)
            const hue = Math.random() * 30 + 330; // Tonos entre rojo y rosa
            heart.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
            
            container.appendChild(heart);
        }
    }
    
    createHearts();
});
document.addEventListener('DOMContentLoaded', function() {
  // Reproducir a partir del minuto 1:30 (90 segundos)
const bgMusic = document.getElementById('bg-music');
bgMusic.currentTime = 30; // Segundos

// no se reinicia al cambiar de página
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('musicTime', bgMusic.currentTime);
});

window.addEventListener('load', () => {
  const savedTime = sessionStorage.getItem('musicTime');
  if (savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
  } else {
    bgMusic.currentTime = 30; // Inicio por defecto a los 90s
  }
  bgMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
});
  
  function handleAutoplay() {
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        document.body.addEventListener('click', function once() {
          bgMusic.play();
          document.body.removeEventListener('click', once);
        });
      });
    }
  }

  // Sincronización entre páginas
  if (sessionStorage.getItem('musicTime')) {
    bgMusic.currentTime = parseFloat(sessionStorage.getItem('musicTime'));
  }

  // Guardar tiempo actual al salir de la página
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicTime', bgMusic.currentTime);
  });

  bgMusic.volume = 0.3; // Volumen bajo (30%)
  handleAutoplay();
});