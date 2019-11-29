class Bomba{
    constructor(esc, x, y){
        this.esc = esc;
        this.log = this.esc.getLogica();
        this.img = this.log.getImg();
        this.app = this.log.getPApplet();
        this.x = x;
        this.y = y;
    
    }


}