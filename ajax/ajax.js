/* **********     Curso JavaScript: 106. AJAX: Objeto XMLHttpRequest - #jonmircha     ********** */
(() => {
  // 1.- Crear una variable que haga una INSTANCIA del objeto XMLHttpRequest
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();
  // console.log(xhr);

  // 2.- Asignamos un evento o eventos
  // readystatechange Se lanza cuando detecta algun cambio de esatdo
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    // console.log(xhr);

    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log("exito");
      // console.log(xhr.responseText);
      // $xhr.innerHTML = xhr.responseText;

      let json = JSON.parse(xhr.responseText);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
      // console.log(json);
    } else {
      // console.log("error");
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.statusText}: ${message}`;
    }
    // console.log("Este mensaje se ejecuta de cualqueir forma");
  });
  // Asignamos dos instrucciones más
  // 3.- Instruccion que va a abrir la peticion
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  // 4.- Instruccion que va a enviar la peticion
  xhr.send();
})();

/* **********     Curso JavaScript: 107. AJAX: API Fetch - #jonmircha     ********** */
(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  // Ejecutamos el metodo fetch
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    // El metodo GET es el metodo por defecto y se puede omitir
  })
    // Usamos promesas
    .then((res) => {
      // console.log(res);
      // La respuesta está en el body y es ReadableStream y hay que convertirla a un formato valido (Json (.json()), texto plano (.text()), etc)
      // Para validar el error hay una propiedad llamada ok que es booleano con la que podemos manipular el error usando Promise.reject
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then((json) => {
      // console.log(json);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      // console.log(err);
      let message = err.statusText || "Ocurrió un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      // console.log("Esto se ejecturá independientemente del resultado");
    });
})();

/* **********     Curso JavaScript: 108. AJAX: API Fetch + Async-Await - #jonmircha     ********** */
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  // Creamos la función asincrona
  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();
      console.log(res, json);

      // Manejo de errores
      // Con new Error no se pueden enviar objetos, por lo que solo usaremos throw
      // if (!res.ok) throw new Error("Ocurrió un Error al solicitar los datos");
      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      // console.log("Estoy en el catch", err);

      let message = err.statusText || "Ocurrió un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      // console.log("Esto se ejecturá independientemente del resultado");
    }
  }
  // Invocamos la funcion
  getData();
})();

/* **********     Curso JavaScript: 109. AJAX: Librería Axios - #jonmircha     ********** */
(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      // console.log(res);
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      // err.response ya es un error personalizado por parte de Axios
      // console.log("Estamos en el catch", err.response);
      let message = err.response.statusText || "Ocurrió un error";
      $axios.innerHTML = `Error ${err.response.status}: ${message}`;
    })
    .finally(() => {
      // console.log("Esto se ejecturá independientemente del resultado");
    });
})();

/* **********     Curso JavaScript: 110. AJAX: Librería Axios + Async-Await - #jonmircha     ********** */
(() => {
  const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
        json = await res.data;
      // console.log(res, json);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axiosAsync.appendChild($fragment);
    } catch (err) {
      let message = err.response.statusText || "Ocurrió un error";
      $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
    } finally {
      // console.log("Esto se ejecturá independientemente del resultado");
    }
  }

  getData();
})();
