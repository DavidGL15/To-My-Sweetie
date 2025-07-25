let florVisible = false;

// Función para crear partículas (DEBE ESTAR FUERA de las otras funciones)
function crearParticulas() {
  const heart = document.querySelector('.heart');
  const heartRect = heart.getBoundingClientRect();
  const centerX = heartRect.left + heartRect.width/2;
  const centerY = heartRect.top + heartRect.height/2;
  
  // Crear 15 partículas
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const particula = document.createElement('div');
      
      // Estilos básicos de la partícula
      Object.assign(particula.style, {
        position: 'fixed',
        width: '25px',
        height: '25px',
        backgroundColor: `hsl(${Math.random() * 60 + 330}, 100%, 70%)`,
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        pointerEvents: 'none',
        zIndex: '5',
        left: `${centerX}px`,
        top: `${centerY}px`,
        transform: 'translate(-50%, -50%)'
      });
      
      document.body.appendChild(particula);
      
      // Animación con GSAP
      gsap.to(particula, {
        x: `+=${(Math.random() - 0.5) * 500}`,
        y: `+=${(Math.random() - 0.5) * 500}`,
        opacity: 0,
        scale: 2,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particula.remove()
      });
    }, i * 200);
  }
}

function setup() {
  let canvas = createCanvas(windowWidth * 0.6, windowHeight, WEBGL);
  canvas.parent('lotus-container');
  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  if (!florVisible) return;
  
  background(0);
  orbitControl(4, 4);
  rotateX(-30);
  dibujarFlor();
}

function dibujarFlor() {
  let size = min(width, height) * 0.3;
  
  for(let r = 0; r <= 1; r += 0.02){
    beginShape(POINTS);
    stroke(310, (r*50-30)*3+5, 100);
    for(let theta = 0; theta <= 180*8; theta += 1.5){
      let phi = (180/2.5)*Math.exp(-theta/(6.5*180));
      let petalCut = 0.5+abs(sin(2.25*theta)+120*sin(2.25*theta))/360;
      let hangDown = 2.3*pow(r, 2)*pow(0.8*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        let pX = size * petalCut * (r * sin(phi)+hangDown*cos(phi)) * sin(theta);
        let pY = -size * petalCut * (r * cos(phi)-hangDown*sin(phi));
        let pZ = size * petalCut * (r * sin(phi)+hangDown*cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.6, windowHeight);
}

// Animación del corazón
const heart = document.querySelector(".heart");
const mainContent = document.querySelector("#main-content");
const letterContainer = document.querySelector("#letter-container");
// Función modificada para crear partículas de corazones
function crearParticulas() {
  const colors = ["#ff3366", "#ff0066", "#ff1493", "#ff69b4", "#ff00ff"]; // Colores rosados/rojos
  const particleCount = 100; // Cantidad de corazones
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.innerHTML = "❤"; // Corazón Unicode
    // También puedes usar: particle.textContent = "♥";
    
    // Estilos del corazón
    particle.style.position = "absolute";
    particle.style.fontSize = `${Math.random() * 30 + 20}px`; // Tamaño aleatorio entre 10px y 30px
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.userSelect = "none";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.opacity = "0.8";
    particle.style.fontWeight = "bold";
    
    // Posición inicial (centro del corazón)
    const heartRect = heart.getBoundingClientRect();
    particle.style.left = `${heartRect.left + heartRect.width / 2}px`;
    particle.style.top = `${heartRect.top + heartRect.height / 2}px`;
    
    document.body.appendChild(particle);
    
    // Animación GSAP para cada corazón
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 800, // Movimiento horizontal aleatorio
      y: (Math.random() - 0.5) * 800, // Movimiento vertical aleatorio
      opacity: 0,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 3, // Duración entre 2 y 5 segundos
      ease: "power1.out",
      onComplete: () => {
        particle.remove(); // Eliminar el elemento cuando termina la animación
      }
    });
  }
}

gsap.to(heart, {
  rotation: 360,
  scale: 0.05,
  duration: 6,
  ease: "power2.inOut",
  onStart: crearParticulas, // <-- Aquí llamamos a las partículas
  onComplete: () => {
    heart.style.display = "none";
    mainContent.classList.remove("hidden");
    florVisible = true;
    setTimeout(() => {
      letterContainer.classList.remove("hidden-letter");
      letterContainer.classList.add("show-letter");
      
      gsap.from("#letter-container", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
        delay: 0.3
      });
    }, 300);
    
    gsap.from("#lotus-container", {
      x: -windowWidth * 0.6,
      duration: 1.5,
      ease: "power2.out"
    });
    
    gsap.from(".letter-container", {
      x: windowWidth * 0.4,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.3
    });
  }
});

// Animación de la carta
$(document).ready(function(){
  $(".container").mouseenter(function(){
    $(".card").stop().animate({
      top:"-90px"
    },"slow");
  }).mouseleave(function(){
    $(".card").stop().animate({
      top:0
    }, "slow");
  });
});

// En tu archivo JS principal (ejecuta esto en ambas páginas)
document.addEventListener('DOMContentLoaded', function() {
const bgMusic = document.getElementById('bg-music');
bgMusic.currentTime = 30; // Segundos

// Asegurar que no se reinicie al cambiar de página
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
  
  // Intenta reproducir automáticamente y maneja errores
  function handleAutoplay() {
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si el autoplay falla, espera a que el usuario interactúe con la página
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

  // Configuración inicial
  bgMusic.volume = 0.3; // Volumen bajo (30%)
  handleAutoplay();
});

