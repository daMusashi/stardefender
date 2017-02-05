function Laser(turret, enemy, burnLength, color){ // shootingObjectWithPos & enemy måste ha en .pos som Vector
    this.turret = turret;
    this.turret.isShooting = true;

    this.enemy = enemy;
    this.enemy.isTargeted = true;

    this.burnLength = burnLength; // frames - burn anim - laser still på målet
    this.index = 0;

    this.color = color;
    this.colorShaderStart = -80; // hur mycket mörkare lasern är vid start
    this.colorShadeStep = this.burnLength / (this.colorShaderStart * -1); // hur mycket mörkare lasern är vid start
    //this.color.shade(this.colorShaderStart);

    this.removeMeHandler = new Handler();
}

Laser.prototype.update = function(){

    if(this.index > this.burnLength){
        this.enemy.kill();
        this.turret.isShooting = false;
        this.removeMeHandler.handlerCall(this);
    }

    //this.color.shade(this.colorShadeStep);

    this.index++;
}

Laser.prototype.draw = function() {
    stroke(this.color.getCSS());
    line(this.turret.pos.x, this.turret.pos.y, this.enemy.pos.x, this.enemy.pos.y);

}
