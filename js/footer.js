const footer = document.getElementById('footer');
const divFooter = document.createElement('div');
const productos = document.createElement('div');
const redes = document.createElement('div');
const contacto = document.createElement('div');
const productosTitle = document.createElement('h4');
const productosUl = document.createElement('ul');
const creador = document.createElement('div');



footer.appendChild(divFooter);
divFooter.className = 'footer-container';
redes.className = 'footer-redes';
contacto.className = 'footer-contacto';
creador.className = 'creador';


//footer productos 
divFooter.append(productos, redes, contacto, creador);
productos.append(productosTitle, productosUl);
productosTitle.innerHTML = 'Productos';
productosTitle.className = 'footer-tittle'


//Filtra los productos por marca
for (const marca of marcasProductos) {
    const productosUlLi = document.createElement('li');
    productosUlLi.innerHTML = marca;
    productosUl.appendChild(productosUlLi);

    productosUlLi.addEventListener('click', () => {
        const productosFiltrados = tienda.productos.filter(producto => producto.nombre.includes(marca),);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        mostrarProductos(productosFiltrados);
    });
}


// footer redes
redes.innerHTML = `
    <h4 class="footer-tittle">Seguínos</h4>
    <a class="facebook" href="https://www.facebook.com/?locale=es_LA" target="_blank"><i class="text-primary bi bi-facebook "></i></a>
    <a class="ig" href="https://www.instagram.com/" target="_blank"><i class="bi bi-instagram"></i></a>
`;

// footer contacto
contacto.innerHTML = `
    <h4 class="footer-tittle">Contacto</h4>
    <i class="bi bi-telephone-fill"> (011)4765-8545</i>
    <a><i class="bi bi-whatsapp"> 1136451454</i></a>
`;

//footer creador
creador.innerHTML = `
    <h5>David Longo  2024  CODERHOUSE #57705 JavaScript</h5>
    <div class="redes-dl">
        <a href="https://github.com/DavidJulianLongo?tab=repositories" target="_blank"><i class="bi bi-github"></i></a>
        <a href="https://www.linkedin.com/in/david-longo-b858a4288/" target="_blank"><i class="bi bi-linkedin"></i></a>
    </div>
`;


