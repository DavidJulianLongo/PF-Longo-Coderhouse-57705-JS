class Tienda {
    constructor() {
        this.productos = [];
    };
}

const tienda = new Tienda();

const cardContainer = document.querySelector('.card-container');
const carrito = document.getElementById('carrito');
const carritoBody = document.getElementById('carrito-body');
const totalCarrito = document.getElementById('total-carrito');
const btnComprar = document.querySelector('#btn-comprar');


// Genera las cards para mostrar cada uno de los productos de la tienda
const mostrarProductos = (productos) => {
    cardContainer.innerHTML = '';
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="card-content">
                <h5>${producto.nombre}</h5>
                <p>Stock: ${producto.stock < 5 ? 'Poco stock' : 'En stock'}</p>
                <div class="price-buy">
                    <span class="price">$${(producto.precio)}</span>
                    <button class="agregar-btn" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
    aniadirALs();
}


// Carga los productos desde el JSON y luego los muestra
const cargarProductos = async () => {
    const resp = await fetch('./productos.json');
    const productos = await resp.json();
    tienda.productos = productos;
    mostrarProductos(productos);
}


// Agrega eventos a todos los botones y añade el producto al LS
function aniadirALs() {
    const btnAniadir = document.querySelectorAll('.agregar-btn');
    btnAniadir.forEach(btn => {
        btn.addEventListener('click', () => {
            const productoId = parseInt(btn.getAttribute('data-id'));
            const productoAgregado = tienda.productos.find(producto => producto.id === productoId);

            let itemEnLs = localStorage.getItem(`producto_${productoId}`);
            itemEnLs = itemEnLs ? JSON.parse(itemEnLs) : { ...productoAgregado, cantidad: 0 };

            if (itemEnLs.cantidad < productoAgregado.stock) {
                itemEnLs.cantidad += 1;
                localStorage.setItem(`producto_${productoId}`, JSON.stringify(itemEnLs));

                Toastify({
                    avatar: productoAgregado.img,
                    text: ' se añadió a tu carrito',
                    duration: 1000,
                    className: 'info',
                    style: {
                        background: '#27ae60',
                    }
                }).showToast();

                mostrarDesdeLs();
            } else {
                Swal.fire({
                    imageUrl: `${productoAgregado.img}`,
                    text: `${productoAgregado.nombre} no cuenta con suficiente stock...!!!`,
                });
            }
        });
    });
}

// Carga y muestra productos desde el LS en el carrito
function mostrarDesdeLs() {
    carritoBody.innerHTML = '';
    let total = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const productoEnLs = JSON.parse(localStorage.getItem(key));
        const subtotal = productoEnLs.precio * productoEnLs.cantidad;
        total += subtotal;

        const row = `
                <tr>
                    <td>${productoEnLs.nombre}</td>
                    <td>$${productoEnLs.precio.toFixed(2)}</td>
                    <td>${productoEnLs.cantidad}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td><button class="btn-eliminar" data-key="${key}">Eliminar</button></td>
                </tr>
            `;
        carritoBody.innerHTML += row;
    }
    totalCarrito.innerHTML = `$${total.toFixed(2)}`;
};


// Elimina todos los productos del LS (y del carrito) al hacer click en Comprar y muestra un mensaje de compra exitosa
function comprar() {
    btnComprar.addEventListener('click', () => {
        for (let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            const productos = JSON.parse(localStorage.getItem(key));

            if (productos){
                localStorage.clear();
                mostrarDesdeLs();
                aside.classList.remove('aside-visible');
        
                Swal.fire({
                    title: "Compra realizada con éxito",
                    text: "Gracias por elegirnos.!!!",
                    icon: "success",
                    showCloseButton: true
                });
            }
        }
    })
}


// Filtra los productos por marca
function filtrarPorMarca() {
    const marcasProductos = ["Ernie Ball", "D'addario", "Rotosound", "DR Neon", "Fender"];

    for (const marca of marcasProductos) {
        const ulNavLi = document.createElement('li');
        ulNavLi.innerHTML = marca;
        ulNav.appendChild(ulNavLi);

        ulNavLi.addEventListener('click', () => {
            const productosFiltrados = tienda.productos.filter(producto => producto.nombre.includes(marca),);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            mostrarProductos(productosFiltrados);
        });
    }
}


//Muestra todos los productos al hacer click en el nombre de la pag
shopName.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarProductos(tienda.productos);
});


//Elimina productos del carrito y LS
carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-eliminar')) {
        const key = event.target.getAttribute('data-key');
        let itemEnLs = JSON.parse(localStorage.getItem(key));

        itemEnLs.cantidad > 1 ? (itemEnLs.cantidad -= 1, localStorage.setItem(key, JSON.stringify(itemEnLs))) : localStorage.removeItem(key);

        Toastify({
            avatar: itemEnLs.img,
            text: ' se eliminó de tu carrito',
            duration: 1000,
            className: 'info',
            style: {
                background: '#ff4d4d',
            }
        }).showToast();

        mostrarDesdeLs();
    }
});


// Muestra los productos después de que se cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    mostrarDesdeLs();
    filtrarPorMarca();
    comprar();
});

