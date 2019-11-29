class ImgLoader {
  constructor(app) {
    this.app = app;
    this.fondo = {
      inicio: this.app.loadImage("/interaccion/data/fondo/inicio.png"),
      instrucciones: this.app.loadImage("/interaccion/data/fondo/instrucciones.png"),
      juego: this.app.loadImage("/interaccion/data/fondo/juego.png"),
      resumen: this.app.loadImage("/interaccion/data/fondo/resumen.png")
    };

    this.btn = {
      jugar: this.app.loadImage("/interaccion/data/botones/jugar.png"),
      jugarHover: this.app.loadImage("/interaccion/data/botones/jugar_hover.png"),
      instrucciones: this.app.loadImage("/interaccion/data/botones/instrucciones.png"),
    
    };

    this.interfaz = {
      
      dinero: this.app.loadImage("/interaccion/data/interfaz/dinero.png"),
      masPoder: {
        activo: this.app.loadImage("/interaccion/data/interfaz/maspoder.png"),
        disabled: this.app.loadImage("/interaccion/data/interfaz/maspoder_disabled.png")
      },
      menosTiempo: {
        activo: this.app.loadImage("/interaccion/data/interfaz/menostiempo.png"),
        disabled: this.app.loadImage("/interaccion/data/interfaz/menostiempo_disabled.png")
      },
      poder: {
        activo: this.app.loadImage("/interaccion/data/interfaz/poder.png"),
        disabled: this.app.loadImage("/interaccion/data/interfaz/poder_disabled.png")
      },
      tiempo: this.app.loadImage("/interaccion/data/interfaz/tiempo.png")
    };

    this.personajes = {
      conejo: {
        left: this.app.loadImage("/interaccion/data/personajes/conejo/left.png"),
        right: this.app.loadImage("/interaccion/data/personajes/conejo/right.png"),
        up: this.app.loadImage("/interaccion/data/personajes/conejo/up.png"),
        down: this.app.loadImage("/interaccion/data/personajes/conejo/down.png")
      },
      molecula: {
        left: this.app.loadImage("/interaccion/data/personajes/molecula/left.png"),
        right: this.app.loadImage("/interaccion/data/personajes/molecula/right.png")
      },
      pulpo: {
        left: this.app.loadImage("/interaccion/data/personajes/pulpo/left.png"),
        right: this.app.loadImage("/interaccion/data/personajes/pulpo/right.png")
      }
    };

    this.objetos = {
      bomba: this.app.loadImage("/interaccion/data/objetos/bomba/bomba.png"),
     
      explosion: this.app.loadImage("/interaccion/data/objetos/explosion/explosion.png"),
    
     
      segundos: this.app.loadImage("/interaccion/data/objetos/2segundos.png"),
      diamante: this.app.loadImage("/interaccion/data/objetos/diamante.png"),
      dinero: this.app.loadImage("/interaccion/data/objetos/masdinero.png"),
      poder: this.app.loadImage("/interaccion/data/objetos/poder.png"),
      zanahoria: this.app.loadImage("/interaccion/data/objetos/zanahoria.png"),
      corazon: this.app.loadImage("/interaccion/data/objetos/corazon.png")
    };
  }
}
