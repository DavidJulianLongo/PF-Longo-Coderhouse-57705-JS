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
            new Producto(211, "Ernie Ball Hybrid Slinky", 55000, 10, "./css/assets/img/cuerdas/hybrid.png"),
            new Producto(310, "Rotosound BS66", 70500, 5, "./css/assets/img/cuerdas/BS66.jpg"),
            new Producto(170, "D'addario EPBB170", 67500, 2, "./css/assets/img/cuerdas/daddarioEPBB170.webp"),
            new Producto(311, "Rotosound RS66LE", 70500, 7, "./css/assets/img/cuerdas/RS66LE.jpg"),
            new Producto(212, "Ernie Ball Regular Slinky", 47000, 12, "./css/assets/img/cuerdas/regular.png"),
            new Producto(213, "Ernie Ball Super Slinky", 43500, 3, "./css/assets/img/cuerdas/super.png"),
            new Producto(160, "D'addario EXL160", 70500, 2, "./css/assets/img/cuerdas/daddarioEXL160.webp"),
            new Producto(312, "Rotosound RS66LF", 43500, 3, "./css/assets/img/cuerdas/RS66LF.jpg"),
            new Producto(214, "Ernie Ball Extra Slinky", 40500, 3, "./css/assets/img/cuerdas/extra.png"),
            new Producto(313, "Rotosound RS66LH", 43500, 3, "./css/assets/img/cuerdas/RS66Lh.jpg"),
            new Producto(171, "D'addario EXL170", 43500, 3, "./css/assets/img/cuerdas/daddarioEXL170.webp"),
            new Producto(215, "Ernie Ball Hyper Slinky", 40500, 3, "./css/assets/img/cuerdas/hyper.png"),
            new Producto(314, "Rotosound RDB66LD", 43500, 5, "./css/assets/img/cuerdas/RDB66LD.jpg"),
            new Producto(216, "Ernie Ball Power Slynky", 56000, 8, "./css/assets/img/cuerdas/power.png"),
            new Producto(172, "D'addario EXL220-5", 43500, 3, "./css/assets/img/cuerdas/daddarioEXL220-5.webp"),
            new Producto(217, "Ernie Ball Beefy Slynky", 65500, 4, "./css/assets/img/cuerdas/beefy.png"),
            new Producto(315, "Rotosound RS66LN", 43500, 5, "./css/assets/img/cuerdas/RS66LN.jpg"),
            
        ];
    };
}




// Genera las cards para mostrar cada uno de los productos de la tienda
const cardContainer = document.querySelector('.card-container');

function mostrarProductos(productos) {
    cardContainer.innerHTML = '';
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${producto.rutaImg}" alt="${producto.nombre}">
            <div class="card-content">
                <h3>${producto.nombre}</h3>
                <p>ID: ${producto.identificador}</p>
                <p>Stock: ${producto.stock}</p>
                <div class="price-buy">
                    <span class="price">$${(producto.precio)}</span>
                    <button class="buy-btn" data-id="${producto.identificador}">Añadir al carrito</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
    });
}


// Se instacia la tienda  y luego se muestran los productos
const tienda = new Tienda();
mostrarProductos(tienda.productos);



// Carga y muestra productos desde el LS en el carrito
function mostrarDesdeLs() {
    const carritoBody = document.getElementById('carrito-body');
    const totalCarrito = document.getElementById('total-carrito');
    carritoBody.innerHTML = '';
    let total = 0;

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
    totalCarrito.innerHTML = `$${total.toFixed(2)}`;
};



// Itera sobre cada botón "añadir al carrito", 
const btnAniadir = document.querySelectorAll('.buy-btn')
btnAniadir.forEach(btn => {
    btn.addEventListener('click', () => {
        //parseamos ya que el data-id entregaba un string
        const productoId = parseInt(btn.getAttribute('data-id'));
        const productoAgregado = tienda.productos.find(p => p.identificador === productoId);

        // verificamos si el producto está en el LS
        let itemEnLs = localStorage.getItem(`producto_${productoId}`);
        itemEnLs = itemEnLs ? JSON.parse(itemEnLs) : { ...productoAgregado, cantidad: 0 };

        // Verifica si hay suficiente stock antes de añadir, si no hay stock no añade productos
        if (itemEnLs.cantidad < productoAgregado.stock) {
            itemEnLs.cantidad += 1;
            localStorage.setItem(`producto_${productoId}`, JSON.stringify(itemEnLs));
            mostrarDesdeLs();
        }
    });
});


//Elimina productos del carrito y LS
const carrito = document.getElementById('carrito');
carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const key = event.target.getAttribute('data-key');
        let itemEnLs = JSON.parse(localStorage.getItem(key));

        itemEnLs.cantidad > 1 ? (itemEnLs.cantidad -= 1, localStorage.setItem(key, JSON.stringify(itemEnLs))) : localStorage.removeItem(key);

        mostrarDesdeLs();
    }
});


document.addEventListener('DOMContentLoaded', mostrarDesdeLs);







