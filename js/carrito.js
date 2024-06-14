class Producto {
    constructor(identificador, nombre, precio, cantidad) {
        this.identificador = parseInt(identificador);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
    }
}


class Tienda {
    constructor() {
        this.productos = [
            new Producto(211, "Ernie Ball Hybrid", 55000, 3),
            new Producto(712, "Ernie Ball Regular Slinky", 40000, 5),
            new Producto(413, "Ernie Ball Super Slinky", 35000, 3),
            new Producto(314, "Ernie Ball Power Slynky", 50000, 8),
            new Producto(814, "Ernie Ball Slynky Cobalt", 55000, 4)
        ];
        this.carrito = []
    };

    // productosDisponibles() {
    //     let productosLista = `Nuestros productos:\n\n`;
    //     this.productos.forEach((producto) => {
    //         productosLista += `Código:  ${producto.identificador}  -  ${producto.nombre} - $${producto.precio} - stock: ${producto.cantidad}\n`;
    //     });
    //     alert(productosLista);
    // }

    agregarAlCarrito(identificador, cantidad) {
        const producto = this.productos.find((producto) => producto.identificador === identificador);

        if (producto) {
            if (producto.cantidad < cantidad) {
                alert(`La cantidad ingresada es mayor al stock disponible`);
            } else {
                const item = {
                    producto: producto,
                    cantidad: cantidad
                };
                this.carrito.push(item);
                producto.cantidad -= cantidad;
            }
        } else {
            alert(`No se encuentra el producto`);
        }
    }


    verCarrito() {
        const tbody = document.querySelector('#carrito tbody');
        tbody.innerHTML = ''; 
    
        let totalCarrito = 0;
        this.carrito.forEach((item) => {
            const totalItem = parseFloat(item.producto.precio * item.cantidad);
            totalCarrito += totalItem;
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.producto.nombre}</td>
                <td>$${item.producto.precio}</td>
                <td>${item.cantidad}</td>
                <td>$${totalItem}</td>
                <td><button class="btn-eliminar">Eliminar</button></td>
            `;
            tbody.appendChild(row);
        });
    
        const totalCarritoElemento = document.getElementById('total-carrito');
        totalCarritoElemento.textContent = `$${totalCarrito}`;
    }

}


const tienda = new Tienda();
const cardContainer = document.querySelector('.card__container');

tienda.productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="./css/assets/img/cuerdas/cuerdas.webp" alt="${producto.nombre}">
        <div class="card-content">
            <h3>${producto.nombre}</h3>
            <p>ID: ${producto.identificador}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <div class="price-buy">
                <span class="price">$${(producto.precio / 1000).toFixed(3)}</span>
                <button class="buy-btn" data-id="${producto.identificador}">Añadir al carrito</button>
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
});



// let agregarMasProductos = true;

// while (agregarMasProductos) {
//     tienda.productosDisponibles();
//     const identificadorProducto = parseInt(prompt(`Ingrese el CODIGO del producto que desea agregar al carrito:`));
//     const cantidadProducto = parseInt(prompt(`Ingrese la cantidad:`));

//     if (isNaN(identificadorProducto) || identificadorProducto < 0 || isNaN(cantidadProducto) || cantidadProducto <= 0) {
//         alert(`Código de producto y/o la cantidad ingresada son incorrectas`);
//     } else {
//         tienda.agregarAlCarrito(identificadorProducto, cantidadProducto);
//     }

//     const respuestaUsuario = prompt(`¿Quieres agregar otro producto al carrito? (responde 'si' para continuar agregando productos, o 'no' para ver tu carrito)`).toLowerCase();
//     do {
//         if (respuestaUsuario !== `si` && respuestaUsuario !== `no`) {
//             respuestaUsuario = prompt(`Por favor ingresa 'si' para realizar otra operación, o 'no' para salir.`);
//         };
//     } while (respuestaUsuario !== `si` && respuestaUsuario !== `no`);


//     if (respuestaUsuario === `si`) {

//     } else {
//         agregarMasProductos = false;
//         alert(`Gracias por elegirnos`);
//         tienda.verCarrito();
//     }
// };

