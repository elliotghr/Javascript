const d = document;
let x = 0;
let y = 0;

export function moveBall(e, ball, stage) {
  const $ball = d.querySelector(ball),
    $stage = d.querySelector(stage),
    limitsBall = $ball.getBoundingClientRect(), // devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización (viewport).
    limitsStage = $stage.getBoundingClientRect();
  // console.log(e.keyCode);
  // console.log(e.key);
  // console.log(limitsBall, limitsStage);

  switch (e.keyCode) {
    case 37:
      if (limitsBall.left > limitsStage.left) {
        x--;
        //Se previene el comportamiento de las flechas por defecto
        e.preventDefault();
      }
      break;
    case 38:
      if (limitsBall.top > limitsStage.top) {
        y--;
        e.preventDefault();
      }
      break;
    case 39:
      if (limitsBall.right < limitsStage.right) {
        x++;
        e.preventDefault();
      }
      break;
    case 40:
      if (limitsBall.bottom < limitsStage.bottom) {
        y++;
        e.preventDefault();
      }
      break;
    default:
      break;
  }
  $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
}

export function shortcuts(e) {
  // console.log(e.type);
  // console.log(e);
  // console.log(e.key);
  // console.log(e.keyCode);
  // console.log("alt: ", e.altKey);
  // console.log("ctrl: ", e.ctrlKey);
  // console.log("shift: ", e.shiftKey);

  if (e.key === "a" && e.altKey) {
    alert("Haz lanzado una alerta con el teclado");
  }
  if (e.key === "c" && e.altKey) {
    confirm("Haz lanzado un confirm con el teclado");
  }
  if (e.key === "p" && e.altKey) {
    prompt("Haz lanzado un prompt con el teclado");
  }
}
