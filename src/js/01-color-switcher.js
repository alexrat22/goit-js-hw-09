const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const backgroundArea = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  timerId = setInterval(() => {
    backgroundArea.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', '');
}

function onStopButtonClick() {
  clearInterval(timerId);
  startButton.removeAttribute('disabled', '');
}
