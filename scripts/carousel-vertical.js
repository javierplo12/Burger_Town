document.addEventListener("DOMContentLoaded", function () {
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-vertical-item');
    let currentIndex = 0;
    const intervalTime = 5000; // Cambia cada 5 segundos

    // Función para activar una diapositiva específica
    function activateSlide(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));

        dots[index].classList.add('active');
        slides[index].classList.add('active');
    }

    // Función para cambiar a la siguiente diapositiva
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        activateSlide(currentIndex);
    }

    // Cambiar automáticamente a la siguiente diapositiva cada intervalTime milisegundos
    setInterval(nextSlide, intervalTime);

    // Agregar event listener a los puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activateSlide(index);
            currentIndex = index;
        });
    });

});