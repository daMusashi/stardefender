function StationaryTurret(x, y){
    this.pos = new Vector(x, y);

    this.size = SDCONFIG.stationaryTurretSize;

    this.triggerRange = SDCONFIG.playerPodTurretTriggerRange;

    this.cooldownTime = SDCONFIG.playerPodTurretCooldown;
    this.cooldown = new Cooldown(SDCONFIG.stationaryTurretCooldown);
    this.cooldownUI = new UICooldown(100, 100, 8, SDCONFIG.playerPodTurretColor, SDCONFIG.playerPodTurretLaserColor);
}

StationaryTurret.prototype.shoot = function(enemy){
    if(!this.cooldown.active) {
        this.lasers.shoot(this.pod, enemy);
        this.cooldown.start();
    }
}


StationaryTurret.prototype.update = function(){
    this.cooldownUI.value = this.cooldown.progress;

    // cooldown pos
    this.cooldownUI.pos = this.pos.clone();
    //this.cooldownUI.pos.y -= this.size/2 + 6;
}

StationaryTurret.prototype.draw = function(drawOptions){

    // hotsone turret
    if(drawOptions.triggerzones){
        stroke(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa*2);
        fill(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa);
        ellipse(this.pos.x, this.pos.y, this.triggerRange*2, this.triggerRange*2);
    }

    noStroke();
    fill(SDCONFIG.playerPodTurretColor[0], SDCONFIG.playerPodTurretColor[1], SDCONFIG.playerPodTurretColor[2]);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    if(drawOptions.cooldowns) {
        this.cooldownUI.draw();
    }
}
