import stripe_keys from "./stripe_keys.js";
// console.log(stripe_keys);

const d = document,
  $tacos = d.getElementById("tacos"),
  $template = d.getElementById("taco-template").contentEditable,
  $fragment = d.createDocumentFragment();

//   Utilizamos las cabeceras que nos solicita Stripe
fetch("https://api.stripe.com/v1/products", {
  headers: {
    Authorization: `Bearer ${stripe_keys.secret}`,
  },
})
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then((json) => {
    console.log(json);
  });

  fetch("https://api.stripe.com/v1/prices", {
  headers: {
    Authorization: `Bearer ${stripe_keys.secret}`,
  },
})
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then((json) => {
    console.log(json);
  });