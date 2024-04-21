const carousel = document.querySelector('.carousel-slide');
let isDown = false;
let startX;
let scrollLeft;
let requestId;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    cancelAnimationFrame(requestId);
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    cancelAnimationFrame(requestId);
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1; // Ajusta la velocidad de desplazamiento
    carousel.scrollLeft = scrollLeft - walk;

    // Si llega al final del carrusel, vuelve a mostrar el primer elemento
    if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
    } else if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0;
    }
});