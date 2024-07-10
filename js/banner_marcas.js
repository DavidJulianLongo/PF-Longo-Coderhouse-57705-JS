const slidesContainer = document.querySelector('.slides');
const imagenes = [
        'assets/img/banner/daddario.png',
        'assets/img/banner/fender.png',
        'assets/img/banner/dr2.png',
        'assets/img/banner/rotosound.png',
        'assets/img/banner/ernieball.png'
    ];

// Crear y añadir las imágenes al contenedor slides
imagenes.forEach(ruta => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const img = document.createElement('img');
    img.src = ruta;
    img.classList.add('slide-img');

    slide.appendChild(img);
    slidesContainer.appendChild(slide);
});
