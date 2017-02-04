function PlayerTurret(pod){
    this.pod = pod;
    this.size = SDCONFIG.playerPodTurretSize;
    this.lasers = new LaserCollection(new Color(SDCONFIG.playerPodTurretLaserColor));

    this.triggerRange = SDCONFIG.playerPodTurretTriggerRange;

    this.cooldownTime = SDCONFIG.playerPodTurretCooldown;
    this.cooldown = new Cooldown(SDCONFIG.playerPodTurretCooldown);
    this.cooldownUI = new UICooldown(100, 100, 8, SDCONFIG.playerPodTurretColor, SDCONFIG.playerPodTurretLaserColor);
}

PlayerTurret.prototype.shoot = function(enemy){
    if(!this.cooldown.active) {
        this.lasers.shoot(this.pod, enemy);
        this.cooldown.start();
    }
}


PlayerTurret.prototype.update = function(){
    this.lasers.update();
    this.cooldownUI.value = this.cooldown.progress;

    // laser cooldown pos
    var laserCoolDownPos = this.pod.haloPos.clone();
    laserCoolDownPos.length -= 14;
    laserCoolDownPos.plus(this.pod.star.pos);
    this.cooldownUI.pos = laserCoolDownPos;
}

PlayerTurret.prototype.draw = function(drawOptions){

    // hotsone turret
    if(drawOptions.triggerzones){
        stroke(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa*2);
        fill(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa);
        ellipse(this.pod.pos.x, this.pod.pos.y, this.triggerRange*2, this.triggerRange*2);
    }

    noStroke();
    fill(SDCONFIG.playerPodTurretColor[0], SDCONFIG.playerPodTurretColor[1], SDCONFIG.playerPodTurretColor[2]);
    ellipse(this.pod.pos.x, this.pod.pos.y, this.size, this.size);

    if(drawOptions.cooldowns) {
        this.cooldownUI.draw();
    }

    this.lasers.draw();
}
