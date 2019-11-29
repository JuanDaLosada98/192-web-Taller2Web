class Personaje {
  constructor(esc, refMatrix) {
    this.esc = esc;
    this.log = this.esc.getLogica();
    this.app = this.log.getPApplet();
    this.interfaz = this.log.getInterfaz();
    this.img = this.log.getImg();
    this.refMatrix = refMatrix;

    let casilla = this.esc.getCasilla(this.refMatrix);
    this.x = casilla.x;
    this.y = casilla.y;
    this.vista = undefined;

    this.movAnim = false;
    this.refX = 0;
    this.refY = 0;

    this.timeMove = 500;
    this.vidas = 3;
    this.invulnerable = false;
  }

  draw() {
    if (this.vista) {
      this.app.image(this.vista, this.x, this.y);
    }
   

    this.getCasillaHover();
    if (this.app.frameCount % 5 == 0) {
      this.movimientoAutonomo();
    }
  }

  getCasillaHover() {
    let casilla = this.esc.getCasilla(this.refMatrix);
    if (casilla.getStatus() == 4) {
      this.vidas = 0;
    }
  }

  setRefMatrix(value) {
    this.refMatrix = value;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  createAnimX(objetivo, tiempo) {
    let count = 0;
    let frames = 10;
    let frecuencia = (objetivo - this.x) / frames;

    let interval = setInterval(() => {
      this.x += frecuencia;
      count++;

      if (count >= frames) {
        clearInterval(interval);
        this.x = objetivo;
        this.movAnim = false;
      }
    }, tiempo / frames);
  }

  createAnimY(objetivo, tiempo) {
    let count = 0;
    let frames = 10;
    let frecuencia = (objetivo - this.y) / frames;

    let interval = setInterval(() => {
      this.y += frecuencia;
      count++;

      if (count >= frames) {
        clearInterval(interval);
        this.y = objetivo;
        this.movAnim = false;
      }
    }, tiempo / frames);
  }

  setPosAnim(x, y) {
    if (this.movAnim == false) {
      this.movAnim = true;

      this.createAnimX(x, this.timeMove);
      this.createAnimY(y, this.timeMove);
    }
  }

  allowMovCasilla(indice) {
    if (indice != -1) {
      let casilla = this.esc.getCasilla(indice);
      if (
        this.movAnim == false &&
        casilla.getStatus() != 1 &&
        casilla.getStatus() != 2 &&
        casilla.getStatus() != 3 &&
        casilla.getStatus() != 4
      ) {
        this.setRefMatrix(indice);
        this.setPosAnim(casilla.x, casilla.y);
      }
    }
  }

  movimientoAutonomo() {
    let casilla = this.esc.getCasilla(this.refMatrix);
    casilla.setStatus(0);
    let accion = Math.round(this.app.random(1, 9));
    if (accion == 2) {
      let indice = this.esc.getUp(this.refMatrix);
      this.vista = this.viewUp;
      this.allowMovCasilla(indice);
    }
    if (accion == 3) {
      let indice = this.esc.getDown(this.refMatrix);
      this.vista = this.viewDown;
      this.allowMovCasilla(indice);
    }

    if (accion == 4) {
      let indice = this.esc.getLeft(this.refMatrix);
      this.vista = this.viewLeft;
      this.allowMovCasilla(indice);
    }
    if (accion == 5) {
      let indice = this.esc.getRight(this.refMatrix);
      this.vista = this.viewRight;
      this.allowMovCasilla(indice);
    }
    casilla = this.esc.getCasilla(this.refMatrix);
    casilla.setStatus(8);
  }
}
