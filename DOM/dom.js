const $figure = document.createElement("figure"),
  $img = document.createElement("img"),
  $figcaption = document.createElement("figcaption"),
  $figcaptionText = document.createTextNode("Random Image"),
  $cards = document.querySelector(".cards");

//   Creando los elementos y agregando atributos
$img.src =
  "https://fpoimg.com/200x200?text=Random&bg_color=e6e6e6&text_color=8F8F8F";
$img.alt = "Random Image";
// Alternative image alt:
// $img.setAttribute("alt", "Random Image");

$figcaption.appendChild($figcaptionText);

$figure.classList.add("card");
$figure.appendChild($img);
$figure.appendChild($figcaption);
$cards.appendChild($figure);

// Creando elementos con innerHTML
const $figure2 = document.createElement("figure");
$figure2.classList.add("card");
$figure2.innerHTML = `
    <img src="https://fpoimg.com/200x200?text=Random2&bg_color=e6e6e6&text_color=8F8F8F" alt="Random Image 2" />
    <figcaption>Random Image 2</figcaption>
`;
$cards.appendChild($figure2);

// Creando elementos con insertAdjacentHTML
// Insertando elementos dinámicamente
const estaciones = ["Primavera", "Verano", "Otoño", "Invierno"],
  $ulEstaciones = document.createElement("ul");

estaciones.forEach((estacion) => {
  const $li = document.createElement("li");
  $li.textContent = estacion;
  $ulEstaciones.appendChild($li);
});

$cards.insertAdjacentElement("afterend", $ulEstaciones);
$cards.insertAdjacentHTML("afterend", "<h2>Estaciones del Año</h2>");

// Insertando elementos dinámicamente II con innerHTML
const contienentes = ["África", "América", "Asia", "Europa", "Oceanía"],
  $ulContinentes = document.createElement("ul");

contienentes.forEach(
  (continente) => ($ulContinentes.innerHTML += `<li>${continente}</li>`)
);
$cards.insertAdjacentElement("afterend", $ulContinentes);
$cards.insertAdjacentHTML("afterend", "<h2>Continentes del Mundo</h2>");

// Insertando elementos dinámicamente III con fragmentos
const fragment = document.createDocumentFragment(),
  meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  $ulMeses = document.createElement("ul");

meses.forEach((mes) => {
  const $li = document.createElement("li");
  $li.textContent = mes;
  fragment.appendChild($li);
});

$ulMeses.appendChild(fragment);
$cards.insertAdjacentElement("afterend", $ulMeses);
$cards.insertAdjacentHTML("afterend", "<h2>Meses del Año</h2>");

/* Curso JavaScript: 69. DOM: Templates HTML - #jonmircha */

const $template = document.getElementById("template-card").content,
  $fragment2 = document.createDocumentFragment(),
  cardContent = [
    {
      title: "Tecnología",
      img: "https://fpoimg.com/200x200?text=Tech&bg_color=e6e6e6&text_color=8F8F8F",
    },
    {
      title: "Animales",
      img: "https://fpoimg.com/200x200?text=Animals&bg_color=e6e6e6&text_color=8F8F8F",
    },
    {
      title: "Arquitectura",
      img: "https://fpoimg.com/200x200?text=Architecture&bg_color=e6e6e6&text_color=8F8F8F",
    },
    {
      title: "Personas",
      img: "https://fpoimg.com/200x200?text=People&bg_color=e6e6e6&text_color=8F8F8F",
    },
    {
      title: "Naturaleza",
      img: "https://fpoimg.com/200x200?text=Nature&bg_color=e6e6e6&text_color=8F8F8F",
    },
  ];

cardContent.forEach((el) => {
  $template.querySelector("img").setAttribute("src", el.img);
  $template.querySelector("img").setAttribute("alt", el.title);
  $template.querySelector("figcaption").textContent = el.title;
  //   Debemos clonar el template para no modificar el original
  //   Clonación del template con importNode
  //   let $clone = document.importNode($template, true);
  //   Clonación del template con cloneNode (más usado)
  let $clone = $template.cloneNode(true);
  $fragment2.appendChild($clone);
});
$cards.appendChild($fragment2);

// Curso JavaScript: 72. DOM: Manejadores de Eventos
/* 
Las funciones que se ejecutan en los eventos reciben el nombre de event handlers (manejadores de eventos)
Existen 3 formas de asignar eventos:
    1. Atributo HTML (no recomendado)
    2. Propiedad del elemento (elemento.evento = function)
    3. addEventListener (elemento.addEventListener("evento", function))
La lista de eventos es muy amplia y se puede consultar en: https://udn.realityripple.com/docs/Web/Events
*/

const holaMundo = () => {
  alert("Hola Mundo");
  console.log(event);
};

// Evento Semántico (Propiedad del elemento)
const $eventoSemantico = document.getElementById("evento-semantico");

// No podemos asignar más de un evento de esta forma, el último sobrescribe al anterior
$eventoSemantico.onclick = holaMundo;
$eventoSemantico.onclick = function (e) {
  alert("Hola Mundo Manejador de Evento Semántico");
  console.log(e);
  console.log(event);
};

