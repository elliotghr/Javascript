const d = document,
  n = navigator;
export default function webCam(id) {
  const $video = d.getElementById(id);
    // console.log(n.mediaDevices.getUserMedia);
//Comprobamos que exista esta funcion en el navegador que usaremos
  if (n.mediaDevices.getUserMedia) { //getUserMedia recibe 2 parametros
    n.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((strem) => {
        // console.log(strem);
        // accedemos a src que recibe un obj
        $video.srcObject = strem;
        $video.play();
      })
      .catch((err) => {
        // console.log("Sucedió el sig error", err);
        $video.insertAdjacentHTML("beforebegin", `<p><mark> Sucedió el sig error: ${err}</mark></p>`);
      });
  }
}
