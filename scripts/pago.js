document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de "Continue to checkout"
    const checkoutButton = document.querySelector('.btn');
  
    // Agrega un evento de clic al botón de "Continue to checkout"
    checkoutButton.addEventListener('click', function(event) {
      // Obtiene todos los campos de entrada
      const inputs = document.querySelectorAll('input');
      let fieldsFilled = true;
  
      // Verifica si todos los campos están llenos
      inputs.forEach(function(input) {
        if (input.value === '') {
          fieldsFilled = false;
        }
      });
  
      // Si no todos los campos están llenos, y evita continuar con el pago
      if (!fieldsFilled) {
        event.preventDefault();
        alert("Por favor, completa todos los campos antes de continuar.");
      } else {
        // Muestra la alerta y redirige solo si todos los campos están llenos
        alert("Your order has been completed and will soon arrive at the indicated location.");
        window.location.href = "/public/index.html"; // Redirige a la pantalla principal
      }
    });
  });
