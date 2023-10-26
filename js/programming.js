import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
const swiperPython = document.getElementById("swiper__python");
const videosPython = [
  {
    id: 1,
    titulo: "Python desde Cero Básico",
    url: window.location.href + "/img/Python1.jpg",
  },
  {
    id: 2,
    titulo: "Aprende a Programar en Python",
    url: window.location.href + "/img/Python3.png",
  },
  {
    id: 3,
    titulo: "Python desde Cero Intermedio",
    url: window.location.href + "/img/Python2.jpg",
  },
  {
    id: 4,
    titulo: "Full Course Python",
    url: window.location.href + "/img/Python4.jpg",
  },
];
let swiper = null;

function renderizarSlider() {
  const arrayPythonSlider = videosPython.map((objetoVideo) => {
    return `<h1 class="swiper__titulo">${objetoVideo.titulo}</h1>
  <img class="swiper__imagen" src='${objetoVideo.url}'/>`;
  });
  for (let swiperHTML of arrayPythonSlider) {
    const nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("swiper-slide");
    nuevoDiv.classList.add("swiper-slide__python");
    nuevoDiv.innerHTML = swiperHTML;
    swiperPython.appendChild(nuevoDiv);
  }
  swiper = new Swiper(".mySwiperPython", {
    slidesPerView: 3,
    spaceBetween: 0,
    freeMode: true,
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      500: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
    },
  });
}
renderizarSlider();
/*

 <div class="swiper-slide swiper-slide__python">
              <h1 class="swiper__titulo">Python desde Cero Básico</h1>
              <img class="swiper__imagen" src="./img/Python1.jpg" />
            </div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>

*/

function addNewVideo(video) {
  swiper.destroy(true, true);
  document.getElementById("swiper__python").innerHTML = "";
  videosPython.push(video);
  renderizarSlider();
}

/*Lógica de agregar videos  */

const formulario = document.getElementById("formulario");
const imagen = document.getElementById("ImagenVideo");
let imagenURL = "";
imagen.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const mimetipeAdmitido = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (mimetipeAdmitido.includes(file.type)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        const imageUrl = fileReader.result;
        imagenURL = imageUrl;
        document.getElementById("contenedor__formulario__imagenpreview").src =
          imageUrl;
      };
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no es imagen",
        text: "Solo se aceptan archivos de imagen del siguiente tipo: jpeg,jpg,png y webp",
      });
    }
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("TituloVideo");

  if (
    titulo.value != "" &&
    !videosPython.map((obj) => obj.titulo).includes(titulo.value) &&
    imagenURL.length > 0
  ) {
    const nuevoIndex = videosPython.length + 1;
    const video = {
      id: nuevoIndex,
      titulo:
        titulo.value.length > 20
          ? titulo.value.substring(0, 17) + "..."
          : titulo.value,
      url: imagenURL,
    };
    addNewVideo(video);
    Swal.fire({
      title: "¡ Has Agregado un Video !",
      text: `Has agregado un nuevo video de manera exitosa`,
      imageUrl: window.location.href + "/img/minions.gif", // URL de la imagen
      imageAlt: "Success", // Texto alternativo de la imagen
      showCancelButton: false, // Sin botón de cancelar
      confirmButtonText: "OK", // Texto del botón OK
      confirmButtonColor: "#4CAF50", // Color verde para el botón OK
    });
  } else {
    if (titulo.value == "") {
      Swal.fire({
        icon: "error",
        title: "Campo Vacío",
        text: "El campo Título esta vacío. Debes ingresar un título",
      });
    } else if (videosPython.map((obj) => obj.titulo).includes(titulo.value)) {
      Swal.fire({
        icon: "error",
        title: "Titulo Existente",
        text: "El titulo que quieres ingresar ya existe. Ingresa uno nuevo",
      });
    } else if (imagenURL.length == 0) {
      Swal.fire({
        icon: "error",
        title: "No has seleccionado una imagen",
        text: "Debes seleccionar una imagen para continuar",
      });
    }
  }
});
