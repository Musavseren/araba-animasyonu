
const car = document.getElementById("car");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const road = document.querySelector(".road");

let animationId = null;
let position = 0;
let lastTime = 0;

function animateCar(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  }

  const delta = timestamp - lastTime;
  lastTime = timestamp;

  const maxPosition = road.clientWidth - car.clientWidth;
  position += (delta * 0.15);

  if (position >= maxPosition) {
    position = maxPosition;
    car.style.left = `${position}px`;
    animationId = null;
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
});
