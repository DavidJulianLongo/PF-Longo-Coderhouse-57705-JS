const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
header.className = 'header';
navbar.className = 'nav__bar';

// logo y nombre
const divLogoContainer = document.createElement('div');
const imgLogo = document.createElement('img');
const shopName = document.createElement('h2');
divLogoContainer.className = 'logo__container';
navbar.appendChild(divLogoContainer);
imgLogo.src = './assets/img/logo/bajo.png';
imgLogo.alt = 'Logo DB-STRINGS'
divLogoContainer.appendChild(imgLogo);
shopName.className = 'shop__name';
shopName.innerHTML = 'DB-STRINGS';
divLogoContainer.appendChild(shopName);


// genera el ul y desde productos_carrito.js se agregan los li
const productsContainer = document.createElement('div');
const ulNav = document.createElement('ul');
productsContainer.className = 'products__container';
navbar.appendChild(productsContainer);
productsContainer.appendChild(ulNav);


// carrito icono
const cartContainer = document.createElement('div');
const cart = document.createElement('i');
cartContainer.className = 'cart__container';
navbar.appendChild(cartContainer);
cart.id = 'cart-show';
cart.classList.add('bi', 'bi-cart4');
cartContainer.appendChild(cart);


//Muestra el carrito al hacer click en en icono carrtio, y lo cierra al hacer click en el icono X
const aside = document.querySelector('aside');
const btnCerrar = document.querySelector('#btn-close-menu');
const cartShow = document.querySelector('#cart-show');

cartShow.addEventListener('click', () =>{
    aside.classList.add('aside-visible');
});

btnCerrar.addEventListener('click', () =>{
    aside.classList.remove('aside-visible');
});







