class Jugador extends Personaje {
  constructor(esc, x, y) {
    super(esc, x, y);
    this.viewUp = this.img.personajes.conejo.up;
    this.viewDown = this.img.personajes.conejo.down;
    this.viewLeft = this.img.personajes.conejo.left;
    this.viewRight = this.img.personajes.conejo.right;
    this.vista = this.viewDown;
  }

  draw() {
    if (this.vista) {
      if (this.invulnerable == false) {
        this.app.image(this.vista, this.x, this.y);
      } else {
        if (this.app.frameCount % 2 == 0) {
          this.app.image(this.vista, this.x, this.y);
        }
      }
    }
    this.getCasillaHover();
    this.interfaz.vidas = this.vidas;
    
  }

  keyPressed() {
    if (this.app.keyCode === this.app.UP_ARROW) {
      let indice = this.esc.getUp(this.refMatrix);
      this.vista = this.viewUp;
      this.allowMovCasilla(indice);
    }
    if (this.app.keyCode === this.app.DOWN_ARROW) {
      let indice = this.esc.getDown(this.refMatrix);
      this.vista = this.viewDown;
      this.allowMovCasilla(indice);
    }

    if (this.app.keyCode === this.app.LEFT_ARROW) {
      let indice = this.esc.getLeft(this.refMatrix);
      this.vista = this.viewLeft;
      this.allowMovCasilla(indice);
    }
    if (this.app.keyCode === this.app.RIGHT_ARROW) {
      let indice = this.esc.getRight(this.refMatrix);
      this.vista = this.viewRight;
      this.allowMovCasilla(indice);
    }

    if (this.app.key === "x" || this.app.key === "X") {
      let casilla = this.esc.getCasilla(this.refMatrix);
      casilla.setStatus(3);
    }
  }

  getCasillaHover() {
    let casilla = this.esc.getCasilla(this.refMatrix);
    if (casilla.getStatus() == 5) {
      this.timeMove = 300;
      this.interfaz.setPoder(true);
      casilla.setStatus(0);
    }

    if (casilla.getStatus() == 6) {
      this.interfaz.timer.initTiempo += 2000;

      this.interfaz.setMenosTiempo(true);
      casilla.setStatus(0);
    }

    if (casilla.getStatus() == 7) {
      this.interfaz.setMasPoder(true);
      this.interfaz.puntaje += 2000;

      casilla.setStatus(0);
    }

    if (casilla.getStatus() == 4 || casilla.getStatus() == 8) {
      if (this.invulnerable == false) {
        this.invulnerable = true;
        this.vidas--;
        setInterval(() => {
          this.invulnerable = false;
        }, 2000);
      }
      casilla.setStatus(0);
    }
  }
}
