// Invocación de peticiones de las secciones dependiendo el contenido que necesitemos
import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { ContactForm } from "./ContactForm.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import SearchCard from "./SearchCard.js";
// Dado que queremos la asincronia desde ajax() entonces debemos convertir nuestro Router en Asincrono
export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let { hash } = location;
  console.log(hash);

  // $main.innerHTML = null;
  // Definimos las secciones de nuestra Ruta
  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        // console.log(posts);
        let html = "";
        posts.forEach((el) => {
          html += PostCard(el);
        });
        $main.innerHTML = html;
      },
    });
    // .includes Busca una coincidencia en una string y si lo encuentra lo valida a true
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      d.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search);
        let html = "";
        if (search.length === 0) {
          html = `<P class="error">
          No existen resultados de busqueda para el término
          <mark>${query}</mark>
          </p>
          `;
        } else {
          search.forEach((post) => {
            html += SearchCard(post);
          });
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.appendChild(ContactForm());
  } else {
    // Para cada articulo que no tenemos el control...
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        // console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }
  d.querySelector(".loader").style.display = "none";
}
