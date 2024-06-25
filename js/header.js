const header = document.getElementById('header');
header.className = 'header';
const navbar = document.getElementById('navbar');
navbar.className = 'nav__bar';

// logo y nombre
const divLogoContainer = document.createElement('div');
divLogoContainer.className = 'logo__container';
navbar.appendChild(divLogoContainer);
const imgLog = document.createElement('img');
imgLog.src = './css/assets/img/logo/bajo.png';
divLogoContainer.appendChild(imgLog);
const shopName = document.createElement('p');
shopName.className = 'shop__name';
shopName.innerHTML = 'DB-STRINGS';
divLogoContainer.appendChild(shopName);


// creo el ul y desde productos_carrito.js se agregan los li
const productsContainer = document.createElement('div');
productsContainer.className = 'products__container';
navbar.appendChild(productsContainer);
const ulNav = document.createElement('ul');
productsContainer.appendChild(ulNav);


// carrito icono
const cartContainer = document.createElement('div');
cartContainer.className = 'cart__container';
navbar.appendChild(cartContainer);
const cart = document.createElement('i');
cart.classList.add('fas', 'fa-shopping-cart');
cartContainer.appendChild(cart);






