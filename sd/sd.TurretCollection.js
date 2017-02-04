function TurretCollection(){
    this.turrets = [];
    this.lasers = new LaserCollection(new Color(SDCONFIG.playerPodTurretLaserColor));
}

TurretCollection.prototype.shoot = function(turret, enemy){
    if(!turret.cooldown.active) {
        this.lasers.shoot(turret, enemy);
        turret.cooldown.start();
    }
}

TurretCollection.prototype.inTriggerZone = function(enemy){
    for(var i = 0; i < this.turrets.length; i++) {
        var turret = this.turrets[i];
        if (Vector.distance(turret.pos, enemy.pos) < turret.triggerRange) {
            //console.log("in triggerzone - to star [" + enemy.distanceToStar + "]");
            return turret;
            break;
        }
    }
    return null;
};

TurretCollection.prototype.add = function(x, y){
    var turret = new StationaryTurret(x, y);
    this.turrets.push(turret);
};


TurretCollection.prototype.remove = function(turret){
    for(var i = 0; i < this.turrets.length; i++) {
        if(this.turrets[i] === turret){
            this.turrets.splice(i, 1);
        }
    }
};

TurretCollection.prototype.update = function(){
    for(var i = 0; i < this.turrets.length; i++) {
        this.turrets[i].update();
    }
    this.lasers.update();
}

TurretCollection.prototype.draw = function(drawOptions){
    for(var i = 0; i < this.turrets.length; i++) {
        this.turrets[i].draw(drawOptions);
    }
    this.lasers.draw(drawOptions);
}
