let gameStarted = false;
let infoOpen = false;
let canvas;
let buttons;
let world;
let keyboard = new Keyboard();
let BACKGROUND_MUSIK = new Audio("audio/background.mp3");
let musikInterval;
let fadeDuration = 6;
let endTime = 57;
let fadeStartTime = endTime - fadeDuration;
let fadeInterval;
let backgroundMusikVolumen = 0.3;
let changeVolumenOn21sec = false;
let fadingStarted = false;
let reducedVolumen = backgroundMusikVolumen - 0.1;
let musikStoped = false;
let lastKeyPressTime = Date.now();
let lastButtonPress = Date.now();
let stopAudioIntervall;

function initStart() {
  let canvas = document.getElementById("canvas");
  if (canvas.classList.contains("d-none")) {
    buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("d-none"));
  }
}

function init() {
  gameStarted = true;
  document.getElementById("start-img").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  if (!musikStoped) playBackgroundMusik(backgroundMusikVolumen, reducedVolumen);
  canvas = document.getElementById("canvas");
  checkWidthForButton();
  world = new World(canvas, keyboard);
  setTimeout(() => setInterval(() => checkKeyPress(), 1000), 5000);
  checkMobileButtonPress();
}

function checkWidthForButton() {
  setInterval(() => {
    if (window.innerWidth < 856) showButtons();
    else hideButtons();
  }, 100);
}

function showButtons() {
  if (!canvas.classList.contains("d-none"))
    buttons.forEach((button) => {
      button.classList.remove("d-none");
      button.classList.add("d-block");
    });
}

function hideButtons() {
  buttons.forEach((button) => {
        button.classList.remove("d-block");
        button.classList.add("d-none");
      });
}

function playBackgroundMusik(vol1, vol2) {
  BACKGROUND_MUSIK.volume = vol1;
  BACKGROUND_MUSIK.currentTime = 0;
  if (!musikStoped) BACKGROUND_MUSIK.play();
  musikInterval = setInterval(() => {
    if (BACKGROUND_MUSIK.currentTime >= 21 && !changeVolumenOn21sec) reduceVolumen(vol2);
    if (BACKGROUND_MUSIK.currentTime <= 0.1) startAgainMusik(vol1);
    if (BACKGROUND_MUSIK.currentTime >= endTime) musikCurrenttimeStart(vol1);
    if (BACKGROUND_MUSIK.currentTime >= fadeStartTime && !fadingStarted) startVolumeFade();
  }, 100);
}

function stopAndPlayMusik() {
  let on = document.getElementById("volume-on");
  let off = document.getElementById("volume-off");
  let canvas = document.getElementById("canvas");
  if (!canvas.classList.contains("d-none")) {
    if (musikStoped) playMusik(on, off);
    else stopMusik(on, off);
  }
}

function playMusik(on, off) {
  off.classList.add("d-none");
    on.classList.remove("d-none");
    musikStoped = false;
    playBackgroundMusik(backgroundMusikVolumen, reducedVolumen);
}

function stopMusik(on, off) {
  BACKGROUND_MUSIK.pause();
    on.classList.add("d-none");
    off.classList.remove("d-none");
    musikStoped = true;
}

function reduceVolumen(vol2) {
  BACKGROUND_MUSIK.volume = vol2;
  changeVolumenOn21sec = true;
}

function startAgainMusik(vol1) {
  clearInterval(fadeInterval);
  changeVolumenOn21sec = false;
  BACKGROUND_MUSIK.volume = vol1;
  if (!musikStoped) BACKGROUND_MUSIK.play();
}

function musikCurrenttimeStart(vol1) {
  BACKGROUND_MUSIK.currentTime = 0;
  BACKGROUND_MUSIK.volume = vol1;
  if (!musikStoped) BACKGROUND_MUSIK.play();
  changeVolumenOn21sec = false;
  fadingStarted = false;
}

function startVolumeFade() {
  const fadeSteps = fadeDuration * 10;
  const fadeStepDuration = (fadeDuration * 1000) / fadeSteps;
  const fadeStep = BACKGROUND_MUSIK.volume / fadeSteps;

  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (BACKGROUND_MUSIK.volume > 0) BACKGROUND_MUSIK.volume = Math.max(0, BACKGROUND_MUSIK.volume - fadeStep);
    else clearInterval(fadeInterval);
  }, fadeStepDuration);
  fadingStarted = true;
}



window.addEventListener("keydown", (e) => {
  let key = e.keyCode;
  lastKeyPressTime = Date.now();
  if (key == 37) keyboard.LEFT = true;
  if (key == 39) keyboard.RIGHT = true;
  if (key == 38) keyboard.UP = true;
  if (key == 40) keyboard.DOWN = true;
  if (key == 32) keyboard.SPACE = true;
  if (key == 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  let key = e.keyCode;
  if (key == 37) keyboard.LEFT = false;
  if (key == 39) keyboard.RIGHT = false;
  if (key == 38) keyboard.UP = false;
  if (key == 40) keyboard.DOWN = false;
  if (key == 32) keyboard.SPACE = false;
  if (key == 68) keyboard.D = false;
});

function checkMobileButtonPress() {
  const handleTouchStart = (e, key) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = true;
    lastButtonPress = Date.now();
  };
  const handleTouchEnd = (e, key) => {
    if (e.cancelable) e.preventDefault();
    keyboard[key] = false;
  };
  checkButtonTouch(handleTouchStart, handleTouchEnd);
}

function checkButtonTouch(handleTouchStart, handleTouchEnd) {
  document.getElementById('throw-btn').addEventListener('touchstart', (e) => handleTouchStart(e, 'D'));
  document.getElementById('throw-btn').addEventListener('touchend', (e) => handleTouchEnd(e, 'D'));
  document.getElementById('right-btn').addEventListener('touchstart', (e) => handleTouchStart(e, 'RIGHT'));
  document.getElementById('right-btn').addEventListener('touchend', (e) => handleTouchEnd(e, 'RIGHT'));
  document.getElementById('left-btn').addEventListener('touchstart', (e) => handleTouchStart(e, 'LEFT'));
  document.getElementById('left-btn').addEventListener('touchend', (e) => handleTouchEnd(e, 'LEFT'));
  document.getElementById('jump-btn').addEventListener('touchstart', (e) => handleTouchStart(e, 'UP'));
  document.getElementById('jump-btn').addEventListener('touchend', (e) => handleTouchEnd(e, 'UP'));
}

function checkKeyPress() {
  let currentTime = Date.now();
  if (currentTime - lastKeyPressTime < 5000 || currentTime - lastButtonPress < 5000) world.character.snorring_sound.pause();
  else world.character.checkCharacterAction();
}

function closeInfo() {
  let infoImg = document.getElementById('info-img');
  let startImg = document.getElementById('start-img');
  let canvas = document.getElementById('canvas');
  if (!infoOpen) {
  infoImg.classList.remove('d-none');
  startImg.classList.add('d-none')
  canvas.classList.add('d-none');
  infoOpen = true;
  } else if (gameStarted) {
    infoImg.classList.add('d-none');
    startImg.classList.add('d-none')
    canvas.classList.remove('d-none');
    infoOpen = false;
  } else {
    infoImg.classList.add('d-none');
    startImg.classList.remove('d-none')
    canvas.classList.add('d-none');
    infoOpen = false;
  }
}