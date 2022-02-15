const d = document,
  w = window,
  n = navigator;

export default function networkStatus() {
    // console.log(n.onLine);

  const isOnLine = () => {
    const $div = d.createElement("div");
    if (n.onLine) {
      $div.textContent = "Conexion Restablecida";
      $div.classList.add("online");
      $div.classList.remove("offline");
    //   console.log(n.onLine);
    } else {
      $div.textContent = "Conexion Perdida";
      $div.classList.remove("online");
      $div.classList.add("offline");
    //   console.log(n.onLine);
    }
    d.body.insertAdjacentElement("afterbegin", $div);
    setTimeout(() => {
      d.body.removeChild($div);
    }, 2000);
  };
  w.addEventListener("online", (e) => {
    isOnLine();
  });
  w.addEventListener("offline", (e) => {
    isOnLine();
  });
}