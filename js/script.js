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
            new Producto(211, "Ernie Ball Hybrid", 500, 3),
            new Producto(712, "Ernie Ball Regular Slinky", 1000, 5),
            new Producto(413, "Ernie Ball Super Slinky", 1500, 3),
            new Producto(314, "Ernie Ball Power Slynky", 700, 8)
        ];
        this.carrito = []
    }

    productosDisponibles() {
        let productosLista = `Nuestros productos:\n`;
        this.productos.forEach((producto) => {
            productosLista += `Código de producto: ${producto.identificador}. ${producto.nombre} - $${producto.precio} - stock: ${producto.cantidad}\n`;
        });
        alert(productosLista);
    }

    agregarAlCarrito(identificador, cantidad) {
        const producto = this.productos.find((producto) => producto.identificador === identificador);

        if (producto) {
            const item = {
                producto: producto,
                cantidad: cantidad
            }
            this.carrito.push(item);
            alert(`Se agregaron ${cantidad} unidades de ${producto.nombre}`);
        }
    }



}

const tienda = new Tienda();

let agregarMasProductos = true;

while (agregarMasProductos) {
    tienda.productosDisponibles();

    const identificadorProducto = parseInt(prompt(`Ingrese el CODIGO del producto que desea agregar al carrito:`));
    
    if (isNaN(identificadorProducto)) {
        alert(`Código de producto incorrecto`);
    } else {
        const cantidadProducto = parseInt(prompt(`Ingrese la cantidad:`));
        if (isNaN(cantidadProducto))
        tienda.agregarAlCarrito(identificadorProducto, cantidadProducto);
    }

    let respuestaUsuario = prompt(`¿Quieres agregar otro producto al carrito? (responde 'si' para continuar comprando, o 'no' para finalizar)`).toLowerCase();

    do {
        if (respuestaUsuario !== `si` && respuestaUsuario !== `no`) {
            respuestaUsuario = prompt(`Por favor ingresa 'si' para realizar otra operación, o 'no' para salir.`);
        };
    } while (respuestaUsuario !== `si` && respuestaUsuario !== `no`);


    if (respuestaUsuario === `si`) {

    } else {
        agregarMasProductos = false;
        tienda.verCarrito();
        alert(`Gracias por elejirnos`);
    }
}

