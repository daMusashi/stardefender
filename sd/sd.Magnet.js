function Magnet(x, y){
    this.pos = new Vector(x, y);
    this.force = 0.1;
    this.forceRange = 100;

    this.color = new Color(SDCONFIG.triggerzonesColor);

    this.uiTriggerzone = new UITriggerzone(this.pos.x, this.pos.y, this.forceRange);
}

Magnet.prototype.getForce = function(pos){
    var f = new Vector(); // polar force-vector
    f.angle = Vector.angleBetween(pos, this.pos);
    f.length = this.force;

    return f;
}

Magnet.prototype.update = function(){
    this.uiTriggerzone.pos = this.pos;
}

Magnet.prototype.draw = function(drawOptions){

    this.uiTriggerzone.draw(drawOptions);

    noStroke();
    fill(250, 0, 0);
    ellipse(this.pos.x, this.pos.y, 5, 5);
}
