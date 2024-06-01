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
            new Producto(211, "Ernie Ball Hybrid", 55000.50, 3),
            new Producto(712, "Ernie Ball Regular Slinky", 40000, 5),
            new Producto(413, "Ernie Ball Super Slinky", 35000, 3),
            new Producto(314, "Ernie Ball Power Slynky", 50000.50, 8),
            new Producto(814, "Ernie Ball Slynky Cobalt", 55000.80, 4)
            
        ];
        this.carrito = []
    }

    productosDisponibles() {
        let productosLista = `Nuestros productos:\n\n`;
        this.productos.forEach((producto) => {
            productosLista += `Código:  ${producto.identificador}  -  ${producto.nombre} - $${producto.precio} - stock: ${producto.cantidad}unds.\n`;
        });
        alert(productosLista);
    }

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
                alert(`Se agregaron ${cantidad} unidades de ${producto.nombre}`);
            }
        } else {
            alert(`No se encuentra el producto`);
        }
    }



    verCarrito() {
        let productosCarrito = `Productos ingresados:\n\n`;
        let totalCarrito = 0;
        this.carrito.forEach((item) => {
            const totalItem = item.producto.precio * item.cantidad;
            productosCarrito += `${item.producto.nombre} - Precio und: $${item.producto.precio} - Cant.: ${item.cantidad} - $${totalItem}\n\n\n`;
            totalCarrito += totalItem;
        });
        productosCarrito += `Total: $${totalCarrito}`;
        alert(productosCarrito);
    }
}

const tienda = new Tienda();

let agregarMasProductos = true;

while (agregarMasProductos) {
    tienda.productosDisponibles();

    const identificadorProducto = parseInt(prompt(`Ingrese el CODIGO del producto que desea agregar al carrito:`));
    const cantidadProducto = parseInt(prompt(`Ingrese la cantidad:`));

    if (isNaN(identificadorProducto) || identificadorProducto < 0 || isNaN(cantidadProducto) || cantidadProducto <= 0) {
        alert(`Código de producto y/o la cantidad ingresada son incorrectas`);
    } else {
        tienda.agregarAlCarrito(identificadorProducto, cantidadProducto);
    }

    let respuestaUsuario = prompt(`¿Quieres agregar otro producto al carrito? (responde 'si' para continuar comprando, o 'no' para finalizar)`).toLowerCase();

    do {
        if (respuestaUsuario !== `si` && respuestaUsuario !== `no`) {
            respuestaUsuario = prompt(`Por favor ingresa 'si' para realizar otra operación, o 'no' para salir.`);
        };
    } while (respuestaUsuario !== `si` && respuestaUsuario !== `no`);


    if (respuestaUsuario === `si`) {

    } else{
        agregarMasProductos = false;
        tienda.verCarrito();
        alert(`Gracias por elegirnos`);
    }
}

