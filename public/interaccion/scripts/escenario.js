class Escenario {
  constructor(log) {
    this.log = log;
    this.app = this.log.getPApplet();
    this.interfaz = this.log.getInterfaz();
    this.casillas = [];
    this.columnas = 11;
    this.filas = 7;
    this.bombas = [];
    

    for (let j = 0; j < this.filas; j++) {
      for (let i = 0; i < this.columnas; i++) {
        let casilla = new Casilla(
          this,
          50 + i * 100,
          50 + j * 100,
          this.casillas.length
        );
        if (i % 2 != 0 && j % 2 != 0) {
          casilla.setStatus(1);
        } else {
          if (Math.round(this.app.random(1, 11)) % 3 == 0) {
            casilla.setStatus(2);
          }
        }
        this.casillas.push(casilla);
      }
    }
    let index = 0;
    while (this.getCasilla(index).getStatus() != 0) {
      index++;
    }
    this.jugador = new Jugador(this, index);

    this.enemigos = [];
    this.generateEnemigo(15, 0);
    this.generateEnemigo(30, 1);
    this.generateEnemigo(45, 0);
    this.generateEnemigo(60, 2);
  }

  generateEnemigo(indice, type) {
    let indexB = indice;
    while (this.getCasilla(indexB).getStatus() != 0) {
      indexB++;
    }
    if (type == 0) {
      this.enemigos.push(new Enemigo(this, indexB));
    } else {
      this.enemigos.push(new EnemigoB(this, indexB));
    }
  }

  draw() {
    for (let i = 0; i < this.casillas.length; i++) {
      let casilla = this.casillas[i];
      casilla.draw();
    }
    this.jugador.draw();

    if (this.jugador.vidas <= 0) {
      this.log.pantalla = Pantallas.RESUMEN;
    }

    for (let j = this.enemigos.length - 1; j >= 0; j--) {
      let enemigo = this.enemigos[j];
      enemigo.draw();
      if (enemigo.vidas <= 0) {
        this.enemigos.splice(j, 1);
      }
    }
    if (this.enemigos.length <= 0) {
      this.log.pantalla = Pantallas.RESUMEN;
    }
  }

  keyPressed() {
    this.jugador.keyPressed();
  }

  getCasilla(indice) {
    return this.casillas[indice];
  }

  getUp(refMatrix) {
    let indice = refMatrix - this.columnas;
    if (indice < 0) {
      indice = -1;
    }
    return indice;
  }

  getDown(refMatrix) {
    let indice = refMatrix + this.columnas;
    if (indice >= this.casillas.length) {
      indice = -1;
    }
    return indice;
  }

  getLeft(refMatrix) {
    let indice = refMatrix - 1;
    if (indice < 0) {
      indice = -1;
    }

    if (refMatrix % this.columnas == 0) {
      indice = -1;
    }
    return indice;
  }

  getRight(refMatrix) {
    let indice = refMatrix + 1;
    if (indice >= this.casillas.length) {
      indice = -1;
    }

    if ((refMatrix + 1) % this.columnas == 0) {
      indice = -1;
    }
    return indice;
  }

  getLogica() {
    return this.log;
  }
}
