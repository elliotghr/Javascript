const d = document,
  w = window;

export default function smartVideo() {
  const $videos = d.querySelectorAll("video[data-smart-video]");

  // Esta función recibe las entries dadas por el IntersectionObserver
  const callback = (entries) => {
    // console.log("entries", entries); //podemos ver las propiedades de cada entrada
    entries.forEach((entry) => {
      // la propiedad isIntersecting nos ayuda a saber en que momento se cumple la condición del limite y con ella desencadenamos nuestra lógica
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }

      // visibilitychange
      // El evento visibilitychange se activa en el documento cuando el contenido de su pestaña se vuelve visible o se oculta.

      w.addEventListener("visibilitychange", (e) => {
        // visibilityState nos dice si la pagina está en estado hidden o visible
        if (d.visibilityState === "visible") {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    });
  };
  // doc -> https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API
  // Se asigna la función a ejecutar cuando se cumpla el limite y se asigna el limite como un objeto
  const observer = new IntersectionObserver(callback, { threshold: 0.5 });
  // Se asignan los elementos a observar
  $videos.forEach((element) => observer.observe(element));
}
