const d = document;

export default function searchiFilters(input, selector) {
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      // console.log(e.key);
      //  console.log(e.target.value);
      if (e.key === "Escape") e.target.value = "";

      //Si se eneucntra el elemento o no
      d.querySelectorAll(selector).forEach((element) =>
        element.textContent.toLowerCase().includes(e.target.value)
          ? element.classList.remove("filter")
          : element.classList.add("filter")
      ); //Inlcude es un booleano que evalua en este caso si el texto existe o no
    }
  });
}
