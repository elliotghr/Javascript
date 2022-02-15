// Trabajaremos con componentes funcionales
import { Loader } from "./components/Loader.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Router } from "./components/Router.js";
import { InfiniteScroll } from "./helpers/inifnite_scroll.js";

export function App() {
  const $root = document.getElementById("root");

  // Limpiamos el contenido de $root
  $root.innerHTML = null;
  $root.appendChild(Header());
  $root.appendChild(Main());
  $root.appendChild(Loader());
  // No se agrega como nodo
  Router();
  InfiniteScroll();
}
