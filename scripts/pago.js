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
  
      // Si no todos los campos están llenos, evita el comportamiento predeterminado del botón
      if (!fieldsFilled) {
        event.preventDefault();
        alert("Por favor, completa todos los campos antes de continuar.");
      } else {
        // Muestra la alerta y redirige solo si todos los campos están llenos
        alert("¡Tu pedido ha sido pagado y pronto llegará, A la ubicacion Indicada !");
        window.location.href = "/public/index.html"; // Redirige a la pantalla principal
      }
    });
  });
  