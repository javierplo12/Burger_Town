document.addEventListener('DOMContentLoaded', async () => {
    try {
        const url = 'http://localhost:8080/Buger_Town/Controller?ACTION=PRODUCTO.FIND_ALL';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
        ready(); // Initialize the event listeners for dynamically added buttons
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
                    <p>${parseFloat(precio).toFixed(2).replace('.', ',')} €</p>
                </div>
                <div class="contenedor-boton-item">
                    <button class="boton-item">ADD TO CART</button>
                </div>
            </div>
        `;
        document.querySelector(`.contenedor-categoria.${categoryClass} .items`).insertAdjacentHTML('beforeend', itemHTML);
    });
}

document.addEventListener('DOMContentLoaded', ready);

function ready() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('boton-item')) {
            agregarAlCarritoClicked(event);
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('btn-eliminar')) {
            eliminarItemCarrito(event);
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('sumar-cantidad')) {
            sumarCantidad(event);
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('restar-cantidad')) {
            restarCantidad(event);
        }
    });

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
    // Redirige a la página de pago
    window.location.href = '/public/pago.html';
}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.closest('.item');
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].getElementsByTagName('img')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.classList.add('carrito-visible');
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var cantidadItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item').length;

    if (cantidadItemsCarrito === 1) {
        var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
        for (var i = 0; i < nombresItemsCarrito.length; i++) {
            if (nombresItemsCarrito[i].innerText === titulo) {
                alert("El producto ya está en el carrito. Puedes eliminarlo o agregar uno más.");
                return;
            }
        }
    }

    var item = document.createElement('div');
    item.classList.add('carrito-item');

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <button class="restar-cantidad">-</button>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <button class="sumar-cantidad">+</button>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">Eliminar</button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    actualizarTotalCarrito();
}


    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <button class="restar-cantidad">-</button>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <button class="sumar-cantidad">+</button>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">Eliminar</button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    actualizarTotalCarrito();


function sumarCantidad(event) {
    var buttonClicked = event.target;
    var item = buttonClicked.closest('.carrito-item');
    var cantidadInput = item.querySelector('.carrito-item-cantidad');
    var cantidadActual = parseInt(cantidadInput.value);
    cantidadActual++;
    cantidadInput.value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 0) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.classList.remove('carrito-visible');
    }
}

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('€', '').replace('.', '').replace(',', '.'));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total += precio * cantidad;
    }
    var formattedTotal = total.toFixed(2).replace('.', ',');

    document.getElementsByClassName('carrito-precio-total')[0].innerText = formattedTotal + ' €';

    localStorage.setItem('totalCarrito', formattedTotal + ' €');
}