// Manejador de Evento Multiple (addEventListener)
// Podemos agregar múltiples eventos sin que se sobrescriban
const $eventoMultiple = document.getElementById("evento-multiple");
$eventoMultiple.addEventListener("click", holaMundo);
$eventoMultiple.addEventListener("click", (e) => {
  alert("Hola Mundo Manejador de Evento Múltiple");
  console.log(e);
  console.log(event);
});

// Curso JavaScript: 73. DOM: Eventos con Parámetros y Remover Eventos - #jonmircha

// Un evento no puede recibir parámetros directamente, solo el evento
function saludar(nombre = "Desconocido") {
  alert(`Hola ${nombre}`);
  console.log(event);
}
$eventoMultiple.addEventListener("click", saludar);
// Pero si podemos crear una función anónima que llame a la función con los parámetros
$eventoMultiple.addEventListener("click", () => {
  saludar();
  saludar("Elliot");
});

// Remover un evento
// Esto nos permite eliminar un evento después de que se haya ejecutado
const $removerEvento = document.getElementById("evento-remover");

// Función manejadora del evento
const removerDobleClick = (e) => {
  alert("Removiendo el evento de doble click");
  console.log(e);
  $removerEvento.removeEventListener("dblclick", removerDobleClick);
};

// Asignamos el evento y la función manejadora
$removerEvento.addEventListener("dblclick", removerDobleClick);

// Curso JavaScript: 74. DOM: Flujo de Eventos (Burbuja y Captura) - #jonmircha
// Curso JavaScript: 75. DOM: stopPropagation & preventDefault - #jonmircha

function flujoEventos(e) {
  console.log(
    `Hola te saluda ${this.className}, el click lo originó ${e.target.className}`
  );
}
const $divsEventos = document.querySelectorAll(".eventos-flujo div");

console.log($divsEventos);

const $linkEventos = document.querySelector(".eventos-flujo a");
$linkEventos.addEventListener("click", (e) => {
  alert("Hola soy tu amigo el enlace y me has clickeado");
  e.preventDefault(); // Evita la acción por defecto del enlace
  e.stopPropagation(); // Detiene la propagación del evento
});

$divsEventos.forEach((div) => {
  // Fase de burbuja (bubbling)
  div.addEventListener("click", flujoEventos);
  // Fase de captura (capturing)
  //   div.addEventListener("click", flujoEventos, true);
  //   div.addEventListener("click", flujoEventos, { capture: true });
  //   Fase de burbuja con opción once (solo se ejecuta una vez)
  //   div.addEventListener("click", flujoEventos, { capture: false, once: true });
});

// Curso JavaScript: 76. DOM: Delegación de Eventos - #jonmircha
document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.matches(".eventos-flujo div")) {
    alert("Hola soy el div");
  }
  if (e.target.matches(".eventos-flujo a")) {
    alert("Hola soy el enlace");
  }
});

// Curso JavaScript: 77. BOM: Propiedades y Eventos - #jonmircha
/*
window.addEventListener("resize", (e) => {
  console.clear();
  console.log("Ancho de la ventana: ", window.innerWidth);
  console.log("Alto de la ventana: ", window.innerHeight);
});

window.addEventListener("scroll", (e) => {
  console.clear();
  console.log("Scroll en X: ", window.scrollX);
  console.log("Scroll en Y: ", window.scrollY);
});

window.addEventListener("load", (e) => {
  console.log("Página completamente cargada");
});
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM completamente cargado y analizado");
});
*/
// La diferencia entre ambos es que load espera a que se carguen todos los recursos (imagenes, css, etc)
// mientras que DOMContentLoaded solo espera a que se cargue el DOM

// Curso JavaScript: 79. BOM: Objetos: URL, Historial y Navegador - #jonmircha

console.log("********** Objeto URL (location) **********");
console.log(location);
console.log("Propiedad location.href  ", location.href);
console.log("Propiedad location.protocol  ", location.protocol);
console.log("Propiedad location.host  ", location.host);
console.log("Propiedad location.pathname  ", location.pathname);
console.log("Propiedad location.hash  ", location.hash);
console.log("Propiedad location.search  ", location.search);
console.log("Propiedad location.origin  ", location.origin);
console.log("Propiedad location.port  ", location.port);
console.log("Propiedad location.hash  ", location.hash);
// location.reload(); // Recarga la página

console.log("********** Objeto Historial (history) **********");
console.log(history);
console.log("Propiedad history.length  ", history.length);
// history.back(1); // Va una página atrás
// history.forward(1); // Va una página adelante
// history.go(-2); // Va dos páginas atrás

console.log("********** Objeto Navegador (navigator) **********");
console.log(navigator);
console.log("Propiedad navigator.connection  ", navigator.connection);
console.log("Propiedad navigator.geolocation  ", navigator.geolocation);
console.log("Propiedad navigator.mediaDevices  ", navigator.mediaDevices);
console.log("Propiedad navigator.mimeTypes  ", navigator.mimeTypes);
console.log("Propiedad navigator.onLine  ", navigator.onLine);
console.log("Propiedad navigator.serviceWorker  ", navigator.serviceWorker);
console.log("Propiedad navigator.storage  ", navigator.storage);
console.log("Propiedad navigator.usb  ", navigator.usb);
console.log("Propiedad navigator.userAgent  ", navigator.userAgent);
