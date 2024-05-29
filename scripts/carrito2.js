document.addEventListener('DOMContentLoaded', async () => {
    try {
        const url = 'http://localhost:8080/Buger_Town/Controller?ACTION=PRODUCTO.FIND_ALL';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
        ready(); 
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});

function displayProducts(products) {
    const categories = {
        1: 'sides',
        2: 'burgers',
        3: 'desserts',
        4: 'drinks'
    };

    products.forEach(product => {
        const { nombre, descripcion, precio, id_categoria } = product;
        const categoryClass = categories[id_categoria];
        const itemHTML = `
            <div class="item">
                <div class="titulo-item">
                    <h3>${nombre}</h3>
                </div>
                <div class="img-item">
                    <img src="../img/${nombre.toLowerCase().replace(/\s/g, '_')}.png" alt="${nombre}">
                </div>
                <div class="desc-item">
                    <p>${descripcion}</p>
                </div>
                <div class="precio-item">
                    <p>${precio.toFixed(2).replace('.', ',')} €</p>
                </div>
                <div class="contenedor-boton-item">
                    <button class="boton-item">ADD TO CART</button>
                </div>
            </div>
        `;
        document.querySelector(`.contenedor-categoria.${categoryClass} .items`).insertAdjacentHTML('beforeend', itemHTML);
    });
}

function ready() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('boton-item')) {
            agregarAlCarritoClicked(event);
        } else if (event.target && event.target.classList.contains('btn-eliminar')) {
            eliminarItemCarrito(event);
        } else if (event.target && event.target.classList.contains('sumar-cantidad')) {
            sumarCantidad(event);
        } else if (event.target && event.target.classList.contains('restar-cantidad')) {
            restarCantidad(event);
        }
    });

    document.querySelector('.btn-pagar').addEventListener('click', pagarClicked);
}

function pagarClicked() {
    window.location.href = '/public/pago.html';
}

function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.closest('.item');
    const titulo = item.querySelector('.titulo-item').innerText;
    const precioTexto = item.querySelector('.precio-item').innerText;
    const precio = parseFloat(precioTexto.replace('€', '').replace('.', '').replace(',', '.'));
    const imagenSrc = item.querySelector('.img-item img').src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    const carrito = document.querySelector('.carrito');
    carrito.classList.add('carrito-visible');
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.querySelector('.carrito-items');
    const nombresItemsCarrito = itemsCarrito.querySelectorAll('.carrito-item-titulo');

    for (let nombreItemCarrito of nombresItemsCarrito) {
        if (nombreItemCarrito.innerText === titulo) {
            alert("The product is already in the cart. You can delete it or add one more.");
            return;
        }
    }

    const item = document.createElement('div');
    item.classList.add('carrito-item-fetch');

    const itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <button class="restar-cantidad"> <i class="fa-solid fa-minus restar-cantidad"></i>  </button>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <button class="sumar-cantidad"> <i class="fa-solid fa-plus sumar-cantidad"></i>  </button>
                </div>
                <span class="carrito-item-precio">${precio.toFixed(2).replace('.', ',')} €</span>
            </div>
            <button class="btn-eliminar"><i class="fa-solid fa-trash"></i>  </button>
                      
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    actualizarTotalCarrito();
}

function sumarCantidad(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.closest('.carrito-item');
    const cantidadInput = item.querySelector('.carrito-item-cantidad');
    let cantidadActual = parseInt(cantidadInput.value);
    cantidadActual++;
    cantidadInput.value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.closest('.carrito-item');
    const cantidadInput = item.querySelector('.carrito-item-cantidad');
    let cantidadActual = parseInt(cantidadInput.value);
    if (cantidadActual > 1) {
        cantidadActual--;
        cantidadInput.value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    const buttonClicked = event.target.closest('.btn-eliminar');
    const item = buttonClicked.closest('.carrito-item');
    item.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function ocultarCarrito() {
    const carritoItems = document.querySelector('.carrito-items');
    if (carritoItems.childElementCount === 0) {
        const carrito = document.querySelector('.carrito');
        carrito.classList.remove('carrito-visible');
    }
}

function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll('.carrito-item');
    let total = 0;

    carritoItems.forEach(item => {
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.innerText.replace('€', '').replace('.', '').replace(',', '.'));
        const cantidad = parseInt(item.querySelector('.carrito-item-cantidad').value);
        total += precio * cantidad;
    });

    const formattedTotal = total.toFixed(2).replace('.', ',');
    document.querySelector('.carrito-precio-total').innerText = formattedTotal + ' €';
    localStorage.setItem('totalCarrito', formattedTotal + ' €');
}
