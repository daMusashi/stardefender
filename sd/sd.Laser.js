function Laser(posObject, enemy, color){
    console.log("LASER shooting");
    this.posObject = posObject;
    this.enemy = enemy;
    this.color = color;

    this.burnLength = 20; // frames - burn anim - laser still på målet
    this.index = 0;

    this.removeMeHandler = new Handler();
}

Laser.prototype.update = function(){

    if(this.index > this.burnLength){
        this.enemy.kill();
        this.removeMeHandler.handlerCall(this);
    }

    this.index++;
}

Laser.prototype.draw = function() {
    if (this.mode = "burn"){
        stroke(this.color[0], this.color[1], this.color[2]);
        line(this.posObject.pos.x, this.posObject.pos.y, this.enemy.pos.x, this.enemy.pos.y);
    }
}
