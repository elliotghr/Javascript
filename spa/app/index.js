import api from "./helpers/wp_api.js";
import { App } from "./App.js";

const d = document;

d.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", () => {
  // Forzamos la page a 1 por si cambiamos de hash a busqueda o contacto
  api.page = 1;
  App();
});
