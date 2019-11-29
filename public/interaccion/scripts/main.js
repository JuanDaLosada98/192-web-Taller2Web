new p5(function(app) {
  var log;
  app.setup = function() {
    var canvas = app.createCanvas(1200, 700);
    //Aqui se;analas la etiqueta que lo ba a contener
    canvas.parent(document.querySelector(".blockInteraction"));
    log = new Logica(app);
  };

  app.draw = function() {
    app.background(0);
    log.draw();
  };

  app.keyPressed = function() {
    log.keyPressed();
  };

  app.keyReleased = function() {
    log.keyReleased();
  };

  app.mousePressed = function() {
    log.mousePressed();
  };

  app.mouseReleased = function() {
    log.mouseReleased();
  };
});
