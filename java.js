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