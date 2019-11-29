class Time {
  constructor(app) {
    this.app = app;
    this.initTiempo = 0;
    this.finalTiempo = 0;
    this.tiempo = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.progress = false;
  }

  start() {
    this.progress = true;
    console.log("Start")
    this.initTiempo = this.app.millis();
  }

  stop() {
    this.progress = false;
    console.log("Stop")
    this.finalTiempo = this.app.millis();
    this.tiempo = this.finalTiempo - this.initTiempo;
  }

  timeProgress() {

    if (this.progress) {
      this.tiempo = this.app.millis() - this.initTiempo;

      let valueTime = Math.round(this.tiempo / 1000);
      this.minutos = Math.floor(valueTime / 60);
      this.segundos = valueTime - this.minutos * 60;
    }
  }
}
