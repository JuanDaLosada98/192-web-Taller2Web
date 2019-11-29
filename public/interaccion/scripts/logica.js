class Logica {
  constructor(app) {
    this.app = app;
    this.img = new ImgLoader(this.app);
    this.pantalla = Pantallas.INICIO;

    this.fondo = this.img.fondo.inicio;
    this.instrucciones = this.img.fondo.instrucciones;
    this.fondoJuego = this.img.fondo.juego;
    this.fondoResumen = this.img.fondo.resumen;

    this.interfaz = new Interfaz(this);
    this.escenario = new Escenario(this);
  }

  draw() {
    switch (this.pantalla) {
      case Pantallas.INICIO:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondo, 0, 0);
        this.interfaz.jugar(this.app.width / 2, 600);
        this.interfaz.instrucciones(this.app.width / 2, 650);

        break;
      case Pantallas.INSTRUCCIONES:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.instrucciones, 0, 0);
        this.interfaz.jugar(this.app.width / 2, 600);
        break;
      case Pantallas.JUEGO:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondoJuego, 0, 0);
        this.interfaz.draw();
        this.escenario.draw();

        break;
      case Pantallas.RESUMEN:
        this.interfaz.timer.stop();
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.fondoResumen, 0, 0);
        this.interfaz.drawResumen();
        this.interfaz.reset(this.app.width / 2, 600);
        break;
    }
  }

  keyPressed() {
    switch (this.pantalla) {
      case Pantallas.JUEGO:
        this.escenario.keyPressed();
        break;
    }
  }

  keyReleased() {}

  mousePressed() {
    switch (this.pantalla) {
      case Pantallas.INICIO:
        this.interfaz.jugarMousePressed();
        this.interfaz.instruccionesMousePressed();
        break;
      case Pantallas.INSTRUCCIONES:
        this.interfaz.jugarMousePressed();
        break;
      case Pantallas.RESUMEN:
        this.interfaz.resetMousePressed();
        break;
    }
  }

  mouseReleased() {
    switch (this.pantalla) {
      case Pantallas.INICIO:
        break;
    }
  }

  reset() {
    this.pantalla = Pantallas.INICIO;
    this.interfaz = new Interfaz(this);
    this.escenario = new Escenario(this);
  }

  getImg() {
    return this.img;
  }

  getPApplet() {
    return this.app;
  }

  getInterfaz() {
    return this.interfaz;
  }
}

var Pantallas = {
  INICIO: "inicio",
  INSTRUCCIONES: "instruccioens",
  JUEGO: "juego",
  RESUMEN: "resumen"
};
