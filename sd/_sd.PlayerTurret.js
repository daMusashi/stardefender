function PlayerTurret(laserCollection){
    this.pos = new Vector();

    this.turret = new Turret(this.pos.x, this.pos.y, laserCollection);
}

PlayerTurret.prototype.shoot = function(pod, enemy){
    this.turret.shoot(pod, enemy);
}


PlayerTurret.prototype.update = function(podPosition){
    this.pos = podPosition.podPos;

    this.turret.update();
    this.turret.pos = this.pos;

    // laser cooldown pos
    /*var laserCoolDownPos = podPosition.podPosOnHalo.clone();
    laserCoolDownPos.length -= 14;
    laserCoolDownPos.plus(podPosition.star.pos);
    this.energyUI.pos = laserCoolDownPos;*/
}

PlayerTurret.prototype.draw = function(drawOptions){

    this.turret.draw(drawOptions);
}
