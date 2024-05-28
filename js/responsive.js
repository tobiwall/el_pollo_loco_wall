/**
 * This EventListener acts if screen width is changing
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
function adjustContainerHeight() {
    const container = document.getElementById('main-screen');
    const containerWidth = container.offsetWidth;

    const img = new Image();
    img.src = 'img/5_background/background-pixabay/frame.jpeg'; // Pfad zu deinem Hintergrundbild
    img.onload = () => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerHeight = containerWidth / imgRatio;
      container.style.height = `${containerHeight}px`;
    };
  }
  adjustContainerHeight();
  // Bei Fenstergrößenänderungen anpassen
  window.addEventListener('resize', adjustContainerHeight);
});
