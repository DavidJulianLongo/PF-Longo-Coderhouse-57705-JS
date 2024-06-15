class Producto {
    constructor(identificador, nombre, precio, stock, rutaImg) {
        this.identificador = parseInt(identificador);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.rutaImg = rutaImg;
    }
}


class Tienda {
    constructor() {
        this.productos = [
            new Producto(211, "Ernie Ball Hybrid", 55000, 10, "./css/assets/img/cuerdas/hybrid.png"),
            new Producto(712, "Ernie Ball Regular Slinky", 47000, 12, "./css/assets/img/cuerdas/regular.png"),
            new Producto(413, "Ernie Ball Super Slinky", 43500, 3, "./css/assets/img/cuerdas/super.png"),
            new Producto(425, "Ernie Ball Extra Slinky", 40500, 3, "./css/assets/img/cuerdas/extra.png"),
            new Producto(437, "Ernie Ball Hyper Slinky", 40500, 3, "./css/assets/img/cuerdas/hyper.png"),
            new Producto(314, "Ernie Ball Power Slynky", 56000, 8, "./css/assets/img/cuerdas/power.png"),
            new Producto(814, "Ernie Ball Beefy Slynky", 65500, 4, "./css/assets/img/cuerdas/beefy.png")
        ];
    };
}


// Hago un instancia de tienda (con todos su productos)
const tienda = new Tienda();

// Genero las cards para mostrar cada uno de los productos de la tienda
const cardContainer = document.querySelector('.card-container');

tienda.productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${producto.rutaImg}" alt="${producto.nombre}">
        <div class="card-content">
            <h3>${producto.nombre}</h3>
            <p>ID: ${producto.identificador}</p>
            <p>Stock: ${producto.stock}</p>
            <span class="msj-stock" style="color: red; display: none; font-size: 10px;">Stock insuficiente</span>
            <div class="price-buy">
                <span class="price">$${(producto.precio)}</span>
                <button class="buy-btn" data-id="${producto.identificador}">Añadir al carrito</button>
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
});


// Función para cargar y mostrar productos desde el LS en el carrito
function mostrarDesdeLs() {
    const carritoBody = document.getElementById('carrito-body');
    const totalCarrito = document.getElementById('total-carrito');
    carritoBody.innerHTML = '';
    let total = 0;

    // Itera sobre los productos del LS
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const productEnLs = JSON.parse(localStorage.getItem(key));
        const subtotal = productEnLs.precio * productEnLs.cantidad;
        total += subtotal;

        const row = `
                <tr>
                    <td>${productEnLs.nombre}</td>
                    <td>$${productEnLs.precio.toFixed(2)}</td>
                    <td>${productEnLs.cantidad}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td><button class="btn-eliminar" data-key="${key}">Eliminar</button></td>
                </tr>
            `;
        carritoBody.innerHTML += row;
    }
    totalCarrito.textContent = `$${total.toFixed(2)}`;
};


document.addEventListener('DOMContentLoaded', mostrarDesdeLs);

// Itera sobre cada botón encontrado con querySelectorAll para acceder al atributo data-id de cada uno
// y asi poder ir agregando el producto al localStorage
const btnAniadir = document.querySelectorAll('.buy-btn')
btnAniadir.forEach(btn => {
    btn.addEventListener('click', () => {
        //parseInt para pasarlo a numero ya que el data-id entregaba un string
        const productoId = parseInt(btn.getAttribute('data-id'));
        const productoAgregado = tienda.productos.find(p => p.identificador === productoId);

        // verificamos si el producto está en el LS, de lo contrario el valor será null
        let itemEnLs = localStorage.getItem(`producto_${productoId}`);
        itemEnLs = itemEnLs ? JSON.parse(itemEnLs) : { ...productoAgregado, cantidad: 0 };

        // Verifica si hay suficiente stock antes de añadir
        if (itemEnLs.cantidad < productoAgregado.stock) {
            itemEnLs.cantidad += 1;
            localStorage.setItem(`producto_${productoId}`, JSON.stringify(itemEnLs));

            // Actualizar el carrito después de agregar el producto
            mostrarDesdeLs();
        }
    });
});


//Eliminar productos del carrito y LS
const carrito = document.getElementById('carrito');
carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const key = event.target.getAttribute('data-key');
        let itemEnLs = JSON.parse(localStorage.getItem(key));

        itemEnLs.cantidad > 1 ? (itemEnLs.cantidad -= 1, localStorage.setItem(key, JSON.stringify(itemEnLs))) : localStorage.removeItem(key);

        mostrarDesdeLs();
    }
});










