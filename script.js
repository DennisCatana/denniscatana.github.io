document.addEventListener('DOMContentLoaded', function() {
  const btninicio = document.querySelector('a[href="#inicio"]');
  const btnApi = document.querySelector('a[href="#api"]');
  const btnPerfiles = document.querySelector('a[href="#perfiles"]');
  const btnContactos = document.querySelector('a[href="#contactos"]');
  const sectionApi = document.getElementById('api');
  const sectionContactos = document.getElementById('contactos');

  btnApi.addEventListener('click', function(event) {
    event.preventDefault();
    sectionApi.scrollIntoView({ behavior: 'smooth' });
  });

  btnPerfiles.addEventListener('click', function(event) {
    event.preventDefault();
    // Lógica para desplazarse a la sección de Perfiles si es necesaria
  });

  btnContactos.addEventListener('click', function(event) {
    event.preventDefault();
    sectionContactos.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const botonesApi = document.querySelectorAll('.boton-api');

  botonesApi.forEach(boton => {
    const imgUrl = boton.getAttribute('data-img-url');
    boton.style.backgroundImage = `url(${imgUrl})`;
  });
});
