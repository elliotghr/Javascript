import stripe_keys from "./stripe_keys.js";
// console.log(stripe_keys);

const d = document,
  $tacos = d.getElementById("tacos"),
  $template = d.getElementById("taco-template").content,
  $fragment = d.createDocumentFragment(),
  fetchOptions = {
    headers: {
      Authorization: `Bearer ${stripe_keys.secret}`,
    },
  };

//   Creamos dos variables vacias
let products, prices;

// Usaremos el metodo Promise.all para más peticiones
Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
  // Mapeo de las respuestas
  // Recibimos las promesas de ese Promise.all, por cada una de las respuestas creo un arreglo con map
  // y lo convierto en formato json
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {
    // console.log(json);
    products = json[0].data;
    prices = json[1].data;
    console.log(products, prices);

    const moneyFormat = (num) => `$${num.slice(0, -2)}.${num.slice(-2)}`;

    prices.forEach((el) => {
      let productData = products.filter((product) => product.id === el.product);
      //   console.log(productData);

      // A Stripe se le tiene que enviar el id del precio
      $template.querySelector(".taco").setAttribute("data-price", el.id);
      $template.querySelector("img").src = productData[0].images[0];
      $template.querySelector("img").alt = productData[0].name;
      $template.querySelector("figcaption").innerHTML = `
      ${productData[0].name}
      <br>
      ${moneyFormat(el.unit_amount_decimal)} ${el.currency} 
      `;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $tacos.appendChild($fragment);
  })
  .catch((err) => {
    console.log(err);
    let message =
      err.statusText || "Ocurrió un error al conectarse con la API de Stripe";
    $tacos.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
  });

d.addEventListener("click", (e) => {
  if (e.target.matches(".taco *")) {
    let priceId = e.target.parentElement.getAttribute("data-price");
    // console.log(priceId);
    Stripe(stripe_keys.public)
      .redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        successUrl:
          "http://127.0.0.1:5501/ajax-ejercicios/assets/stripe-success.html",
        cancelUrl:
          "http://127.0.0.1:5501/ajax-ejercicios/assets/stripe-cancel.html",
      })
      .then((res) => {
        if (res.error) {
          console.log(res);
          $tacos.insertAdjacentHTML("afterend", res.error.message);
        }
      });
  }
});
