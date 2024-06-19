const header = document.getElementById('header');
header.className = 'header';
const navbar = document.getElementById('navbar');
navbar.className = 'nav__bar';

// logo y nombre
const divLogoContainer = document.createElement('div');
divLogoContainer.className = 'logo__container';
navbar.appendChild(divLogoContainer);
const imgLog = document.createElement('img');
imgLog.src = './css/assets/img/logo/logo2.png';
divLogoContainer.appendChild(imgLog);
const shopName = document.createElement('span');
shopName.className = 'shop__name';
shopName.innerHTML = ' <a href="./index.html">DL B-STRINGS</a>';
divLogoContainer.appendChild(shopName);


// lista de productos por marca 
const productsContainer = document.createElement('div');
productsContainer.className = 'products__container';
navbar.appendChild(productsContainer);
const ulNav = document.createElement('ul');
productsContainer.appendChild(ulNav);

const productFilter = ["Ernie Ball", "D'addario", "Rotosound", "DR"];
for (const name of productFilter) {
    const ulNavLi = document.createElement('li');
    ulNavLi.innerHTML = `${name}`;
    ulNav.appendChild(ulNavLi);
}


// carrito 
const cartContainer = document.createElement('div');
cartContainer.className = 'cart__container';
navbar.appendChild(cartContainer);
const cart = document.createElement('i');
cart.classList.add('fas', 'fa-shopping-cart');
cartContainer.appendChild(cart);






