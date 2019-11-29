class Interfaz {
  constructor(log) {
    this.log = log;
    this.app = this.log.getPApplet();
    this.img = this.log.getImg();
    this.timer = new Time(this.app);

    this.viewBtnJugar = this.img.btn.jugar;
    this.viewBtnJugarHover = this.img.btn.jugarHover;
    this.btnJugar = new Elemento(this.app, 0, 0);

    this.btnReset = new Elemento(this.app, 0, 0);

    this.viewBtnInstrucciones = this.img.btn.instrucciones;
    this.viewBtnInstruccionesHover = this.img.btn.instruccionesHover;
    this.btnInstrucciones = new Elemento(this.app, 0, 0);

    this.viewTiempo = this.img.interfaz.tiempo;
    this.viewDinero = this.img.interfaz.dinero;

    this.viewPoder = this.img.interfaz.poder.activo;
    this.viewMenosTiempo = this.img.interfaz.menosTiempo.activo;
    this.viewMasPoder = this.img.interfaz.masPoder.activo;

    this.viewPoderDisabled = this.img.interfaz.poder.disabled;
    this.viewMenosTiempoDisabled = this.img.interfaz.menosTiempo.disabled;
    this.viewMasPoderDisabled = this.img.interfaz.masPoder.disabled;

    this.viewCorazon = this.img.objetos.corazon;

    this.poder = false;
    this.menosTiempo = false;
    this.masPoder = false;
    this.puntaje = 0;
    this.vidas = 3;
  }

  draw() {
    this.app.fill(255, 26, 82);
    this.app.rect(this.app.width - 100, 0, 100, this.app.height);

    this.app.imageMode(this.app.CENTER);

    let dis = 100;
    let initDist = 60;
    this.app.image(this.viewTiempo, this.app.width - 50, initDist + dis * 0);

    this.app.textAlign(this.app.CENTER);
    let segundos = this.timer.segundos;
    if (segundos < 10) {
      segundos = `0${segundos}`;
    }
    this.app.text(
      `0${this.timer.minutos}:${segundos}`,
      this.app.width - 50,
      initDist+30 + dis * 0
    );

    this.app.image(this.viewDinero, this.app.width - 50, initDist + dis * 1);
    this.app.text(`$ ${this.puntaje}`, this.app.width - 50, initDist+30 + dis * 1);

    if (this.poder) {
      this.app.image(this.viewPoder, this.app.width - 50, initDist + dis * 2);
    } else {
      this.app.image(
        this.viewPoderDisabled,
        this.app.width - 50,
        initDist + dis * 2
      );
    }
    if (this.menosTiempo) {
      this.app.image(this.viewMenosTiempo, this.app.width - 50, initDist + dis * 3);
    } else {
      this.app.image(
        this.viewMenosTiempoDisabled,
        this.app.width - 50,
        initDist + dis * 3
      );
    }
    if (this.masPoder) {
      this.app.image(this.viewMasPoder, this.app.width - 50, initDist + dis * 4);
    } else {
      this.app.image(
        this.viewMasPoderDisabled,
        this.app.width - 50,
        initDist + dis * 4
      );
    }

    for (let i = 0; i < this.vidas; i++) {
      this.app.image(this.viewCorazon, this.app.width - 50, initDist + dis * 5 + (i*35));
    }

    this.timer.timeProgress();
  }

  drawResumen() {
    this.app.imageMode(this.app.CENTER);

    let dis = 200;
    let initDis = 170;
    this.app.image(this.viewTiempo, initDis + dis * 0, this.app.height / 2);

    this.app.textAlign(this.app.CENTER);
    let segundos = this.timer.segundos;
    if (segundos < 10) {
      segundos = `0${segundos}`;
    }
    this.app.text(
      `0${this.timer.minutos}:${segundos}`,
      initDis + dis * 0,
      30 + this.app.height / 2
    );

    this.app.image(this.viewDinero, initDis + dis * 1, this.app.height / 2);
    this.app.text(
      `$ ${this.puntaje}`,
      initDis + dis * 1,
      30 + this.app.height / 2
    );

    if (this.poder) {
      this.app.image(this.viewPoder, initDis + dis * 2, this.app.height / 2);
    } else {
      this.app.image(
        this.viewPoderDisabled,
        initDis + dis * 2,
        this.app.height / 2
      );
    }
    if (this.menosTiempo) {
      this.app.image(
        this.viewMenosTiempo,
        initDis + dis * 3,
        this.app.height / 2
      );
    } else {
      this.app.image(
        this.viewMenosTiempoDisabled,
        initDis + dis * 3,
        this.app.height / 2
      );
    }
    if (this.masPoder) {
      this.app.image(this.viewMasPoder, initDis + dis * 4, this.app.height / 2);
    } else {
      this.app.image(
        this.viewMasPoderDisabled,
        initDis + dis * 4,
        this.app.height / 2
      );
    }
    this.timer.timeProgress();
    this.app.textSize(60);
    this.app.fill(255,26,82);
    if(this.vidas > 0){
      this.app.text("¡Ganaste!", this.app.width/2, 250);
    }else{
      this.app.text("Perdiste :(", this.app.width/2, 250);
    }
    this.app.textSize(12);
    this.app.fill(0);
  }

  reset(x, y) {
    if (!this.btnReset.isMouseOver()) {
      this.btnReset.image(this.viewBtnJugar, x, y);
      this.app.cursor(this.app.ARROW);
    } else {
      this.app.cursor(this.app.HAND);
      this.btnReset.image(this.viewBtnJugarHover, x, y);
    }
  }

  resetMousePressed() {
    if (this.btnReset.isMouseOver()) {
      this.log.pantalla = Pantallas.JUEGO;
      this.app.cursor(this.app.ARROW);
      this.log.reset();
    }
  }

  jugar(x, y) {
    if (!this.btnJugar.isMouseOver()) {
      this.btnJugar.image(this.viewBtnJugar, x, y);
      this.app.cursor(this.app.ARROW);
    } else {
      this.app.cursor(this.app.HAND);
      this.btnJugar.image(this.viewBtnJugarHover, x, y);
    }
  }

  jugarMousePressed() {
    if (this.btnJugar.isMouseOver()) {
      this.log.pantalla = Pantallas.JUEGO;
      this.app.cursor(this.app.ARROW);
      this.timer.start();
    }
  }

  instrucciones(x, y) {
    if (!this.btnInstrucciones.isMouseOver()) {
      this.btnInstrucciones.image(this.viewBtnInstrucciones, x, y);
      this.app.cursor(this.app.ARROW);
    } else {
      this.app.cursor(this.app.HAND);
      this.btnInstrucciones.image(this.viewBtnInstruccionesHover, x, y);
    }
  }

  instruccionesMousePressed() {
    if (this.btnInstrucciones.isMouseOver()) {
      this.log.pantalla = Pantallas.INSTRUCCIONES;
      this.app.cursor(this.app.ARROW);
    }
  }

  setPoder(value) {
    this.poder = value;
  }
  setMenosTiempo(value) {
    this.menosTiempo = value;
  }
  setMasPoder(value) {
    this.masPoder = value;
  }
}
