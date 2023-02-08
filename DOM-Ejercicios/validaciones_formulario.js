const d = document;

export default function contactFormValidations() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");
  //   console.log($inputs);

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  // Validación al momento de escribir
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        // Operador de corto circuito para obtener el patrón o el data-pattern ya que las text areas no lo soportan
        pattern = $input.pattern || $input.dataset.pattern;
      //   console.log($input, pattern);

      // Si tiene el patrón y el input tiene texto se validará la regexp y se mostrará o no el title
      if (pattern && $input.value !== "") {
        // console.log("El input tiene patron");
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
      // Si el input no tiene patrón entonces validamos que no se vaya vacío
      if (!pattern) {
        // console.log("El input NO tiene patron");
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });
  // Simulación de un envío
  d.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Enviando formulario");

    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    setTimeout(() => {
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();

      setTimeout(() => {
        $response.classList.add("none");
      }, 3000);
    }, 2000);
  });
}
