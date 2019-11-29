class Enemigo extends Personaje {
  constructor(esc, x, y) {
    super(esc, x, y);
    this.viewLeft = this.img.personajes.pulpo.left;
    this.viewRight = this.img.personajes.pulpo.right;
    this.viewUp = this.img.personajes.pulpo.left;
    this.viewDown = this.img.personajes.pulpo.right;
    this.vista = this.viewRight;
    this.timeMove = 1000;
  }
}

class EnemigoB extends Personaje {
  constructor(esc, x, y) {
    super(esc, x, y);
    this.viewLeft = this.img.personajes.molecula.left;
    this.viewRight = this.img.personajes.molecula.right;
    this.viewUp = this.img.personajes.molecula.left;
    this.viewDown = this.img.personajes.molecula.right;
    this.vista = this.viewRight;
    this.timeMove = 200;
  }
}
