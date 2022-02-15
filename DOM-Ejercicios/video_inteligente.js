const d = document,
  w = window;

export default function smartVideo() {
  const $videos = d.querySelectorAll("video[data-smart-video]");

  const cb = (entries) => {
    // console.log("entries", entries); //podemos ver las propiedades de cada entrada
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
      w.addEventListener("visibilitychange", (e) => {
        if (d.visibilityState === "visible") {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    });
  };

  const observer = new IntersectionObserver(cb, { threshold: 0.5 });

  $videos.forEach((element) => observer.observe(element));
}
