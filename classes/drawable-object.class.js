class DrawableObject {
  x = 120;
  y = 150;
  height = 300;
  width = 150;
  energy = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * draw() trys to draw all pictures
   * 
   * @param {is the context of canvas} ctx 
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("This image could not load", e);
      console.log("Image problem,", this.img.src);
    }
  }

  /**
   * loadImage() create a new Image and set the src
   * 
   * @param {is the path of the image} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * loadImages() creates all new Images from the array and set the src
   * 
   * @param {is the array with all images} arr 
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
