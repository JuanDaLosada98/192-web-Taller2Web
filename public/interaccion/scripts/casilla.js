class Casilla {
  constructor(esc, x, y, refMatrix) {
    this.esc = esc;
    this.log = this.esc.getLogica();
    this.app = this.log.getPApplet();
    this.img = this.log.getImg();
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.status = 0;
    this.viewDiamante = this.img.objetos.diamante;
    this.viewZanahoria = this.img.objetos.zanahoria;
    this.viewBomba = this.img.objetos.bomba;
    this.viewExplosion = this.img.objetos.explosion;

    this.viewPoder = this.img.objetos.poder;
    this.viewSegundos = this.img.objetos.segundos;
    this.viewDinero = this.img.objetos.dinero;

    this.refMatrix = refMatrix;

    this.count = 0;
    this.animCount = false;
    this.countB = 0;
    this.animCountB = false;

    this.anteriorStatus = 0;

    //this.pod = false;
  }

  draw() {
    this.app.noFill();
    /*this.app.stroke(255, 0, 0);
    this.app.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );*/
    switch (this.status) {
      case 0:
        break;
      case 1:
        this.app.image(this.viewZanahoria, this.x, this.y);
        break;
      case 2:
        this.app.image(this.viewDiamante, this.x, this.y);
        break;
      case 3:
        this.app.image(this.viewBomba, this.x, this.y);
        break;
      case 4:
        this.app.image(this.viewExplosion, this.x, this.y);
        break;
      case 5:
        this.app.image(this.viewPoder, this.x, this.y);
        break;
      case 6:
        this.app.image(this.viewSegundos, this.x, this.y);
        break;
      case 7:
        this.app.image(this.viewDinero, this.x, this.y);
        break;
      case 8:
        //Mountruo
        break;
    }
    /*if(this.status==5){
      pod=true;
    }*/

    if (this.animCount) {
      this.count++;
      if (this.count > 90) {
        this.animCount = false;
        this.count = 0;

        this.setStatus(4);
        let indice = this.esc.getUp(this.refMatrix);
        this.exploxionParalela(indice);
        indice = this.esc.getDown(this.refMatrix);
        this.exploxionParalela(indice);
        indice = this.esc.getLeft(this.refMatrix);
        this.exploxionParalela(indice);
        indice = this.esc.getRight(this.refMatrix);
        this.exploxionParalela(indice);
      }
    }

    if (this.animCountB) {
      this.countB++;
      if (this.countB > 50) {
        this.animCountB = false;
        this.countB = 0;
        console.log(this.anteriorStatus);
        if (
          this.anteriorStatus === 2 &&
          Math.round(this.app.random(0, 11)) % 2 == 0
        ) {
          let indice = Math.round(this.app.random(5, 7));

          this.setStatus(indice);
        } else {
          this.setStatus(0);
        }
      }
    }

    this.app.text(this.refMatrix, this.x, this.y);
  }

  exploxionParalela(indice) {
    if (indice != -1) {
      let casilla = this.esc.getCasilla(indice);
      if (casilla.getStatus() != 1) {
        casilla.anteriorStatus = casilla.getStatus();
        casilla.setStatus(4);
      }
    }
  }

  setStatus(value) {
    this.status = value;
    if (this.status == 3) {
      this.animCount = true;
    }
    if (this.status == 4) {
      this.animCountB = true;
    }
  }

  getStatus() {
    return this.status;
  }

  isSobre(x, y) {
    let up = y > this.y - this.height / 2;
    let down = y < this.y + this.height / 2;
    let left = x > this.x - this.width / 2;
    let right = x < this.x + this.width / 2;

    let sobre = false;
    if (left && right && up && down) {
      sobre = true;
    }
    return sobre;
  }
}
