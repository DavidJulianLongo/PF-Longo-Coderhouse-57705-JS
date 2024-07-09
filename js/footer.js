const footer = document.getElementById('footer');
const divFooter = document.createElement('div');
const productos = document.createElement('div');
const redes = document.createElement('div');
const contacto = document.createElement('div');
const productosTitle = document.createElement('h4');
const productosUl = document.createElement('ul');


footer.appendChild(divFooter);
divFooter.className = 'footer-container';
redes.className = 'footer-redes';
contacto.className = 'footer-contacto';


//footer productos 
divFooter.append(productos, redes, contacto);
productos.append(productosTitle, productosUl);
productosTitle.innerHTML = 'Productos';
productosTitle.className = 'footer-tittle'

// Filtra los productos por marca
const marcas = ["Ernie Ball", "D'addario", "Rotosound", "DR Neon", "Fender"];
for (const marca of marcas) {
    const productosUlLi = document.createElement('li');
    productosUlLi.innerHTML = marca;
    productosUl.appendChild(productosUlLi);

    productosUlLi.addEventListener('click', () => {
        const productosFiltrados = tienda.productos.filter(producto => producto.nombre.includes(marca),);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        mostrarProductos(productosFiltrados);
    });
}


// otras categorías del footer
redes.innerHTML = `
    <h4 class="footer-tittle">Seguínos</h4>
    <a class="facebook" href="https://www.facebook.com/?locale=es_LA" target="_blank"><i class="text-primary bi bi-facebook "></i></a>
    <a class="ig" href="https://www.instagram.com/" target="_blank"><i class="bi bi-instagram"></i></a>
`;

contacto.innerHTML = `
    <h4 class="footer-tittle">Contacto</h4>
    <i class="bi bi-telephone-fill"> (011)4765-8545</i>
    <a><i class="bi bi-whatsapp"> 1136451454</i></a>
`;




