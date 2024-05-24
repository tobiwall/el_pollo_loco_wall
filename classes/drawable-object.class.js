class DrawableObject {
  x = 120;
  y = 150;
  height = 300;
  width = 150;
  energy = 100;
  img;
  imageCache = {};
  currentImage = 0;






  draw(ctx) {
    try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
        console.warn('This image could not load', e);
        console.log('Image problem,', this.img.src);
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
