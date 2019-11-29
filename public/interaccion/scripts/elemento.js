class Elemento {
  constructor(app, x, y, width, height) {
    this.app = app;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  image(img, x, y) {
    this.width = img.width;
    this.height = img.height;
    this.x = x;
    this.y = y;
    this.app.imageMode(this.app.CENTER);
    this.app.image(img, this.x, this.y);
  }

  isMouseOver() {
    let left = this.app.mouseX > this.x - this.width / 2;
    let right = this.app.mouseX < this.x + this.width / 2;
    let up = this.app.mouseY > this.y - this.height / 2;
    let down = this.app.mouseY < this.y + this.height / 2;

    let mouseOver = false;

    if (left && right && up && down) {
      mouseOver = true;
    }

    return mouseOver;
  }
}
