const d = document;

export default function slider() {
  const $nxtBtn = d.querySelector(".slider-btns .next"),
    $prevBtn = d.querySelector(".slider-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide");

  let i = 0; //contador
  let autoPlayInterval; // se crea la variable para almacenar el contador

  // función para crear el auto play al slider
  const autoPlay = () => {
    autoPlayInterval = setInterval(() => {
      $slides[i].classList.remove("active");
      i++;
      if (i > $slides.length - 1) {
        i = 0;
      }
      $slides[i].classList.add("active");
    }, 2000);
  };
  // función para detener el comportamiento automatico del slider
  const autoStop = () => {
    clearInterval(autoPlayInterval);
  };
  autoPlay();

  d.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      // Prevenimos la acción x defecto del elemento a
      e.preventDefault();
      autoStop();
      // removemos la clase active
      $slides[i].classList.remove("active");
      i--;
      // console.log($slides);
      // Si es menor a 0 entonces i se coloca en la última slide
      if (i < 0) {
        i = $slides.length - 1;
      }
      // a esa slide se le asigna la clase active
      $slides[i].classList.add("active");
    }

    if (e.target === $nxtBtn) {
      e.preventDefault();
      autoStop();
      $slides[i].classList.remove("active");
      i++;
      //   console.log($slides);

      if (i >= $slides.length) {
        i = 0;
      }

      $slides[i].classList.add("active");
    }
  });
}
