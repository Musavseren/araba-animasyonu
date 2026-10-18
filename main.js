
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
  const speed = Number(speedControl.value) || 0.15;
position += delta * speed;

  if (position >= maxPosition) {
    position = maxPosition;
    car.style.left = `${position}px`;
    animationId = null;
    lastTime = 0;
    animationStatus.textContent = "Animasyon tamamlandı";
    startButton.textContent = "Tekrar Başlat";
    return;
  }

  car.style.left = `${position}px`;
  animationId = requestAnimationFrame(animateCar);
}

startButton.addEventListener("click", () => {
  if (animationId !== null) return;

  const maxPosition = Math.max(0, road.clientWidth - car.clientWidth);

  if (position >= maxPosition) {
    position = 0;
    car.style.left = "0px";
  }

  animationStatus.textContent = "Animasyon çalışıyor";
  startButton.textContent = "Başlat";
  lastTime = 0;
  animationId = requestAnimationFrame(animateCar);
});

resetButton.addEventListener("click", () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }

  animationId = null;
  position = 0;
  lastTime = 0;
  car.style.left = "0px";
  startButton.textContent = "Başlat";
  animationStatus.textContent = "Animasyon sıfırlandı";
});

pauseButton.addEventListener("click", () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = 0;
    animationStatus.textContent = "Animasyon duraklatıldı";
    startButton.textContent = "Devam Et";
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