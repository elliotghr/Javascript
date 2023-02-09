const d = document;

// Recibe el input y los selectores de los elementos a filtrar
export default function searchiFilters(input, selector) {
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      // console.log(e.key);
      //  console.log(e.target.value);
      if (e.key === "Escape") e.target.value = "";

      //Recorremos cada uno de los elementos y verificamos si el texto del input existe en alguno de ellos, esto aplicará la clase css para ocultarlo o no
      d.querySelectorAll(selector).forEach((element) =>
        element.textContent.toLowerCase().includes(e.target.value)
          ? element.classList.remove("filter")
          : element.classList.add("filter")
      );
    }
  });
}
