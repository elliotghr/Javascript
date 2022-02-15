const d = document;

export default function scrollSpy() {
  const $sections = d.querySelectorAll("section[data-scroll-spy]"); //Definimos los elementos a observar**

  const cb = (entries) => {
    // console.log("entries", entries); //podemos ver las propiedades de cada entrada

    //Entry, elemento individual que entra al observador. Por cada entrada que tengas vas a ejecutar...
    entries.forEach((entry) => {
      //console.log("entry", entry); //se visualiza cada una de manera individual
      const id = entry.target.getAttribute("id"); //Obtenemos el id de cada elemento
      //console.log(id);
      //propiedad isIntersecting booleano que indica si ya es visible
      if (entry.isIntersecting) {
        d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add(
          "active"
        );
      } else {
        d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove(
          "active"
        );
      }
    });
  };
  //funcion principal, recibe una cb y opciones
  const observer = new IntersectionObserver(cb, {
    // root
    // rootMargin: "-250px",
    threshold: [0.5, 0.75],
  });
  //console.log("observer", observer);

  $sections.forEach((element) => {
    observer.observe(element); //a cada uno de los elementos a observar** se le asigna el observador
  });
}
