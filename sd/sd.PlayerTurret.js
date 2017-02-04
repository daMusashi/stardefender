function PlayerTurret(){
    this.pos = new Vector();
    this.size = SDCONFIG.playerPodTurretSize;
    this.lasers = new LaserCollection(new Color(SDCONFIG.playerPodTurretLaserColor));

    this.triggerRange = SDCONFIG.playerPodTurretTriggerRange;

    this.cooldownTime = SDCONFIG.playerPodTurretCooldown;
    this.cooldown = new Cooldown(SDCONFIG.playerPodTurretCooldown);
    this.cooldownUI = new UICooldown(100, 100, 8, SDCONFIG.playerPodTurretColor, SDCONFIG.playerPodTurretLaserColor);
}

PlayerTurret.prototype.shoot = function(pod, enemy){
    if(!this.cooldown.active) {
        this.lasers.shoot(this, enemy);
        this.cooldown.start();
    }
}


PlayerTurret.prototype.update = function(podPosition){
    this.pos = podPosition.podPos;

    this.lasers.update();
    this.cooldownUI.value = this.cooldown.progress;

    // laser cooldown pos
    var laserCoolDownPos = podPosition.podPosOnHalo.clone();
    laserCoolDownPos.length -= 14;
    laserCoolDownPos.plus(podPosition.star.pos);
    this.cooldownUI.pos = laserCoolDownPos;
}

PlayerTurret.prototype.draw = function(drawOptions){

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

    this.lasers.draw();
}
