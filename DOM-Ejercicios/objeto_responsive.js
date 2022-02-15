const d = document,
  w = window;

export default function responsiveMedia(id, mq, mobileContent, desktopContent) {
  let breakpoint = w.matchMedia(mq);
  // w.matchMedia tiene un Listener especial para poder evaluar el valor que tiene
  const responsive = (e) => {
    //se recibe el evento de la mediaquery
    if (e.matches) {
      //   console.log(e.matches);
      d.getElementById(id).innerHTML = desktopContent;
    } else {
      //   console.log(e.matches);
      d.getElementById(id).innerHTML = mobileContent;
    }
    // console.log("Mq: ", breakpoint, e.matches);
  };
  breakpoint.addListener(responsive); //a la variable listener se le agrega un Listener, en el cual recibirá la funcion responsive

  responsive(breakpoint); //se ejecuta a la carga del documento, recibiendo el e de tipo mediaquery
}
