const d = document,
  n = navigator;

export default function getGeolocation(id) {
  const $id = d.getElementById(id),
    options = {
      enableHighAccuracy: true, //Mejor lectura
      timeout: 5000, //Tiempo de espera para tomar la lecutra
      maximumAge: 0, //No guardar en caché las lecturas
    };

  const success = (position) => {
    // console.log(position);

    let coords = position.coords;
    $id.innerHTML = `<p>Tu posicion actual es </p>
    <ul>
    <li>Latitud: <b>${coords.latitude}</b> </li>
    <li>Longitud: <b>${coords.longitude}</b> </li>
    <li>Precision: <b>${coords.accuracy}</b> metros </li>
    </ul>
    <a href="https://www.google.com/maps/@${coords.latitude},${coords.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps</a>
    `;
  };
  const error = (err) => {
    $id.innerHTML = `<p><mark>Error ${err.code}: ${err.message} </mark></p>`;
    // console.log(err);
    // console.log(`Error ${err.code}: ${err.message} `);
  };

  n.geolocation.getCurrentPosition(success, error, options); //localizacion actual, necesita una funcion en caso de exito, de eror y opciones
}
// watchposition  para hacerlo en tiempo real