const d = document;

export default function slider() {
  const $nxtBtn = d.querySelector(".slider-btns .next"),
    $prevBtn = d.querySelector(".slider-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide");

  let i = 0; //contador
  d.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      e.preventDefault();
      $slides[i].classList.remove("active");
      i--;
      // console.log($slides);

      if (i < 0) {
        i = $slides.length - 1;
      }

      $slides[i].classList.add("active");
    }

    if (e.target === $nxtBtn) {
      e.preventDefault();
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
