function Turret(pod){
    this.pod = pod;
    this.size = SDCONFIG.playerPodTurretSize;
    this.lasers = new LaserCollection(SDCONFIG.playerPodTurretLaserColor);

    this.triggerRange = SDCONFIG.playerPodTurretTriggerRange;
    this.cooldown = SDCONFIG.playerPodTurretCooldown;

    this.mode = "armed"; // armed, cooldown
}

Turret.prototype.shoot = function(enemy){
    console.log(this.mode);
    if(this.mode == "armed") {
        this.lasers.shoot(this.pod, enemy);
        this.mode = "cooldown";

        // växlar till tillbaka till "armed" efter this.coolsown millisekunder
        // använder var me i timeout då this skulle komma att syfta på det globala objektet window som setTimeout tillhör (och som vi hela tiden "befinner" oss i, därför behöver jag inte skriva window.setTimeout)
        var me = this;
        setTimeout(function(){
            me.mode = "armed";
            console.log("COOLDOWN ended");
        }, this.cooldown);
    }
}

Turret.prototype._arm = function(){
    this.mode = "armed";
}

Turret.prototype.update = function(){
    this.lasers.update();
}

Turret.prototype.draw = function(drawOptions){

    // hotsone turret
    if(drawOptions.hotzones){
        stroke(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa*2);
        fill(SDCONFIG.hotzonesColor[0], SDCONFIG.hotzonesColor[1], SDCONFIG.hotzonesColor[2], SDCONFIG.hotzonesColorAlfa);
        ellipse(this.pod.pos.x, this.pod.pos.y, this.triggerRange*2, this.triggerRange*2);
    }

    noStroke();
    fill(SDCONFIG.playerPodTurretColor[0], SDCONFIG.playerPodTurretColor[1], SDCONFIG.playerPodTurretColor[2]);
    ellipse(this.pod.pos.x, this.pod.pos.y, this.size, this.size);

    this.lasers.draw();
}
