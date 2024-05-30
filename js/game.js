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

/**
 * initStart() starts the start screen
 * 
 */
function initStart() {
  let canvas = document.getElementById("canvas");
  if (canvas.classList.contains("d-none")) {
    buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("d-none"));
  }
}

/**
 * init() starts the game
 * 
 */
function init() {
  createLevel1();
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

/**
 * checkWidthForButton() checks in the intervall the width to show button in mobile version
 * 
 */
function checkWidthForButton() {
  setInterval(() => {
    if (window.innerWidth < 1190) showButtons();
    else hideButtons();
  }, 100);
}

/**
 * showButtons() shows the buttons on mobile version
 * 
 */
function showButtons() {
  if (!canvas.classList.contains("d-none"))
    buttons.forEach((button) => {
      button.classList.remove("d-none");
      button.classList.add("d-block");
    });
}

/**
 * hideButtons() hides the buttons if the screen is not mobile
 * 
 */
function hideButtons() {
  buttons.forEach((button) => {
        button.classList.remove("d-block");
        button.classList.add("d-none");
      });
}

/**
 * playBackgroundMusik() play the backgroundmusik and start again
 * 
 * @param {volume for the begining} vol1 
 * @param {volume for the ending} vol2 
 */
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

/**
 * stopAndPlayMusik() stops or play the all sounds if button clicked
 * 
 */
function stopAndPlayMusik() {
  let on = document.getElementById("volume-on");
  let off = document.getElementById("volume-off");
  let canvas = document.getElementById("canvas");
  if (!canvas.classList.contains("d-none")) {
    if (musikStoped) playMusik(on, off);
    else stopMusik(on, off);
  }
}

/**
 * playMusik() turns all sounds on again
 * 
 * @param {*} on 
 * @param {*} off 
 */
function playMusik(on, off) {
  off.classList.add("d-none");
    on.classList.remove("d-none");
    musikStoped = false;
    playBackgroundMusik(backgroundMusikVolumen, reducedVolumen);
}

/**
 * stopMusik() stops all sounds
 * 
 * @param {*} on 
 * @param {*} off 
 */
function stopMusik(on, off) {
  world.character.snorring_sound.pause();
  world.ENDBOSS_SOUND.pause();
  BACKGROUND_MUSIK.pause();
    on.classList.add("d-none");
    off.classList.remove("d-none");
    musikStoped = true;
}

/**
 * reduceVolumen() reduces the volumen on 21sec, because the song is getting louder
 * 
 * @param {*} vol2 
 */
function reduceVolumen(vol2) {
  BACKGROUND_MUSIK.volume = vol2;
  changeVolumenOn21sec = true;
}

/**
 * startAgainMusik() restarts the background musik
 * 
 * @param {*} vol1 
 */
function startAgainMusik(vol1) {
  clearInterval(fadeInterval);
  changeVolumenOn21sec = false;
  BACKGROUND_MUSIK.volume = vol1;
  if (!musikStoped) BACKGROUND_MUSIK.play();
}

/**
 * musikCurrenttimeStart() for restarting from beginning
 * 
 * @param {*} vol1 
 */
function musikCurrenttimeStart(vol1) {
  BACKGROUND_MUSIK.currentTime = 0;
  BACKGROUND_MUSIK.volume = vol1;
  if (!musikStoped) BACKGROUND_MUSIK.play();
  changeVolumenOn21sec = false;
  fadingStarted = false;
}

/**
 * startVolumeFade() fades the musik to get a better restart
 * 
 */
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

/**
 * addEventListener for pressing keyboard
 * 
 */
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

/**
 * addEventListener for ending press keyboard
 * 
 */
window.addEventListener("keyup", (e) => {
  let key = e.keyCode;
  if (key == 37) keyboard.LEFT = false;
  if (key == 39) keyboard.RIGHT = false;
  if (key == 38) keyboard.UP = false;
  if (key == 40) keyboard.DOWN = false;
  if (key == 32) keyboard.SPACE = false;
  if (key == 68) keyboard.D = false;
});

/**
 * checkMobileButtonPress
 * 
 */
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

/**
 * checkButtonTouch
 * 
 * @param {*} handleTouchStart 
 * @param {*} handleTouchEnd 
 */
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

/**
 * checkKeyPress() checks the time the character moves to handle the sleeping
 * 
 */
function checkKeyPress() {
  let currentTime = Date.now();
  if (currentTime - lastKeyPressTime > 500 || currentTime - lastButtonPress > 500) {
    if (currentTime - lastKeyPressTime < 5000 || currentTime - lastButtonPress < 5000) {
      world.character.checkCharacterIdle();
    }
  }
  if (currentTime - lastKeyPressTime < 5000 || currentTime - lastButtonPress < 5000) world.character.snorring_sound.pause();
  else world.character.checkCharacterAction();
}

/**
 * closeInfo() opens and closes the info screen
 * 
 */
function closeInfo() {
  let infoImg = document.getElementById('info-img');
  let startImg = document.getElementById('start-img');
  let canvas = document.getElementById('canvas');
  if (!infoOpen) open(infoImg, startImg, canvas);
  else if (gameStarted) closeFromGame(infoImg, startImg, canvas)
  else closeFromStartScreen(infoImg, startImg, canvas);
}

/**
 * open() opens the info screen
 * 
 * @param {*} infoImg 
 * @param {*} startImg 
 * @param {*} canvas 
 */
function open(infoImg, startImg, canvas) {
  infoImg.classList.remove('d-none');
  startImg.classList.add('d-none')
  canvas.classList.add('d-none');
  infoOpen = true;
}

/**
 * closeFromGame() closes the info from Game
 * 
 * @param {*} infoImg 
 * @param {*} startImg 
 * @param {*} canvas 
 */
function closeFromGame(infoImg, startImg, canvas) {
  infoImg.classList.add('d-none');
    startImg.classList.add('d-none')
    canvas.classList.remove('d-none');
    infoOpen = false;
}

/**
 * closeFromStartScreen() closes the info screen from start screen
 * 
 * @param {*} infoImg 
 * @param {*} startImg 
 * @param {*} canvas 
 */
function closeFromStartScreen(infoImg, startImg, canvas) {
  infoImg.classList.add('d-none');
    startImg.classList.remove('d-none')
    canvas.classList.add('d-none');
    infoOpen = false;
}