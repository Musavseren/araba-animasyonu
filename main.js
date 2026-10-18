
const car = document.getElementById("car");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const road = document.querySelector(".road");
const speedControl = document.getElementById("speedControl");
const animationStatus = document.getElementById("animationStatus");
const speedValue = document.getElementById("speedValue");
let animationId = null;
let position = 0;
let lastTime = 0;

function animateCar(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  }

  const delta = timestamp - lastTime;
  lastTime = timestamp;

  const maxPosition = Math.max(0, road.clientWidth - car.clientWidth);
 position += delta * Number(speedControl.value);

  if (position >= maxPosition) {
  position = maxPosition;
  car.style.left = `${position}px`;
  animationId = null;
  lastTime = 0;
 animationStatus.textContent = "Animasyon tamamlandı";
  return;
}
  car.style.left = `${position}px`;
  animationId = requestAnimationFrame(animateCar);
}

startButton.addEventListener("click", () => {
  if (animationId !== null) return;

  const maxPosition = road.clientWidth - car.clientWidth;

  if (position >= maxPosition) {
    position = 0;
    car.style.left = "0px";
  }
animationStatus.textContent = "Animasyon çalışıyor";
  lastTime = 0;
  animationId = requestAnimationFrame(animateCar);
});

resetButton.addEventListener("click", () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
animationStatus.textContent = "Animasyon sıfırlandı";
  }

  animationId = null;
  position = 0;
  lastTime = 0;
  car.style.left = "0px";
});
pauseButton.addEventListener("click", () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
animationStatus.textContent = "Animasyon duraklatıldı";
  }
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    pauseButton.click();
  }

  if (event.code === "Enter") {
    if (document.activeElement.tagName === "BUTTON") return;
    startButton.click();
  }
});
speedControl.addEventListener("input", () => {
  speedValue.textContent = Number(speedControl.value).toFixed(2);
});