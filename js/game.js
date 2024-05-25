let canvas;
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

function init() {
  document.getElementById("start-img").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  playBackgroundMusik(backgroundMusikVolumen, reducedVolumen);
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setInterval(() => {
    checkKeyPress();
  }, 1000);
}

function playBackgroundMusik(vol1, vol2) {
  BACKGROUND_MUSIK.volume = vol1;
  BACKGROUND_MUSIK.currentTime = 0;
  BACKGROUND_MUSIK.play();
  musikInterval = setInterval(() => {
    if (BACKGROUND_MUSIK.currentTime >= 21 && !changeVolumenOn21sec) {
      reduceVolumen(vol2);
    }
    if (BACKGROUND_MUSIK.currentTime <= 0.1) {
      startAgainMusik(vol1);
    }
    if (BACKGROUND_MUSIK.currentTime >= endTime) {
      musikCurrenttimeStart(vol1);
    }
    if (BACKGROUND_MUSIK.currentTime >= fadeStartTime && !fadingStarted) {
      startVolumeFade();
    }
  }, 100);
}

function stopAndPlayMusik() {
  let on = document.getElementById("volume-on");
  let off = document.getElementById("volume-off");
  if (musikStoped) {
    off.classList.add("d-none");
    on.classList.remove("d-none");
    musikStoped = false;
    playBackgroundMusik(backgroundMusikVolumen, reducedVolumen);
  } else {
    on.classList.add("d-none");
    off.classList.remove("d-none");
    BACKGROUND_MUSIK.pause();
    musikStoped = true;
  }
}

function reduceVolumen(vol2) {
  BACKGROUND_MUSIK.volume = vol2;
  changeVolumenOn21sec = true;
}

function startAgainMusik(vol1) {
  clearInterval(fadeInterval);
  changeVolumenOn21sec = false;
  BACKGROUND_MUSIK.volume = vol1;
  BACKGROUND_MUSIK.play();
}

function musikCurrenttimeStart(vol1) {
  BACKGROUND_MUSIK.currentTime = 0;
  BACKGROUND_MUSIK.volume = vol1;
  BACKGROUND_MUSIK.play();
  changeVolumenOn21sec = false;
  fadingStarted = false;
}

function startVolumeFade() {
  const fadeSteps = fadeDuration * 10; // Total steps (assuming 100 ms intervals)
  const fadeStepDuration = (fadeDuration * 1000) / fadeSteps; // Duration of each step in ms
  const fadeStep = BACKGROUND_MUSIK.volume / fadeSteps; // Volume reduction per step

  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (BACKGROUND_MUSIK.volume > 0) {
      BACKGROUND_MUSIK.volume = Math.max(0, BACKGROUND_MUSIK.volume - fadeStep);
    } else {
      clearInterval(fadeInterval);
    }
  }, fadeStepDuration);
  fadingStarted = true;
}

window.addEventListener("keydown", (e) => {
  let key = e.keyCode;
  lastKeyPressTime = Date.now();

  if (key == 37) {
    keyboard.LEFT = true;
  }
  if (key == 39) {
    keyboard.RIGHT = true;
  }
  if (key == 38) {
    keyboard.UP = true;
  }
  if (key == 40) {
    keyboard.DOWN = true;
  }
  if (key == 32) {
    keyboard.SPACE = true;
  }
  if (key == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  let key = e.keyCode;
  if (key == 37) {
    keyboard.LEFT = false;
  }
  if (key == 39) {
    keyboard.RIGHT = false;
  }
  if (key == 38) {
    keyboard.UP = false;
  }
  if (key == 40) {
    keyboard.DOWN = false;
  }
  if (key == 32) {
    keyboard.SPACE = false;
  }
  if (key == 68) {
    keyboard.D = false;
  }
});

function checkKeyPress() {
  let currentTime = Date.now();
  if (currentTime - lastKeyPressTime >= 5000) {
    world.character.checkCharacterAction();
  } else {
    world.character.snorring_sound.pause();
  }
}
