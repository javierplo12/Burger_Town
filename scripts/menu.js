// Obtener todos los botones de añadir al carrito
let botonesAgregar = document.querySelectorAll('.add-to-cart');

// Asignar un controlador de eventos de clic a cada botón
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', function() {
    // Obtener el nombre de la hamburguesa que se está agregando al carrito
    let nombreHamburguesa = this.parentNode.querySelector('h3').textContent;
    // Llamar a la función para agregar la hamburguesa al carrito
    agregarAlCarrito(nombreHamburguesa);
  });
});

// Función para agregar una hamburguesa al carrito
function agregarAlCarrito(nombreHamburguesa) {
  // Obtener los productos del carrito del almacenamiento local
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Agregar la hamburguesa al carrito
  carrito.push(nombreHamburguesa);
  
  // Guardar los productos del carrito en el almacenamiento local
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Actualizar la visualización del carrito
  actualizarCarrito(carrito);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito(carrito) {
  // Obtener el elemento donde se mostrarán los productos en el carrito
  let carritoList = document.getElementById('carrito-list');
  
  // Limpiar la lista antes de actualizarla
  carritoList.innerHTML = "/public/carrito.html";
  
  // Recorrer los productos en el carrito y crear elementos de lista para cada uno
  carrito.forEach(producto => {
    let li = document.createElement('li');
    li.textContent = producto;
    carritoList.appendChild(li);
  });
}

// Al cargar la página, actualizar el carrito si hay productos guardados en el almacenamiento local
document.addEventListener('DOMContentLoaded', function() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  actualizarCarrito(carrito);
});

