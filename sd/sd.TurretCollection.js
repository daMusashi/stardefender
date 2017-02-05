function TurretCollection(energySystem){
    this.turrets = [];
    this.lasers = new LaserCollection(new Color(SDCONFIG.stationaryTurretLaserColor));
    this.energySystem = energySystem;
}

TurretCollection.prototype.shoot = function(turret, enemy){
    turret.shoot(enemy);
}

TurretCollection.prototype.inTriggerRange = function(enemy){
    for(var i = 0; i < this.turrets.length; i++) {
        var turret = this.turrets[i];
        if(turret.active && !turret.isShooting) {
            if (Vector.distance(turret.pos, enemy.pos) < turret.triggerRange) {
                //console.log("in triggerzone - to star [" + enemy.distanceToStar + "]");
                return turret;
                break;
            }
        }
    }
    return null;
};

TurretCollection.prototype.add = function(x, y, size, color, turretsMaxEnergy, burnLength, triggerRange){
    var turret = new Turret(x, y, size, color, turretsMaxEnergy, burnLength, triggerRange, this.lasers);
    this.energySystem.registerConsumer(turret);
    this.turrets.push(turret);
};

TurretCollection.prototype.addStationaryT1 = function(x, y){
    var turret = new Turret(x, y, SDCONFIG.stationaryTurretSize, SDCONFIG.stationaryTurretColor, SDCONFIG.stationaryTurretMaxEnergy, SDCONFIG.stationaryTurretBurnLength, SDCONFIG.stationaryTurretTriggerRange, this.lasers);
    this.energySystem.registerConsumer(turret);
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
