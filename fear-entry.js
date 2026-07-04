const audio = document.querySelector("#entranceAudio");
const fallback = document.querySelector("#audioFallback");
const enter = document.querySelector("#enterFearWoods");

window.addEventListener("load", () => {
  audio.play().catch(() => {
    fallback.hidden = false;
  });

  window.setTimeout(() => {
    enter.hidden = false;
    enter.classList.add("is-revealed");
  }, 5000);
});

fallback.addEventListener("click", () => {
  audio.play();
  fallback.hidden = true;
});
