const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const includeHTML = (el, url) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState !== 4) return;

      if (xhr.status >= 200 && xhr.status < 300) {
          // console.log(xhr.responseText);
        el.outerHTML = xhr.responseText;
      } else {
        let message =
          xhr.statusText ||
          "Error al cargar el archiv, verifica que estes haciendo la peticion por http o https";
        $el.outerHTML = `<p>Error ${xhr.statusText}: ${message}</p>`;
      }
    });

    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type", "text/html; charset=uft8");
    xhr.send();
  };

  d.querySelectorAll("[data-include]").forEach((el) => {
    includeHTML(el, el.getAttribute("data-include"));
    // console.log(el);
    // console.log(el.getAttribute("data-include"));
  });
});
