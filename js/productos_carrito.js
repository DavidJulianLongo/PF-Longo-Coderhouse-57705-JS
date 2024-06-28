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
            new Producto(410, "DR Neon Green", 76500, 3, "./css/assets/img/cuerdas/dr_green.jpg"),
            new Producto(170, "D'addario EPBB170", 67500, 2, "./css/assets/img/cuerdas/daddarioEPBB170.jpg"),
            new Producto(311, "Rotosound RS66LE", 70500, 7, "./css/assets/img/cuerdas/RS66LE.jpg"),
            new Producto(212, "Ernie Ball Regular Slinky", 47000, 12, "./css/assets/img/cuerdas/regular.png"),
            new Producto(213, "Ernie Ball Super Slinky", 43500, 3, "./css/assets/img/cuerdas/super.png"),
            new Producto(160, "D'addario EXL160", 70500, 2, "./css/assets/img/cuerdas/daddarioEXL160.jpg"),
            new Producto(411, "DR Neon Multi-color", 82850, 2, "./css/assets/img/cuerdas/dr_multi.jpg"),
            new Producto(312, "Rotosound RS66LF", 43500, 3, "./css/assets/img/cuerdas/RS66LF.jpg"),
            new Producto(214, "Ernie Ball Extra Slinky", 40500, 3, "./css/assets/img/cuerdas/extra.png"),
            new Producto(313, "Rotosound RS66LH", 43500, 3, "./css/assets/img/cuerdas/RS66LH.jpg"),
            new Producto(171, "D'addario EXL170", 43500, 3, "./css/assets/img/cuerdas/daddarioEXL170.jpg"),
            new Producto(412, "DR Neon Orange", 80750, 4, "./css/assets/img/cuerdas/dr_orange.jpg"),
            new Producto(215, "Ernie Ball Hyper Slinky", 40500, 3, "./css/assets/img/cuerdas/hyper.png"),
            new Producto(314, "Rotosound RDB66LD", 43500, 5, "./css/assets/img/cuerdas/RDB66LD.jpg"),
            new Producto(216, "Ernie Ball Power Slynky", 56000, 8, "./css/assets/img/cuerdas/power.png"),
            new Producto(172, "D'addario EXL220-5", 43500, 3, "./css/assets/img/cuerdas/daddarioEXL220-5.jpg"),
            new Producto(217, "Ernie Ball Beefy Slynky", 65500, 4, "./css/assets/img/cuerdas/beefy.png"),
            new Producto(413, "DR Neon Red 5", 95650, 1, "./css/assets/img/cuerdas/dr_red.jpg"),
            new Producto(315, "Rotosound RS66LN", 43500, 5, "./css/assets/img/cuerdas/RS66LN.jpg")

        ];
    };
}



const cardContainer = document.querySelector('.card-container');
const carrito = document.getElementById('carrito');
const carritoBody = document.getElementById('carrito-body');
const totalCarrito = document.getElementById('total-carrito');


// Genera las cards para mostrar cada uno de los productos de la tienda
function mostrarProductos(productos) {
    cardContainer.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${producto.rutaImg}" alt="${producto.nombre}">
            <div class="card-content">
                <h3>${producto.nombre}</h3>
                <p>Stock: ${producto.stock}</p>
                <div class="price-buy">
                    <span class="price">$${(producto.precio)}</span>
                    <button class="agregar-btn" data-id="${producto.identificador}">Agregar al carrito</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
    });
    aniadirALs();
}


// Carga y muestra productos desde el LS en el carrito
function mostrarDesdeLs() {
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


// Agrega eventos a todos los botones
function aniadirALs() {
    const btnAniadir = document.querySelectorAll('.agregar-btn');
    btnAniadir.forEach(btn => {
        btn.addEventListener('click', () => {
            const productoId = parseInt(btn.getAttribute('data-id'));
            const productoAgregado = tienda.productos.find(p => p.identificador === productoId);

            let itemEnLs = localStorage.getItem(`producto_${productoId}`);
            itemEnLs = itemEnLs ? JSON.parse(itemEnLs) : { ...productoAgregado, cantidad: 0 };

            if (itemEnLs.cantidad < productoAgregado.stock) {
                itemEnLs.cantidad += 1;
                localStorage.setItem(`producto_${productoId}`, JSON.stringify(itemEnLs));

                Toastify({
                    text: `${productoAgregado.nombre}\nse agregó al carrito`,
                    className: 'info',
                    offset: {
                        x: 120,
                        y: 35
                    },
                    style: {
                        background: '#27ae60',
                    }
                }).showToast();

                mostrarDesdeLs();
            } else {
                Swal.fire({
                    imageUrl: `${productoAgregado.rutaImg}`,
                    text: `${productoAgregado.nombre} no cuenta con suficiente stock...!!!`,
                });
            }
        });
    });
}

// Filtra los productos por marca
function productFilter() {
    const productName = ["Ernie Ball", "D'addario", "Rotosound", "DR Neon"];

    for (const name of productName) {
        const ulNavLi = document.createElement('li');
        ulNavLi.innerHTML = `${name}`;
        ulNav.appendChild(ulNavLi);

        ulNavLi.addEventListener('click', () => {
            const filteredProducts = tienda.productos.filter(producto => producto.nombre.includes(name));
            window.scrollTo({top: 0, behavior: 'smooth'});
            mostrarProductos(filteredProducts);
            
        });
    }
}


//Muestra todos los productos al hacer click en el nombre de la pag
shopName.addEventListener('click', () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
    mostrarProductos(tienda.productos)
} );

//Elimina productos del carrito y LS
carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const key = event.target.getAttribute('data-key');
        let itemEnLs = JSON.parse(localStorage.getItem(key));

        itemEnLs.cantidad > 1 ? (itemEnLs.cantidad -= 1, localStorage.setItem(key, JSON.stringify(itemEnLs))) : localStorage.removeItem(key);

        mostrarDesdeLs();
    }
});



// Se instacia la tienda  y luego se muestran los productos
const tienda = new Tienda();
mostrarProductos(tienda.productos);
productFilter();

document.addEventListener('DOMContentLoaded', mostrarDesdeLs);