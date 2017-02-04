function Laser(shootingObjectWithPos, enemy, color){ // shootingObjectWithPos & enemy måste ha en .pos som Vector
    this.shooter = shootingObjectWithPos;
    this.enemy = enemy;
    this.enemy.isTargeted = true;

    this.burnLength = SDCONFIG.playerPodTurretBurnLength; // frames - burn anim - laser still på målet
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
        this.removeMeHandler.handlerCall(this);
    }

    //this.color.shade(this.colorShadeStep);

    this.index++;
}

Laser.prototype.draw = function() {
    stroke(this.color.getCSS());
    line(this.shooter.pos.x, this.shooter.pos.y, this.enemy.pos.x, this.enemy.pos.y);

}
